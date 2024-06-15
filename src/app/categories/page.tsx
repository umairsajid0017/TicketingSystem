'use client'
import CreateCategory from '@/components/shared/createCategory'
import { columns } from '@/components/ui/categories/columns'
import { DataTable } from '@/components/ui/categories/data-table'
import TopNavBar from '@/components/views/topNavBar'
import { getCategories } from '@/lib/apiRequests'
import React, { useEffect, useState } from 'react'



const Page = () => {
  const [category, setCategory] = useState({ name: '', price: 0 });
  const [categoryImage, setCategoryImage] = useState()
  const [response, setResponse] = useState("")
  const [categories, setCategories] = useState([])

  const fetchCategories = async () => {
    const data = await getCategories()
    setCategories(data.categories)
  }

  useEffect(() => {
    fetchCategories()
  }, [response])

  return (
    <section>
      <TopNavBar />
      <CreateCategory category={category}
        setCategory={setCategory}
        categoryImage={categoryImage}
        setCategoryImage={setCategoryImage}
        setResponse={setResponse}
      />

      <div className='max-w-7xl mx-auto'>
        <DataTable columns={columns} data={categories} setResponse={setResponse} />
      </div>
    </section>
  )
}

export default Page