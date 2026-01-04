'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const ImageCarousel = ({ images, autoPlayInterval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (!images || images.length === 0) return
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, autoPlayInterval)
    return () => clearInterval(interval)
  }, [images, autoPlayInterval])

  if (!images || images.length === 0) {
    return (
      <div className="flex items-center justify-center h-96 bg-gradient-to-br from-[#007BFF]/20 to-[#A8E600]/20 rounded-3xl border-2 border-dashed border-[#007BFF]/30">
        <div className="text-center p-8">
          <div className="text-6xl mb-4">📷</div>
          <p className="text-xl text-[#212529] font-bold mb-2">No Images Yet</p>
          <p className="text-sm text-[#212529]/60">Please upload images from admin dashboard</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl">
      {images.map((img, index) => (
        <div
          key={`carousel-${index}`}
          className="absolute inset-0 transition-opacity duration-500"
          style={{ opacity: currentIndex === index ? 1 : 0 }}
        >
          <Image src={typeof img === 'string' ? img : img.url} alt={`Product ${index + 1}`} fill className="object-contain p-4 bg-white" />
        </div>
      ))}

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
        {images.map((_, index) => (
          <button
            key={`dot-${index}`}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all ${
              currentIndex === index ? 'bg-[#A8E600] w-8' : 'bg-white/60 hover:bg-white w-2'
            }`}
          />
        ))}
      </div>

      {images.length > 1 && (
        <>
          <button
            onClick={() => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-[#007BFF]/80 hover:bg-[#007BFF] text-white w-10 h-10 rounded-full flex items-center justify-center text-2xl font-bold transition z-10"
          >‹</button>
          <button
            onClick={() => setCurrentIndex((prev) => (prev + 1) % images.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#007BFF]/80 hover:bg-[#007BFF] text-white w-10 h-10 rounded-full flex items-center justify-center text-2xl font-bold transition z-10"
          >›</button>
        </>
      )}
    </div>
  )
}

export default function Home() {
  const [heroImages, setHeroImages] = useState([])
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "NextGen 2-Wheeler Vehicles",
      category: "2-Wheeler",
      tagline: "Urban Mobility Redefined",
      description: "Our 2-wheeler electric vehicles are designed for the modern urban commuter who values efficiency, sustainability, and style. With a sleek aerodynamic design and advanced battery technology, these vehicles offer an impressive range of up to 50KM to 120KM on a single charge.",
      images: [],
      storageKey: 'twoWheelerUrls',
      features: [
        { label: 'Range', value: '50-120 km', icon: '🔋' },
        { label: 'Charging', value: '4-5 hours', icon: '⚡' }
      ]
    },
    {
      id: 2,
      name: "NextGen 3-Wheeler Vehicles",
      category: "3-Wheeler",
      tagline: "Built for Business",
      description: "NextGen 3-wheelers are engineered for commercial excellence, offering unmatched reliability and performance for businesses across India. Built with a robust chassis and powerful electric motor, these vehicles can handle heavy payloads of up to 500 kg while maintaining exceptional energy efficiency.",
      images: [],
      storageKey: 'threeWheelerUrls',
      features: [
        { label: 'Range', value: '150-300 km', icon: '🔋' },
        { label: 'Payload', value: '500 kg', icon: '📦' },
        { label: 'Motor', value: '5000W BLDC', icon: '⚙️' },
        { label: 'Charging', value: '6-8 hours', icon: '⚡' }
      ]
    },
    {
      id: 3,
      name: "EV Lithium-ion Battery Repair",
      category: "Battery & Pack Repair",
      tagline: "Restore Range. Extend Life.",
      description: "Specialised repair of EV lithium-ion batteries including cell testing, module replacement, BMS diagnostics, and capacity restoration.",
      images: [],
      storageKey: 'batteryRepairUrls',
      features: [
        { label: 'Service', value: 'Cell Testing', icon: '🔬' },
        { label: 'Repair', value: 'BMS Diagnostics', icon: '🛠️' },
        { label: 'Quality', value: 'High-Grade Cells', icon: '⚡' },
        { label: 'Warranty', value: '6 Months', icon: '🛡️' }
      ]
    },
    {
      id: 4,
      name: "EV Charger Repair & Service",
      category: "Charger Repair",
      tagline: "Safe & Fast Charging, Always.",
      description: "Complete service and repair of EV chargers and power supplies including fan failure, no output, slow charging, fuse damage, and connector issues.",
      images: [],
      storageKey: 'chargerRepairUrls',
      features: [
        { label: 'Service', value: 'PCB Repair', icon: '🔌' },
        { label: 'Testing', value: 'Voltage Calibration', icon: '⚙️' },
        { label: 'Speed', value: 'Fast Charging', icon: '⚡' },
        { label: 'Safety', value: 'Protection Circuits', icon: '🛡️' }
      ]
    }
  ])

  // Load hero images from API
  useEffect(() => {
    const loadHeroImages = async () => {
      try {
        const response = await fetch('/api/media')
        const data = await response.json()
        setHeroImages(data.heroImages || [])
      } catch (error) {
        console.error('Error loading hero images:', error)
      }
    }

    loadHeroImages()
    const interval = setInterval(loadHeroImages, 1000)
    return () => clearInterval(interval)
  }, [])

  // Hero image auto-slide
  useEffect(() => {
    if (heroImages.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % heroImages.length)
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [heroImages.length])

  // Load all product images from API
  useEffect(() => {
    const loadAllImages = async () => {
      try {
        const response = await fetch('/api/media')
        const data = await response.json()

        const updatedProducts = products.map(product => {
          const imageData = data[product.storageKey] || []
          const imageUrls = imageData.map(item => item.url || item)
          return { ...product, images: imageUrls }
        })

        setProducts(updatedProducts)
      } catch (error) {
        console.error('Error loading images:', error)
      }
    }

    loadAllImages()
    const interval = setInterval(loadAllImages, 1000)
    return () => clearInterval(interval)
  }, [])

  const currentImage = heroImages[currentImageIndex]

  return (
    <main className="min-h-screen bg-[#FAF8F1]">
      {/* HERO SECTION */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        {currentImage ? (
          <>
            <div 
              className="absolute inset-0 bg-cover bg-center transition-opacity duration-900"
              style={{ 
                backgroundImage: `url(${typeof currentImage === 'string' ? currentImage : currentImage.url})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />
            <div className="absolute inset-0 bg-black/40" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#007BFF] via-[#007BFF]/80 to-[#A8E600]" />
        )}

        <div className="relative z-10 text-center text-[#F8F9FA] px-4 max-w-6xl mx-auto">
          <p className="text-xl md:text-2xl mb-4 opacity-90 font-bold tracking-wider">ELECTRIC REVOLUTION</p>
          
          <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tight">
            DRIVE THE<br/>
            <span className="text-[#A8E600]">FUTURE</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-12 opacity-95 font-semibold max-w-4xl mx-auto">
            Experience India's most advanced electric 2-wheelers, 3-wheelers,
            and expert EV battery & charger repair services.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/products">
              <button className="bg-[#A8E600] hover:bg-[#98d600] text-[#212529] font-bold py-5 px-12 rounded-full transition-all transform hover:scale-110 shadow-2xl text-xl">
                EXPLORE VEHICLES →
              </button>
            </Link>
            <Link href="/dealership">
              <button className="bg-transparent border-3 border-[#F8F9FA] hover:bg-[#F8F9FA] hover:text-[#007BFF] text-[#F8F9FA] font-bold py-5 px-12 rounded-full transition-all transform hover:scale-110 text-xl">
                FIND DEALERS
              </button>
            </Link>
          </div>
        </div>

        {heroImages.length > 1 && (
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-10">
            {heroImages.map((_, index) => (
              <button
                key={`hero-dot-${index}`}
                onClick={() => setCurrentImageIndex(index)}
                className={`h-3 rounded-full transition-all ${
                  index === currentImageIndex ? 'bg-[#A8E600] w-12' : 'bg-white/60 hover:bg-white w-3'
                }`}
              />
            ))}
          </div>
        )}

        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-center z-10">
          <p className="text-[#F8F9FA] text-sm font-bold mb-2 animate-pulse">SCROLL</p>
          <div className="text-[#F8F9FA] text-2xl animate-bounce">↓</div>
        </div>
      </section>

      {/* VEHICLES & SERVICES SECTIONS */}
      {products.map((product, index) => (
        <section
          key={`product-${product.id}`}
          className={`py-20 md:py-32 px-4 md:px-8 ${index % 2 === 0 ? 'bg-[#FAF8F1]' : 'bg-white'}`}
        >
          <div className="max-w-7xl mx-auto">
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center`}>
              <div className={`${index % 2 !== 0 ? 'lg:order-2' : 'lg:order-1'}`}>
                <ImageCarousel images={product.images} />
              </div>

              <div className={`${index % 2 !== 0 ? 'lg:order-1' : 'lg:order-2'}`}>
                <p className="text-[#007BFF] font-bold text-lg mb-2">{product.category}</p>
                <h2 className="text-4xl md:text-6xl font-black mb-4 text-[#212529]">{product.name}</h2>
                <p className="text-2xl text-[#A8E600] font-bold mb-6">{product.tagline}</p>
                <p className="text-[#212529] text-lg leading-relaxed mb-8">{product.description}</p>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  {product.features.map((feature, idx) => (
                    <div key={`feature-${product.id}-${idx}`} className="bg-white p-4 rounded-xl border-2 border-[#007BFF]/20 hover:border-[#A8E600] transition">
                      <div className="text-3xl mb-2">{feature.icon}</div>
                      <div className="text-xs text-[#212529]/60 font-semibold mb-1">{feature.label}</div>
                      <div className="text-lg font-black text-[#212529]">{feature.value}</div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-4">
                  <Link href={product.id <= 2 ? "/products" : "/contact"} className="flex-1">
                    <button className="w-full bg-[#A8E600] hover:bg-[#98d600] text-[#212529] font-bold py-4 px-8 rounded-full transition transform hover:scale-105 shadow-lg">
                      {product.id <= 2 ? 'VIEW DETAILS →' : 'BOOK SERVICE →'}
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* WHY CHOOSE US */}
      <section className="py-20 md:py-32 px-4 md:px-8 bg-[#FAF8F1]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-black mb-6 text-[#212529]">
              WHY <span className="text-[#A8E600]">NEXTGEN EV</span>
            </h2>
            <div className="w-32 h-2 bg-[#A8E600] mx-auto mb-8"></div>
            <p className="text-2xl text-[#212529] opacity-80">
              Leading the electric revolution in India with innovative vehicles,
              advanced battery technology, and expert repair services.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: '⚡', title: '100% Electric', desc: 'Zero emissions, pure performance' },
              { icon: '🌱', title: 'Clean Mobility', desc: 'Supporting green transportation across India' },
              { icon: '🛡️', title: '3 Year Warranty', desc: 'On battery & motor for new vehicles' },
              { icon: '💬', title: '24/7 Support', desc: 'Pan-India assistance for vehicles & repairs' }
            ].map((feature, i) => (
              <div key={`why-${i}`} className="bg-white p-10 rounded-2xl shadow-lg hover:shadow-2xl transition-all text-center border-2 border-transparent hover:border-[#A8E600] group">
                <div className="text-8xl mb-6 transform group-hover:scale-125 transition-transform">{feature.icon}</div>
                <h3 className="text-2xl font-black mb-3 text-[#212529]">{feature.title}</h3>
                <p className="text-[#212529]/70 font-semibold text-lg">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DEALERSHIP PROMO */}
      <section className="py-20 md:py-32 px-4 md:px-8 bg-gradient-to-r from-[#007BFF] to-[#A8E600]">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#F8F9FA] text-lg font-bold mb-4">NATIONWIDE NETWORK</p>
          <h2 className="text-5xl md:text-7xl font-black mb-6 text-[#F8F9FA]">
            Find an Authorized <span className="text-[#212529]">NextGen EV Dealer</span>
          </h2>
          <p className="text-2xl mb-12 text-[#F8F9FA] opacity-90">
            Experience our electric vehicles in person. Locate your nearest
            dealership, book a test drive, and get expert guidance today.
          </p>
          <Link href="/dealership">
            <button className="bg-[#212529] hover:bg-[#F8F9FA] hover:text-[#007BFF] text-[#F8F9FA] font-bold py-5 px-12 rounded-full transition-all transform hover:scale-110 shadow-2xl text-xl">
              DEALERSHIP →
            </button>
          </Link>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 md:py-32 px-4 md:px-8 bg-[#212529]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-black mb-8 text-[#F8F9FA]">
            Have Questions About Our Vehicles or Repair Services?
          </h2>
          <p className="text-2xl mb-12 text-[#F8F9FA] opacity-90">
            Experience the future of mobility today
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/about">
              <button className="bg-[#A8E600] hover:bg-[#98d600] text-[#212529] font-bold py-5 px-12 rounded-full transition-all transform hover:scale-110 shadow-2xl text-xl">
                KNOW MORE
              </button>
            </Link>
            <Link href="/contact">
              <button className="bg-transparent border-3 border-[#F8F9FA] hover:bg-[#F8F9FA] hover:text-[#007BFF] text-[#F8F9FA] font-bold py-5 px-12 rounded-full transition-all transform hover:scale-110 text-xl">
                CONTACT US
              </button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
