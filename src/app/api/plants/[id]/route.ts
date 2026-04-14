import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const plant = await prisma.plant.findUnique({ where: { id } })
  if (!plant) return NextResponse.json({ error: 'Pianta non trovata' }, { status: 404 })
  return NextResponse.json(plant)
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const body = await request.json()
  const plant = await prisma.plant.update({
    where: { id },
    data: {
      name: body.name,
      species: body.species,
      location: body.location,
      notes: body.notes,
      wateringFrequency: body.wateringFrequency,
      sunlight: body.sunlight,
    },
  })
  return NextResponse.json(plant)
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  await prisma.plant.delete({ where: { id } })
  return NextResponse.json({ success: true })
}