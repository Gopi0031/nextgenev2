import { writeFile, readFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { NextResponse } from 'next/server'
import { existsSync } from 'fs'

const DATA_DIR = join(process.cwd(), 'data')

// GET - Read data
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const key = searchParams.get('key')
    
    if (!key) {
      return NextResponse.json({ error: 'Key is required' }, { status: 400 })
    }

    // Auto-create data folder if it doesn't exist
    if (!existsSync(DATA_DIR)) {
      await mkdir(DATA_DIR, { recursive: true })
    }

    const filePath = join(DATA_DIR, `${key}.json`)
    
    if (!existsSync(filePath)) {
      return NextResponse.json([])
    }

    const data = await readFile(filePath, 'utf-8')
    return NextResponse.json(JSON.parse(data))
  } catch (error) {
    console.error('Error reading data:', error)
    return NextResponse.json([])
  }
}

// POST - Save data
export async function POST(request) {
  try {
    const { key, data } = await request.json()
    
    if (!key) {
      return NextResponse.json({ error: 'Key is required' }, { status: 400 })
    }

    // Auto-create data folder if it doesn't exist
    if (!existsSync(DATA_DIR)) {
      await mkdir(DATA_DIR, { recursive: true })
    }

    const filePath = join(DATA_DIR, `${key}.json`)
    await writeFile(filePath, JSON.stringify(data, null, 2))
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error saving data:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
 