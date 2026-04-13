import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const plants = await prisma.plant.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(plants)
  } catch {
    return NextResponse.json({ error: 'Errore nel recupero delle piante' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const plant = await prisma.plant.create({
      data: {
        name: body.name,
        species: body.species,
        location: body.location,
        notes: body.notes,
        wateringFrequency: body.wateringFrequency,
        sunlight: body.sunlight,
      },
    })
    return NextResponse.json(plant, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Errore nella creazione della pianta' }, { status: 500 })
  }
}