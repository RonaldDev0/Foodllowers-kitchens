import { Providers } from './providers'
import { NavBarr } from '@/components'
import './globals.css'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Foodllowers-Kitchens',
  description: 'Foodllowers-Kitchens',
  manifest: 'manifest.json'
}

export default function RootLayout ({ children }: { children: ReactNode }) {
  return (
    <html lang='en' className='dark'>
      <body className='h-screen flex flex-col items-center'>
        <Providers>
          <NavBarr />
          {children}
        </Providers>
      </body>
    </html>
  )
}
