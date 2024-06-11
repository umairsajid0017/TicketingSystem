'use client'
import CreateCategory from '@/components/shared/createCategory'
import { columns } from '@/components/ui/categories/columns'
import { DataTable } from '@/components/ui/data-table'
import TopNavBar from '@/components/views/topNavBar'
import { getCategories } from '@/lib/apiRequests'
import React, { useEffect, useState } from 'react'



const Page = () => {
  const [category, setCategory] = useState({ name: '', price: 0 });
  const [response, setResponse] = useState("")
  const [categories, setCategories] = useState([])

  const fetchCategories = async () => {
    const data = await getCategories()
    setCategories(data.categories)
  }

  useEffect(() => {
    fetchCategories()
  }, [response])

  console.log(categories)
  return (
    <section>
       <TopNavBar/>
      <CreateCategory category={category} setCategory={setCategory} setResponse={setResponse}/>
      <div className='max-w-7xl mx-auto'>
        <DataTable columns={columns} data={categories} />
      </div>
    </section>
  )
}

export default Page