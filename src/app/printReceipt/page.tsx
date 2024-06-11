'use client'
import Receipt from '@/components/views/receipt'
import { getSettings } from '@/lib/apiRequests'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState, useRef } from 'react'

const Page = () => {
    const [settings, setSettings] = useState(null)
    const searchParams = useSearchParams()
    const amount = searchParams.get('amount')
    const numericAmount = amount ? Number(amount) : undefined

    // Create a ref for the receipt component
    const receiptRef = useRef(null);

    // Print function
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
            setTimeout(handlePrint, 0);
        }
    }, [settings])

    return (
        <section className=''>
            <div ref={receiptRef} className='h-[100vh] p-2'>
                {settings && (
                    <Receipt receiptSetting={settings} amount={numericAmount} />
                )}
            </div>
            <div ref={receiptRef} className='h-[100vh] p-2'>
                {settings && (
                    <Receipt receiptSetting={settings} amount={numericAmount} />
                )}
            </div>
            {/* <button
                onClick={handlePrint}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md no-print"
            >
                Print Receipt
            </button> */}
        </section>
    )
}

export default Page



