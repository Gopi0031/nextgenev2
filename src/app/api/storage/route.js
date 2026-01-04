import { NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// GET - Read data
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const key = searchParams.get('key')
    
    if (!key) {
      return NextResponse.json({ error: 'Key is required' }, { status: 400 })
    }

    try {
      // Fetch JSON file from Cloudinary
      const result = await cloudinary.api.resource(
        `nextgen-ev-data/${key}`,
        { resource_type: 'raw' }
      )
      
      // Download the JSON content
      const response = await fetch(result.secure_url)
      const data = await response.json()
      
      console.log(`✅ Loaded ${key}:`, data.length, 'items')
      return NextResponse.json(data)
    } catch (error) {
      if (error.error?.http_code === 404) {
        console.log(`File ${key} not found, returning empty array`)
        return NextResponse.json([])
      }
      throw error
    }
  } catch (error) {
    console.error('Error reading data:', error)
    return NextResponse.json([])
  }
}

// POST - Save data
export async function POST(request) {
  try {
    const body = await request.json()
    const { key, data } = body
    
    console.log('📤 Saving to Cloudinary:', { key, dataLength: data?.length })
    
    if (!key) {
      return NextResponse.json({ error: 'Key is required' }, { status: 400 })
    }

    if (!data) {
      return NextResponse.json({ error: 'Data is required' }, { status: 400 })
    }

    // Convert data to JSON string and upload to Cloudinary
    const jsonString = JSON.stringify(data, null, 2)
    const buffer = Buffer.from(jsonString)
    
    // Upload as raw file to Cloudinary
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'nextgen-ev-data',
          public_id: key,
          resource_type: 'raw',
          format: 'json',
          overwrite: true
        },
        (error, result) => {
          if (error) reject(error)
          else resolve(result)
        }
      )
      uploadStream.end(buffer)
    })

    console.log('✅ Saved successfully to Cloudinary!')
    
    return NextResponse.json({ success: true, itemCount: data.length })
  } catch (error) {
    console.error('❌ Error saving data:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
