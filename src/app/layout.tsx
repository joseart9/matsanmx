import type { Metadata } from 'next'
import { Cardo } from 'next/font/google'
import './globals.css'
import { Providers } from '@/providers'


const inter = Cardo({ subsets: ['latin'], weight: "400" })

export const metadata: Metadata = {
  title: 'MatsanMX',
  description: 'MatsanMX Joyeria y Accesorios',
  icons: {
    icon: '/favicon.ico',
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
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
