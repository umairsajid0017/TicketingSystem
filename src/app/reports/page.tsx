"use client"
import { Ticket } from '@/components/ui/tickets/columns'
import TicketsTable from '@/components/views/ticketsTable'
import TopNavBar from '@/components/views/topNavBar'
import React, { useState } from 'react'

const Page = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  return (
    <>
      <TopNavBar />
      <h3 className='text-center font-bold text-3xl'>Reports</h3>
      <div>
        <TicketsTable tickets={tickets} setTickets={setTickets} />
      </div>
    </>
  )
}

export default Page