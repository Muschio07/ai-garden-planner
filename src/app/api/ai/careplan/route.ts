import { getWeeklyCareplan } from '@/lib/ai'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { plantName, species, location, sunlight, wateringFrequency } = await request.json()
    if (!plantName) {
      return NextResponse.json({ error: 'Nome pianta mancante' }, { status: 400 })
    }
    const careplan = await getWeeklyCareplan(plantName, species, location, sunlight, wateringFrequency)
    return NextResponse.json({ careplan })
  } catch {
    return NextResponse.json({ error: 'Errore AI' }, { status: 500 })
  }
}