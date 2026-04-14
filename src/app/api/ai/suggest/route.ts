import { getPlantSuggestion } from '@/lib/ai'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { plantName, description } = await request.json()
    if (!plantName || !description) {
      return NextResponse.json({ error: 'Dati mancanti' }, { status: 400 })
    }
    const suggestion = await getPlantSuggestion(plantName, description)
    return NextResponse.json({ suggestion })
  } catch {
    return NextResponse.json({ error: 'Errore AI' }, { status: 500 })
  }
}