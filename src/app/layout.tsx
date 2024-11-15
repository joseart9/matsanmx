import type { Metadata } from 'next'
import { Cardo } from 'next/font/google'
import './globals.css'
import { Providers } from '@/providers'
import { ProvidersNextUI } from "./providers";


const inter = Cardo({ subsets: ['latin'], weight: "400" })

export const metadata: Metadata = {
  title: 'MatsanMX',
  description: 'MatsanMX Joyeria y Accesorios',
  icons: {
    apple: '/apple-touch-icon.png',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        <ProvidersNextUI>
          <Providers>
            {children}
          </Providers>
        </ProvidersNextUI>
      </body >
    </html >
  )
}
