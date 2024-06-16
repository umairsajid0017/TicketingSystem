'use client'
import Receipt from '@/components/views/receipt';
import ReceiptSetting from '@/components/views/receiptSetting'
import TopNavBar from '@/components/views/topNavBar';
import React, { useState } from 'react'

const Page = () => {
  const [receiptSetting, setReceiptSetting] = useState({
    title: "",
    bottomText: "",
    showDate: false,
    showAmount: false
  });

  return (
    <>
     <TopNavBar/>
    <section className='grid grid-cols-[50%,40%,10%] gap-x-8 m-10'>
      <div>
        <ReceiptSetting receiptSetting={receiptSetting} setReceiptSetting={setReceiptSetting} />
      </div>

      <div>
        <Receipt  receiptSetting={receiptSetting}/>
      </div>
      <div>
      </div>
    </section>
    </>
  )
}

export default Page