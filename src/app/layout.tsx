import type { Metadata } from 'next'
import { Cardo } from 'next/font/google'
import './globals.css'
import { Providers } from '@/providers'
import { ProvidersNextUI } from "./providers";

import { Analytics } from "@vercel/analytics/react"
import { ToastContainer } from 'react-toastify';


const inter = Cardo({ subsets: ['latin'], weight: "400" })

export const metadata: Metadata = {
  title: 'MatsanMX',
  description: 'MatsanMX Joyeria y Accesorios',
  icons: {
    apple: '/apple-touch-icon.png',
  },
  manifest: "/manifest.json",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='bg-secondary'>
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        <Analytics />
        <ProvidersNextUI>
          <Providers>
            <ToastContainer limit={1} />
            {children}
          </Providers>
        </ProvidersNextUI>
      </body >
    </html >
  )
}
