import { writeFile, readFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { NextResponse } from 'next/server'
import { existsSync } from 'fs'

const DATA_DIR = join(process.cwd(), 'data')

// Ensure data directory exists
async function ensureDataDir() {
  if (!existsSync(DATA_DIR)) {
    await mkdir(DATA_DIR, { recursive: true })
  }
}

// GET - Read data
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const key = searchParams.get('key')
    
    if (!key) {
      return NextResponse.json({ error: 'Key is required' }, { status: 400 })
    }

    await ensureDataDir()
    const filePath = join(DATA_DIR, `${key}.json`)
    
    if (!existsSync(filePath)) {
      console.log(`File not found: ${filePath}, returning empty array`)
      return NextResponse.json([])
    }

    const data = await readFile(filePath, 'utf-8')
    const parsed = JSON.parse(data)
    console.log(`Loaded ${key}:`, parsed.length, 'items')
    return NextResponse.json(parsed)
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

    await ensureDataDir()
    const filePath = join(DATA_DIR, `${key}.json`)
    
    console.log('Saving to:', filePath)
    await writeFile(filePath, JSON.stringify(data, null, 2))
    console.log('✅ Saved successfully!')
    
    return NextResponse.json({ success: true, itemCount: data.length })
  } catch (error) {
    console.error('Error saving data:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
