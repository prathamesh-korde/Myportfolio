import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

// Layout wraps pages with Navbar and Footer
export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <Navbar />
      <main className="flex-1 pt-20">{children}</main>
      <Footer />
    </div>
  )
}
