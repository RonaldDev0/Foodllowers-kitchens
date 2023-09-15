'use client'
import Link from 'next/link'
import { useUser } from '@/store'

export function NavBarr () {
  const { user } = useUser()
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
