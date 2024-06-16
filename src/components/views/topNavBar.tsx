import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const TopNavBar = () => {
 
    return (
        <section className={`grid grid-cols-3 bg-primary  text-white text-base  gap-x-8 py-2 px-4 `}>

            <Link href={'/'}>
                <div className='flex items-center gap-x-2 '>
                    <Image src={'/logos/park.png'} alt='Logo' height={40} width={40} />
                    <p className='font-bold text-lg'>{process.env.PARK_NAME}</p>
                </div>
            </Link>

            <div className='flex justify-center items-center gap-x-10 ' >
                <Link href={'/'}>Dashboard</Link>
                <Link href={'/categories'}>Categories</Link>
                <Link href={'/reports'}>Reports</Link>
                <Link href={'/reciptsSetting'}>Settings</Link>
            </div>

            <div>
            </div>
        </section>
    )
}

export default TopNavBar