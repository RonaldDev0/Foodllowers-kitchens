'use client'
import Link from 'next/link'
import { useData } from '@/store'

interface IPath {
  label: string
  path: string
}

export function NavBarr () {
  const { user } = useData()
  const paths: IPath[] = [
    {
      label: 'Inicio',
      path: '/'
    },
    {
      label: 'Metricas',
      path: '/dashboard'
    },
    {
      label: 'Perfil',
      path: '/profile'
    }
  ]

  return (
    <>
      {user && (
        <nav className='border-b border-blue-800 w-64 flex justify-around mb-10 mt-5'>
          {paths.map(({ label, path }) => <Link key={path} href={path}>{label}</Link>)}
        </nav>
      )}
    </>
  )
}
