import React from 'react'
import Link from 'next/link'



const Navbar = () => {
  return (
    <div>
        <header className='w-full absolute z-10'>
        <nav className='max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 px-6 py-4 bg-transparent font-josefin mb-4'>
        <Link href='/home' className= 'flex justify-center items-center text-xl font-black'>
        Cardinal
        </Link>
        <Link href='/patient/dashboard' className='flex justify-center items-center text-lg font-black'>
        My Dashboard
        </Link>
       </nav>
      
    </header>

       
    </div>
  )
}

export default Navbar