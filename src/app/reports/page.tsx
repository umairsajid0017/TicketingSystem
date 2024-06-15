"use client"
import { Ticket } from '@/components/ui/reports/columns'
import ReportsTable from '@/components/views/reportsTable'
import TopNavBar from '@/components/views/topNavBar'
import { getCategories } from '@/lib/apiRequests'
import React, { useEffect, useState } from 'react'

const Page = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const fetchCategories = async () => {
    const data = await getCategories();
    setCategories(data.categories);
  };

  useEffect(() => {
    fetchCategories();
  }, []);


  return (
    <>
      <TopNavBar />
      <h3 className='text-center font-bold text-3xl'>Reports</h3>
      <div>
        <ReportsTable tickets={tickets} setTickets={setTickets} categories={categories}/>
      </div>
    </>
  )
}

export default Page