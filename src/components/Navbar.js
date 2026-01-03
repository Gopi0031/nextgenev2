'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-[#212529] text-[#F8F9FA] fixed w-full z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold text-[#F8F9FA] hover:text-[#7AB800] transition">
            NextGen<span className="text-[#7AB800]">EV</span>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-1">
            <Link href="/" className="px-4 py-2 hover:bg-[#1E5EBF] rounded transition">Home</Link>
            <Link href="/products" className="px-4 py-2 hover:bg-[#1E5EBF] rounded transition">Products</Link>
            <Link href="/dealership" className="px-4 py-2 hover:bg-[#1E5EBF] rounded transition">Dealership</Link>
            <Link href="/services" className="px-4 py-2 hover:bg-[#1E5EBF] rounded transition">Services</Link>
            <Link href="/about" className="px-4 py-2 hover:bg-[#1E5EBF] rounded transition">About</Link>
            <Link href="/contact" className="px-4 py-2 hover:bg-[#1E5EBF] rounded transition">Contact</Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-[#F8F9FA]"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#1a1d21] border-t border-gray-700">
          <div className="flex flex-col px-4 py-2 space-y-1">
            <Link href="/" className="px-4 py-2 hover:bg-[#1E5EBF] rounded">Home</Link>
            <Link href="/products" className="px-4 py-2 hover:bg-[#1E5EBF] rounded">Products</Link>
            <Link href="/dealership" className="px-4 py-2 hover:bg-[#1E5EBF] rounded">Dealership</Link>
            <Link href="/services" className="px-4 py-2 hover:bg-[#1E5EBF] rounded">Services</Link>
            <Link href="/about" className="px-4 py-2 hover:bg-[#1E5EBF] rounded">About</Link>
            <Link href="/contact" className="px-4 py-2 hover:bg-[#1E5EBF] rounded">Contact</Link>
          </div>
        </div>
      )}
    </nav>
  )
}
