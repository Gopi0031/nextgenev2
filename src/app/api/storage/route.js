import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'

// GET - Read data
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const key = searchParams.get('key')
    
    if (!key) {
      return NextResponse.json({ error: 'Key is required' }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db('nextgen-ev')
    const collection = db.collection('storage')
    
    const doc = await collection.findOne({ key })
    console.log(`✅ Loaded ${key}:`, doc?.data?.length || 0, 'items')
    
    return NextResponse.json(doc?.data || [])
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
    
    console.log('Received POST request:', { key, dataLength: data?.length })
    
    if (!key) {
      return NextResponse.json({ error: 'Key is required' }, { status: 400 })
    }

    if (!data) {
      return NextResponse.json({ error: 'Data is required' }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db('nextgen-ev')
    const collection = db.collection('storage')
    
    await collection.updateOne(
      { key },
      { $set: { key, data, updatedAt: new Date() } },
      { upsert: true }
    )
    
    console.log('✅ Saved successfully to MongoDB!')
    
    return NextResponse.json({ success: true, itemCount: data.length })
  } catch (error) {
    console.error('Error saving data:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
