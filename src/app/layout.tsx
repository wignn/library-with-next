import type { Metadata } from 'next'
import { Lora } from 'next/font/google'
import './globals.css'
import Providers from './Providers'

const inter = Lora({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}> <Providers>{children}</Providers></body>
    </html>
  )
}
