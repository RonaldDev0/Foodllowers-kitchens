import { Providers } from './providers'
import { NavBarr } from '@/components'
import { Analytics } from '@vercel/analytics/react'
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
      <body className='w-full min-h-screen flex flex-col items-center absolute top-0 z-[-2] dark:bg-neutral-950 dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]'>
        <Providers>
          <NavBarr />
          {children}
          <Analytics />
        </Providers>
      </body>
    </html>
  )
}
