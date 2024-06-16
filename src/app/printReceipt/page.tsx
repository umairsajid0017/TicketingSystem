'use client'
import Receipt from '@/components/views/receipt'
import { getSettings } from '@/lib/apiRequests'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState, useRef } from 'react'

const Page = () => {
    const [settings, setSettings] = useState(null)
    const searchParams = useSearchParams()

    const amount = searchParams.get('amount')
    const quantity = searchParams.get('quantity')

    const numericAmount = amount ? Number(amount) : undefined
    const numericQuantity = quantity ? Number(quantity) : undefined

    // Create a ref for the receipt component
    const receiptRef = useRef(null);

    const handlePrint = () => {
        if (receiptRef.current) {
            window.print();
        }
    };

    const fetchSettings = async () => {
        const res = await getSettings()
        setSettings(res)
    }

    useEffect(() => {
        fetchSettings()
    }, [])

    useEffect(() => {
        if (settings) {
            // Ensure handlePrint is called after the component is rendered
            setTimeout(handlePrint, 10 * 1000);
        }
    }, [settings])

    const renderReceipts = () => {
        if (!settings || !numericQuantity) return null;
        // @ts-ignore
        const startTicketNumber = settings.currentTicketNumber;
        return Array.from({ length: numericQuantity }, (_, index) => {
            const ticketNumber = startTicketNumber - numericQuantity + 1 + index;
            return (
                <div ref={receiptRef} className='p-2'>
                    <Receipt
                        key={ticketNumber}
                        // @ts-ignore
                        receiptSetting={{ ...settings, currentTicketNumber: ticketNumber }}
                        amount={numericAmount}
                    />
                </div>
            );
        });
    };

    return (
        <section className=''>

            {settings && renderReceipts()}

        </section>
    )
}

export default Page
