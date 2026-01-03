'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

// Product Image Carousel Component
const ProductCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (!images || images.length === 0) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [images])

  if (!images || images.length === 0) {
    return (
      <div className="flex items-center justify-center h-96 bg-gradient-to-br from-[#007BFF]/20 to-[#A8E600]/20 rounded-3xl">
        <p className="text-xl text-[#212529] font-bold">No Images Available</p>
      </div>
    )
  }

  return (
    <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl bg-white">
      {images.map((img, index) => (
        <div
          key={index}
          className="absolute inset-0 transition-opacity duration-500"
          style={{ opacity: currentIndex === index ? 1 : 0 }}
        >
          <Image
            src={img}
            alt={`Product ${index + 1}`}
            fill
            className="object-contain p-6"
          />
        </div>
      ))}

      {images.length > 1 && (
        <>
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  currentIndex === index ? 'bg-[#A8E600] w-8' : 'bg-white/60 w-2'
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-[#007BFF]/80 hover:bg-[#007BFF] text-white w-10 h-10 rounded-full flex items-center justify-center text-2xl font-bold transition z-10"
          >
            ‹
          </button>
          <button
            onClick={() => setCurrentIndex((prev) => (prev + 1) % images.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#007BFF]/80 hover:bg-[#007BFF] text-white w-10 h-10 rounded-full flex items-center justify-center text-2xl font-bold transition z-10"
          >
            ›
          </button>
        </>
      )}
    </div>
  )
}

export default function TwoWheelerProducts() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    loadProducts()
    
    const handleUpdate = () => loadProducts()
    window.addEventListener('storage', handleUpdate)
    window.addEventListener('adminMediaUpdated', handleUpdate)
    
    return () => {
      window.removeEventListener('storage', handleUpdate)
      window.removeEventListener('adminMediaUpdated', handleUpdate)
    }
  }, [])

  const loadProducts = () => {
    try {
      const saved = localStorage.getItem('twoWheelerProducts')
      if (saved) {
        setProducts(JSON.parse(saved))
      }
    } catch (e) {
      console.error('Error loading products:', e)
    }
  }

  return (
    <main className="min-h-screen bg-[#FFFFF0] pt-24 pb-12">
      {/* Floating 3-Wheeler Icon - Middle Right */}
      <Link href="/products/3w">
        <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 group cursor-pointer">
          <div className="relative">
            {/* Pulsing glow ring */}
            <div className="absolute -inset-2 bg-gradient-to-r from-[#A8E600] via-[#007BFF] to-[#A8E600] rounded-full blur-md opacity-75 group-hover:opacity-100 animate-pulse"></div>
            
            {/* Main icon button */}
            <div className="relative bg-gradient-to-r from-[#A8E600] to-[#007BFF] p-5 rounded-full shadow-2xl hover:shadow-3xl transition-all transform hover:scale-110 group-hover:rotate-12">
              <div className="text-5xl">🚐</div>
            </div>
          </div>
          
          {/* Tooltip */}
          <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-[#212529] text-white px-5 py-3 rounded-xl opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap font-bold text-base shadow-2xl group-hover:mr-5">
            <span className="flex items-center gap-2">
              View 3-Wheelers
              <span className="text-xl">→</span>
            </span>
          </div>
        </div>
      </Link>

      {/* Header Section */}
      <section className="bg-gradient-to-r from-[#007BFF] to-[#A8E600] py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6">
            2-Wheeler <span className="text-[#212529]">Electric Vehicles</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8">
            Urban Mobility Redefined - Eco-Friendly, Efficient, Powerful
          </p>
          <Link href="/contact">
            <button className="bg-[#212529] hover:bg-white hover:text-[#007BFF] text-white font-bold py-4 px-10 rounded-full transition-all transform hover:scale-105 text-lg">
              Request Test Drive →
            </button>
          </Link>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {products.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-8xl mb-6">🏍️</div>
              <h2 className="text-4xl font-black text-[#212529] mb-4">No Products Available</h2>
              <p className="text-xl text-[#212529]/70 mb-8">
                Our 2-wheeler products are being updated. Check back soon!
              </p>
              <Link href="/contact">
                <button className="bg-[#A8E600] hover:bg-[#98d600] text-[#212529] font-bold py-4 px-10 rounded-full transition">
                  Contact Us for Details
                </button>
              </Link>
            </div>
          ) : (
            <div className="space-y-16">
              {products.map((product, index) => (
                <div
                  key={product.id || index}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                    index % 2 !== 0 ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  {/* Product Images */}
                  <div className={`${index % 2 !== 0 ? 'lg:order-2' : 'lg:order-1'}`}>
                    <ProductCarousel images={product.images || []} />
                  </div>

                  {/* Product Details */}
                  <div className={`${index % 2 !== 0 ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-[#007BFF]/20">
                      <h2 className="text-4xl md:text-5xl font-black mb-4 text-[#212529]">
                        {product.name}
                      </h2>
                      
                      {product.price && (
                        <p className="text-3xl text-[#A8E600] font-black mb-6">
                          {product.price}
                        </p>
                      )}

                      <p className="text-[#212529] text-lg leading-relaxed mb-8">
                        {product.description}
                      </p>

                      {/* Specifications Grid */}
                      <div className="grid grid-cols-2 gap-4 mb-8">
                        {product.range && (
                          <div className="bg-[#FFFFF0] p-4 rounded-xl border-2 border-[#007BFF]/20">
                            <div className="text-3xl mb-2">🔋</div>
                            <div className="text-xs text-[#212529]/60 font-semibold mb-1">Range</div>
                            <div className="text-lg font-black text-[#212529]">{product.range}</div>
                          </div>
                        )}
                        
                        {product.topSpeed && (
                          <div className="bg-[#FFFFF0] p-4 rounded-xl border-2 border-[#007BFF]/20">
                            <div className="text-3xl mb-2">🏁</div>
                            <div className="text-xs text-[#212529]/60 font-semibold mb-1">Top Speed</div>
                            <div className="text-lg font-black text-[#212529]">{product.topSpeed}</div>
                          </div>
                        )}
                        
                        {product.motor && (
                          <div className="bg-[#FFFFF0] p-4 rounded-xl border-2 border-[#007BFF]/20">
                            <div className="text-3xl mb-2">⚙️</div>
                            <div className="text-xs text-[#212529]/60 font-semibold mb-1">Motor</div>
                            <div className="text-lg font-black text-[#212529]">{product.motor}</div>
                          </div>
                        )}
                        
                        {product.chargingTime && (
                          <div className="bg-[#FFFFF0] p-4 rounded-xl border-2 border-[#007BFF]/20">
                            <div className="text-3xl mb-2">⚡</div>
                            <div className="text-xs text-[#212529]/60 font-semibold mb-1">Charging</div>
                            <div className="text-lg font-black text-[#212529]">{product.chargingTime}</div>
                          </div>
                        )}
                        
                        {product.batteryCapacity && (
                          <div className="bg-[#FFFFF0] p-4 rounded-xl border-2 border-[#007BFF]/20">
                            <div className="text-3xl mb-2">🔌</div>
                            <div className="text-xs text-[#212529]/60 font-semibold mb-1">Battery</div>
                            <div className="text-lg font-black text-[#212529]">{product.batteryCapacity}</div>
                          </div>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col sm:flex-row gap-4">
                        <Link href="/contact" className="flex-1">
                          <button className="w-full bg-[#A8E600] hover:bg-[#98d600] text-[#212529] font-bold py-4 px-8 rounded-full transition transform hover:scale-105 shadow-lg">
                            Inquire Now →
                          </button>
                        </Link>
                        <Link href="/dealership" className="flex-1">
                          <button className="w-full bg-[#007BFF] hover:bg-[#0056b3] text-white font-bold py-4 px-8 rounded-full transition transform hover:scale-105 shadow-lg">
                            Find Dealer
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-[#007BFF] to-[#A8E600]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
            Ready to Go Electric?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Experience the future of urban mobility with our 2-wheelers
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <button className="bg-white hover:bg-[#212529] hover:text-white text-[#007BFF] font-bold py-4 px-10 rounded-full transition-all transform hover:scale-105">
                Schedule Test Drive
              </button>
            </Link>
            <Link href="/">
              <button className="bg-transparent border-3 border-white hover:bg-white hover:text-[#007BFF] text-white font-bold py-4 px-10 rounded-full transition-all transform hover:scale-105">
                Back to Home
              </button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
