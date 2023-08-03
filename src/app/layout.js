'use client'
import { SessionProvider } from 'next-auth/react'
import { MediaProvider } from '@/Providers/MediaProvider';
import { SearchContextProvider } from '@/Providers/searchProvider';
import './globals.css'
import { Outfit } from 'next/font/google'

const outfit = Outfit({ subsets: ['latin'] })


export default function RootLayout({ children }) {
  return (

    <html lang="en">
      <body className={outfit.className}>
        <SessionProvider>
          <MediaProvider>
            <SearchContextProvider>
              {children}
            </SearchContextProvider>
          </MediaProvider>
        </SessionProvider>
      </body>
    </html>

  )
}
