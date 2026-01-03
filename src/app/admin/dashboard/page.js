'use client'
import { useState, useEffect } from 'react'

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState('hero')
  const [uploadStatus, setUploadStatus] = useState('')
  const [isUploading, setIsUploading] = useState(false)

  // Product form state
  const [productForm, setProductForm] = useState({
    name: '',
    description: '',
    price: '',
    range: '',
    topSpeed: '',
    motor: '',
    chargingTime: '',
    batteryCapacity: '',
    payload: '',
    images: []
  })
  const [editingProductIndex, setEditingProductIndex] = useState(null)
  const [showProductForm, setShowProductForm] = useState(false)

  const sections = [
    { id: 'hero', name: 'Hero Section', storageKey: 'heroImages', icon: '🎬', description: 'Homepage hero background', type: 'gallery' },
    { id: '2wheeler-home', name: '2W Home Section', storageKey: 'twoWheelerUrls', icon: '🛵', description: 'Homepage 2-Wheeler carousel', type: 'gallery' },
    { id: '3wheeler-home', name: '3W Home Section', storageKey: 'threeWheelerUrls', icon: '🚕', description: 'Homepage 3-Wheeler carousel', type: 'gallery' },
    { id: '2wheeler-products', name: '2W Products', storageKey: 'twoWheelerProducts', icon: '🏍️', description: '/products/2w - Individual product cards', type: 'products' },
    { id: '3wheeler-products', name: '3W Products', storageKey: 'threeWheelerProducts', icon: '🚐', description: '/products/3w - Individual product cards', type: 'products' },
    { id: 'battery', name: 'Battery Repair', storageKey: 'batteryRepairUrls', icon: '🔋', description: 'Battery repair section', type: 'gallery' },
    { id: 'charger', name: 'Charger Repair', storageKey: 'chargerRepairUrls', icon: '⚡', description: 'Charger repair section', type: 'gallery' },
  ]

  const [media, setMedia] = useState({})
  const [products, setProducts] = useState({})

  useEffect(() => {
    loadAllMedia()
    loadAllProducts()
  }, [activeSection])

  const loadAllMedia = async () => {
    const allMedia = {}
    for (const section of sections) {
      if (section.type === 'gallery') {
        try {
          const response = await fetch(`/api/storage?key=${section.storageKey}`)
          const data = await response.json()
          console.log(`✅ Loaded ${section.storageKey}:`, data.length, 'items')
          allMedia[section.id] = data || []
        } catch (e) {
          console.error(`❌ Error loading ${section.storageKey}:`, e)
          allMedia[section.id] = []
        }
      }
    }
    setMedia(allMedia)
  }

  const loadAllProducts = async () => {
    const allProducts = {}
    for (const section of sections) {
      if (section.type === 'products') {
        try {
          const response = await fetch(`/api/storage?key=${section.storageKey}`)
          const data = await response.json()
          console.log(`✅ Loaded ${section.storageKey}:`, data.length, 'products')
          allProducts[section.id] = data || []
        } catch (e) {
          console.error(`❌ Error loading ${section.storageKey}:`, e)
          allProducts[section.id] = []
        }
      }
    }
    setProducts(allProducts)
  }

  // Upload to Cloudinary
  const uploadToCloudinary = async (file, folder = 'nextgen-ev') => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('folder', folder)
    formData.append('resourceType', 'image')

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Upload failed')
    }

    return await response.json()
  }

  // Gallery Image Upload - FIXED WITH PROPER ERROR HANDLING
  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files)
    if (files.length === 0) return

    const validFiles = files.filter(file => file.type.startsWith('image/'))
    if (validFiles.length === 0) {
      setUploadStatus('❌ Please select valid image files')
      setTimeout(() => setUploadStatus(''), 3000)
      return
    }

    setIsUploading(true)
    setUploadStatus(`Uploading ${validFiles.length} image(s) to cloud...`)

    try {
      const uploadedUrls = []

      for (let i = 0; i < validFiles.length; i++) {
        const file = validFiles[i]
        setUploadStatus(`Uploading ${i + 1}/${validFiles.length}...`)

        try {
          const result = await uploadToCloudinary(file, `nextgen-ev/${activeSection}`)
          uploadedUrls.push({
            url: result.url,
            publicId: result.publicId,
            name: file.name,
            uploadedAt: new Date().toISOString()
          })
        } catch (error) {
          console.error(`Failed to upload ${file.name}:`, error)
          setUploadStatus(`⚠️ ${file.name} failed. Continuing...`)
          await new Promise(resolve => setTimeout(resolve, 1000))
        }
      }

      if (uploadedUrls.length === 0) {
        setUploadStatus('❌ All uploads failed')
        setTimeout(() => setUploadStatus(''), 3000)
        return
      }

      const currentSection = sections.find((s) => s.id === activeSection)
      const existingMedia = media[activeSection] || []
      const updatedMedia = [...existingMedia, ...uploadedUrls]

      // FIXED: Proper API call with logging
      console.log('📤 Saving to API:', { key: currentSection.storageKey, itemCount: updatedMedia.length })
      
      const response = await fetch('/api/storage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          key: currentSection.storageKey,
          data: updatedMedia
        })
      })

      const result = await response.json()
      console.log('📥 API Response:', result)

      if (!response.ok) {
        throw new Error(result.error || 'Failed to save to server')
      }

      setMedia((prev) => ({ ...prev, [activeSection]: updatedMedia }))
      setUploadStatus(`✅ ${uploadedUrls.length} image(s) uploaded and saved!`)
      
      // Reload to confirm save
      await loadAllMedia()
    } catch (error) {
      console.error('❌ Upload error:', error)
      setUploadStatus(`❌ Upload failed: ${error.message}`)
    } finally {
      setIsUploading(false)
      setTimeout(() => setUploadStatus(''), 4000)
    }
  }

  // Product Image Upload
  const handleProductImageUpload = async (e) => {
    const files = Array.from(e.target.files)
    if (files.length === 0) return

    const validFiles = files.filter(file => file.type.startsWith('image/'))
    if (validFiles.length === 0) {
      setUploadStatus('❌ Please select valid image files')
      setTimeout(() => setUploadStatus(''), 3000)
      return
    }

    setUploadStatus(`Uploading ${validFiles.length} product image(s)...`)

    try {
      const uploadedUrls = []

      for (let i = 0; i < validFiles.length; i++) {
        const file = validFiles[i]
        setUploadStatus(`Uploading product image ${i + 1}/${validFiles.length}...`)

        try {
          const result = await uploadToCloudinary(file, `nextgen-ev/products/${activeSection}`)
          uploadedUrls.push(result.url)
        } catch (error) {
          console.error(`Failed to upload ${file.name}:`, error)
        }
      }

      setProductForm(prev => ({
        ...prev,
        images: [...(prev.images || []), ...uploadedUrls]
      }))

      setUploadStatus(`✅ ${uploadedUrls.length} product image(s) added!`)
      setTimeout(() => setUploadStatus(''), 2000)
    } catch (error) {
      console.error('Upload error:', error)
      setUploadStatus('❌ Upload failed. Please try again.')
      setTimeout(() => setUploadStatus(''), 3000)
    }
  }

  const removeProductImage = (index) => {
    setProductForm(prev => ({
      ...prev,
      images: (prev.images || []).filter((_, i) => i !== index)
    }))
  }

  // Save Product - FIXED
  const saveProduct = async () => {
    if (!productForm.name || !productForm.description || !productForm.images || productForm.images.length === 0) {
      setUploadStatus('❌ Please fill name, description and add at least one image')
      setTimeout(() => setUploadStatus(''), 3000)
      return
    }

    const currentSection = sections.find((s) => s.id === activeSection)
    const currentProducts = products[activeSection] || []

    let updatedProducts
    if (editingProductIndex !== null) {
      updatedProducts = [...currentProducts]
      updatedProducts[editingProductIndex] = { ...productForm, id: Date.now() }
    } else {
      updatedProducts = [...currentProducts, { ...productForm, id: Date.now() }]
    }

    try {
      console.log('📤 Saving product to API:', { key: currentSection.storageKey, productCount: updatedProducts.length })
      
      const response = await fetch('/api/storage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          key: currentSection.storageKey,
          data: updatedProducts
        })
      })

      const result = await response.json()
      console.log('📥 API Response:', result)

      if (!response.ok) {
        throw new Error(result.error || 'Failed to save product')
      }

      setProducts((prev) => ({ ...prev, [activeSection]: updatedProducts }))
      setUploadStatus(editingProductIndex !== null ? '✅ Product updated successfully!' : '✅ Product added successfully!')

      // Reset form
      setProductForm({
        name: '',
        description: '',
        price: '',
        range: '',
        topSpeed: '',
        motor: '',
        chargingTime: '',
        batteryCapacity: '',
        payload: '',
        images: []
      })
      setEditingProductIndex(null)
      setShowProductForm(false)
      
      // Reload to confirm save
      await loadAllProducts()
      setTimeout(() => setUploadStatus(''), 2000)
    } catch (error) {
      console.error('❌ Save error:', error)
      setUploadStatus(`❌ Save failed: ${error.message}`)
      setTimeout(() => setUploadStatus(''), 3000)
    }
  }

  const editProduct = (index) => {
    const currentProducts = products[activeSection] || []
    const product = currentProducts[index]
    if (product) {
      setProductForm({
        ...product,
        images: product.images || []
      })
      setEditingProductIndex(index)
      setShowProductForm(true)
    }
  }

  // Delete Product - FIXED
  const deleteProduct = async (index) => {
    if (!confirm('Delete this product?')) return

    const currentSection = sections.find((s) => s.id === activeSection)
    const currentProducts = products[activeSection] || []
    const updatedProducts = currentProducts.filter((_, i) => i !== index)

    try {
      console.log('📤 Deleting product, saving to API:', { key: currentSection.storageKey, productCount: updatedProducts.length })
      
      const response = await fetch('/api/storage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          key: currentSection.storageKey,
          data: updatedProducts
        })
      })

      const result = await response.json()
      console.log('📥 API Response:', result)

      if (!response.ok) {
        throw new Error(result.error || 'Failed to delete product')
      }

      setProducts((prev) => ({ ...prev, [activeSection]: updatedProducts }))
      setUploadStatus('✅ Product deleted successfully!')
      
      await loadAllProducts()
      setTimeout(() => setUploadStatus(''), 2000)
    } catch (error) {
      console.error('❌ Delete error:', error)
      setUploadStatus(`❌ Delete failed: ${error.message}`)
      setTimeout(() => setUploadStatus(''), 3000)
    }
  }

  // Delete Image - FIXED
  const deleteImage = async (index) => {
    if (!confirm('Delete this image?')) return

    const currentSection = sections.find((s) => s.id === activeSection)
    const currentMedia = media[activeSection] || []

    try {
      const updatedMedia = currentMedia.filter((_, i) => i !== index)
      
      console.log('📤 Deleting image, saving to API:', { key: currentSection.storageKey, itemCount: updatedMedia.length })
      
      const response = await fetch('/api/storage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          key: currentSection.storageKey,
          data: updatedMedia
        })
      })

      const result = await response.json()
      console.log('📥 API Response:', result)

      if (!response.ok) {
        throw new Error(result.error || 'Failed to delete image')
      }

      setMedia((prev) => ({ ...prev, [activeSection]: updatedMedia }))
      setUploadStatus('✅ Image deleted successfully!')
      
      await loadAllMedia()
      setTimeout(() => setUploadStatus(''), 2000)
    } catch (error) {
      console.error('❌ Delete error:', error)
      setUploadStatus(`❌ Delete failed: ${error.message}`)
      setTimeout(() => setUploadStatus(''), 3000)
    }
  }

  // Clear All Images - FIXED
  const clearAllImages = async () => {
    const currentSectionData = sections.find((s) => s.id === activeSection)
    if (!confirm(`Delete ALL images from ${currentSectionData?.name}?`)) return

    const currentSection = sections.find((s) => s.id === activeSection)
    
    try {
      console.log('📤 Clearing all images, saving to API:', { key: currentSection.storageKey })
      
      const response = await fetch('/api/storage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          key: currentSection.storageKey,
          data: []
        })
      })

      const result = await response.json()
      console.log('📥 API Response:', result)

      if (!response.ok) {
        throw new Error(result.error || 'Failed to clear images')
      }

      setMedia((prev) => ({ ...prev, [activeSection]: [] }))
      setUploadStatus('✅ All images cleared!')
      
      await loadAllMedia()
      setTimeout(() => setUploadStatus(''), 2000)
    } catch (error) {
      console.error('❌ Clear error:', error)
      setUploadStatus(`❌ Clear failed: ${error.message}`)
      setTimeout(() => setUploadStatus(''), 3000)
    }
  }

  const currentSectionData = sections.find((s) => s.id === activeSection)
  const currentMedia = media[activeSection] || []
  const currentProducts = products[activeSection] || []
  const isProductSection = currentSectionData?.type === 'products'

  return (
    <div className="min-h-screen bg-[#212529] pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-black text-[#F8F9FA] mb-4">
            Admin <span className="text-[#A8E600]">Dashboard</span>
          </h1>
          <p className="text-[#F8F9FA]/70 text-lg">
            Manage all website content - Works everywhere (Cloudinary + Server Storage)
          </p>
          <p className="text-[#A8E600] text-sm mt-2">
            Open Browser Console (F12) to see detailed logs
          </p>
        </div>

        {/* Section Navigation */}
        <div className="flex flex-wrap gap-3 justify-center mb-8">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => {
                setActiveSection(section.id)
                setShowProductForm(false)
                setEditingProductIndex(null)
              }}
              className={`px-4 py-2 rounded-full font-bold transition flex items-center gap-2 text-sm ${
                activeSection === section.id
                  ? 'bg-[#A8E600] text-[#212529] shadow-lg'
                  : 'bg-[#1a1d21] text-[#F8F9FA] hover:bg-[#2a2d31]'
              }`}
            >
              <span className="text-lg">{section.icon}</span>
              {section.name}
            </button>
          ))}
        </div>

        {/* Active Section Info */}
        <div className="bg-[#007BFF]/10 border border-[#007BFF]/30 rounded-2xl p-4 mb-8 text-center">
          <p className="text-[#F8F9FA] text-sm">
            <strong className="text-[#A8E600]">Currently editing:</strong> {currentSectionData?.description || 'Unknown section'}
          </p>
        </div>

        {uploadStatus && (
          <div className={`mb-6 p-4 rounded-xl text-center ${
            uploadStatus.startsWith('✅') 
              ? 'bg-green-900/30 border border-green-500' 
              : uploadStatus.startsWith('⚠️')
              ? 'bg-yellow-900/30 border border-yellow-500'
              : 'bg-red-900/30 border border-red-500'
          }`}>
            <p className="text-[#F8F9FA] font-bold">{uploadStatus}</p>
          </div>
        )}

        {/* GALLERY UPLOAD (Hero, Home sections, Battery, Charger) */}
        {!isProductSection && (
          <>
            <div className="bg-[#1a1d21] rounded-3xl p-8 mb-8 border-2 border-[#A8E600]/30">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-[#F8F9FA]">
                  Upload Images for {currentSectionData?.name || 'Section'}
                </h2>
                {currentMedia.length > 0 && (
                  <button
                    onClick={clearAllImages}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-bold transition text-sm"
                  >
                    Clear All
                  </button>
                )}
              </div>

              <div className="relative">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileUpload}
                  disabled={isUploading}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className={`block w-full p-8 border-2 border-dashed rounded-2xl text-center cursor-pointer transition ${
                    isUploading
                      ? 'border-gray-500 bg-gray-800 cursor-not-allowed'
                      : 'border-[#007BFF] hover:border-[#A8E600] hover:bg-[#2a2d31]'
                  }`}
                >
                  <div className="text-6xl mb-4">☁️</div>
                  <p className="text-[#F8F9FA] text-lg font-bold mb-2">
                    {isUploading ? 'Uploading to Cloudinary...' : 'Click to upload images'}
                  </p>
                  <p className="text-[#F8F9FA]/60">Stored securely in the cloud</p>
                  <p className="text-[#F8F9FA]/40 text-sm mt-2">
                    No storage limits • Fast CDN delivery
                  </p>
                </label>
              </div>
            </div>

            {/* Image Gallery */}
            <div className="bg-[#1a1d21] rounded-3xl p-8 border-2 border-[#007BFF]/30">
              <h2 className="text-2xl font-bold text-[#F8F9FA] mb-6">
                Current Images ({currentMedia.length})
              </h2>

              {currentMedia.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📁</div>
                  <p className="text-[#F8F9FA]/60 text-lg">No images uploaded yet</p>
                  <p className="text-[#F8F9FA]/40 text-sm mt-2">Upload images using the section above</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {currentMedia.map((item, index) => (
                    <div
                      key={`${activeSection}-img-${index}`}
                      className="relative group bg-[#2a2d31] rounded-xl overflow-hidden border-2 border-transparent hover:border-[#A8E600] transition"
                    >
                      <img
                        src={item.url}
                        alt={item.name || `Image ${index + 1}`}
                        className="w-full h-48 object-cover"
                      />
                      <button
                        onClick={() => deleteImage(index)}
                        className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition font-bold shadow-lg"
                        title="Delete image"
                      >
                        ✕
                      </button>
                      <div className="absolute bottom-0 left-0 right-0 bg-black/80 text-white text-xs p-2 text-center opacity-0 group-hover:opacity-100 transition">
                        {item.name || `Image ${index + 1}`}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {/* PRODUCT MANAGEMENT */}
        {isProductSection && (
          <>
            <div className="bg-[#1a1d21] rounded-3xl p-8 mb-8 border-2 border-[#A8E600]/30">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-[#F8F9FA]">
                  Manage Products - {currentSectionData?.name || 'Products'}
                </h2>
                <button
                  onClick={() => {
                    setShowProductForm(!showProductForm)
                    if (showProductForm) {
                      setProductForm({
                        name: '',
                        description: '',
                        price: '',
                        range: '',
                        topSpeed: '',
                        motor: '',
                        chargingTime: '',
                        batteryCapacity: '',
                        payload: '',
                        images: []
                      })
                      setEditingProductIndex(null)
                    }
                  }}
                  className="bg-[#A8E600] hover:bg-[#98d600] text-[#212529] px-6 py-3 rounded-full font-bold transition text-sm"
                >
                  {showProductForm ? '✕ Cancel' : '+ Add New Product'}
                </button>
              </div>

              {/* Product Form */}
              {showProductForm && (
                <div className="bg-[#2a2d31] rounded-2xl p-6 mb-6">
                  <h3 className="text-xl font-bold text-[#F8F9FA] mb-4">
                    {editingProductIndex !== null ? 'Edit Product' : 'Add New Product'}
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-[#F8F9FA] text-sm font-bold mb-2">Product Name *</label>
                      <input
                        type="text"
                        value={productForm.name}
                        onChange={(e) => setProductForm({...productForm, name: e.target.value})}
                        className="w-full px-4 py-2 rounded-lg bg-[#1a1d21] text-[#F8F9FA] border-2 border-[#007BFF]/30 focus:border-[#A8E600] outline-none"
                        placeholder="e.g., EV Pro 2000"
                      />
                    </div>

                    <div>
                      <label className="block text-[#F8F9FA] text-sm font-bold mb-2">Price</label>
                      <input
                        type="text"
                        value={productForm.price}
                        onChange={(e) => setProductForm({...productForm, price: e.target.value})}
                        className="w-full px-4 py-2 rounded-lg bg-[#1a1d21] text-[#F8F9FA] border-2 border-[#007BFF]/30 focus:border-[#A8E600] outline-none"
                        placeholder="e.g., ₹85,000"
                      />
                    </div>

                    <div>
                      <label className="block text-[#F8F9FA] text-sm font-bold mb-2">Range</label>
                      <input
                        type="text"
                        value={productForm.range}
                        onChange={(e) => setProductForm({...productForm, range: e.target.value})}
                        className="w-full px-4 py-2 rounded-lg bg-[#1a1d21] text-[#F8F9FA] border-2 border-[#007BFF]/30 focus:border-[#A8E600] outline-none"
                        placeholder="e.g., 120 km"
                      />
                    </div>

                    <div>
                      <label className="block text-[#F8F9FA] text-sm font-bold mb-2">Top Speed</label>
                      <input
                        type="text"
                        value={productForm.topSpeed}
                        onChange={(e) => setProductForm({...productForm, topSpeed: e.target.value})}
                        className="w-full px-4 py-2 rounded-lg bg-[#1a1d21] text-[#F8F9FA] border-2 border-[#007BFF]/30 focus:border-[#A8E600] outline-none"
                        placeholder="e.g., 75 km/h"
                      />
                    </div>

                    <div>
                      <label className="block text-[#F8F9FA] text-sm font-bold mb-2">Motor</label>
                      <input
                        type="text"
                        value={productForm.motor}
                        onChange={(e) => setProductForm({...productForm, motor: e.target.value})}
                        className="w-full px-4 py-2 rounded-lg bg-[#1a1d21] text-[#F8F9FA] border-2 border-[#007BFF]/30 focus:border-[#A8E600] outline-none"
                        placeholder="e.g., 3000W BLDC"
                      />
                    </div>

                    <div>
                      <label className="block text-[#F8F9FA] text-sm font-bold mb-2">Charging Time</label>
                      <input
                        type="text"
                        value={productForm.chargingTime}
                        onChange={(e) => setProductForm({...productForm, chargingTime: e.target.value})}
                        className="w-full px-4 py-2 rounded-lg bg-[#1a1d21] text-[#F8F9FA] border-2 border-[#007BFF]/30 focus:border-[#A8E600] outline-none"
                        placeholder="e.g., 4-5 hours"
                      />
                    </div>

                    <div>
                      <label className="block text-[#F8F9FA] text-sm font-bold mb-2">Battery Capacity</label>
                      <input
                        type="text"
                        value={productForm.batteryCapacity}
                        onChange={(e) => setProductForm({...productForm, batteryCapacity: e.target.value})}
                        className="w-full px-4 py-2 rounded-lg bg-[#1a1d21] text-[#F8F9FA] border-2 border-[#007BFF]/30 focus:border-[#A8E600] outline-none"
                        placeholder="e.g., 3.2 kWh"
                      />
                    </div>

                    {activeSection === '3wheeler-products' && (
                      <div>
                        <label className="block text-[#F8F9FA] text-sm font-bold mb-2">Payload</label>
                        <input
                          type="text"
                          value={productForm.payload}
                          onChange={(e) => setProductForm({...productForm, payload: e.target.value})}
                          className="w-full px-4 py-2 rounded-lg bg-[#1a1d21] text-[#F8F9FA] border-2 border-[#007BFF]/30 focus:border-[#A8E600] outline-none"
                          placeholder="e.g., 500 kg"
                        />
                      </div>
                    )}
                  </div>

                  <div className="mb-4">
                    <label className="block text-[#F8F9FA] text-sm font-bold mb-2">Description *</label>
                    <textarea
                      value={productForm.description}
                      onChange={(e) => setProductForm({...productForm, description: e.target.value})}
                      className="w-full px-4 py-2 rounded-lg bg-[#1a1d21] text-[#F8F9FA] border-2 border-[#007BFF]/30 focus:border-[#A8E600] outline-none h-32"
                      placeholder="Enter detailed product description..."
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-[#F8F9FA] text-sm font-bold mb-2">Product Images * (Carousel)</label>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleProductImageUpload}
                      className="hidden"
                      id="product-image-upload"
                    />
                    <label
                      htmlFor="product-image-upload"
                      className="block w-full p-6 border-2 border-dashed border-[#007BFF] hover:border-[#A8E600] rounded-xl text-center cursor-pointer transition bg-[#1a1d21]"
                    >
                      <div className="text-4xl mb-2">☁️</div>
                      <p className="text-[#F8F9FA] font-bold">Click to add product images</p>
                      <p className="text-[#F8F9FA]/60 text-sm">Uploaded to Cloudinary CDN</p>
                    </label>

                    {productForm.images && productForm.images.length > 0 && (
                      <div className="grid grid-cols-4 gap-3 mt-4">
                        {productForm.images.map((img, index) => (
                          <div key={index} className="relative group">
                            <img src={img} alt="" className="w-full h-24 object-cover rounded-lg" />
                            <button
                              onClick={() => removeProductImage(index)}
                              className="absolute top-1 right-1 bg-red-600 text-white w-6 h-6 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition text-xs"
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <button
                    onClick={saveProduct}
                    className="w-full bg-[#A8E600] hover:bg-[#98d600] text-[#212529] px-6 py-3 rounded-full font-bold transition"
                  >
                    {editingProductIndex !== null ? '💾 Update Product' : '✅ Save Product'}
                  </button>
                </div>
              )}
            </div>

            {/* Products List */}
            <div className="bg-[#1a1d21] rounded-3xl p-8 border-2 border-[#007BFF]/30">
              <h2 className="text-2xl font-bold text-[#F8F9FA] mb-6">
                Product List ({currentProducts.length})
              </h2>

              {currentProducts.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📦</div>
                  <p className="text-[#F8F9FA]/60 text-lg">No products added yet</p>
                  <p className="text-[#F8F9FA]/40 text-sm mt-2">Click "Add New Product" to get started</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {currentProducts.map((product, index) => (
                    <div
                      key={index}
                      className="bg-[#2a2d31] rounded-xl p-6 border-2 border-transparent hover:border-[#A8E600] transition"
                    >
                      {product.images && product.images.length > 0 && (
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-48 object-cover rounded-lg mb-4"
                        />
                      )}
                      <h3 className="text-xl font-bold text-[#F8F9FA] mb-2">{product.name}</h3>
                      <p className="text-[#F8F9FA]/70 text-sm mb-4 line-clamp-2">{product.description}</p>
                      
                      <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
                        {product.price && <div className="text-[#A8E600]">💰 {product.price}</div>}
                        {product.range && <div className="text-[#F8F9FA]/70">🔋 {product.range}</div>}
                        {product.topSpeed && <div className="text-[#F8F9FA]/70">🏁 {product.topSpeed}</div>}
                        {product.motor && <div className="text-[#F8F9FA]/70">⚙️ {product.motor}</div>}
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => editProduct(index)}
                          className="flex-1 bg-[#007BFF] hover:bg-[#0056b3] text-white px-4 py-2 rounded-lg font-bold transition text-sm"
                        >
                          ✏️ Edit
                        </button>
                        <button
                          onClick={() => deleteProduct(index)}
                          className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-bold transition text-sm"
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {/* Info Box */}
        <div className="mt-8 bg-[#007BFF]/20 border border-[#007BFF] rounded-2xl p-6">
          <div className="flex items-start gap-3">
            <div className="text-2xl">ℹ️</div>
            <div>
              <h3 className="text-[#F8F9FA] font-bold mb-2">System Benefits</h3>
              <ul className="text-[#F8F9FA]/70 text-sm space-y-1">
                <li>• ✅ Works everywhere (incognito, all browsers, all devices)</li>
                <li>• ✅ Cloudinary for fast image delivery</li>
                <li>• ✅ Server storage for data persistence</li>
                <li>• ✅ No localStorage limitations</li>
                <li>• ✅ Real-time updates across all sessions</li>
              </ul>
              <p className="text-[#A8E600] text-sm mt-3 font-bold">
                💡 Check Browser Console (F12) for detailed API logs
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
