import './globals.css'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react';
import Header from '@/components/Header';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: "John - An ai chatbot",
  description:
    "John is a chatbot helping to find information from the database and not only."
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <Header />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
