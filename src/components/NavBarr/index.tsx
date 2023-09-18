'use client'
import Link from 'next/link'
import { useData } from '@/store'

export function NavBarr () {
  const { user } = useData()
  return (
    <>
      {user && (
        <nav className='border-b border-blue-800 w-64 flex justify-around mb-10'>
          <Link href='/'>Home</Link>
          <Link href='/profile'>Profile</Link>
        </nav>
      )}
    </>
  )
}
