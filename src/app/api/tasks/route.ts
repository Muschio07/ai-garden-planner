import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: [{ completed: 'asc' }, { dueDate: 'asc' }],
      include: { plant: { select: { name: true } } },
    })
    return NextResponse.json(tasks)
  } catch {
    return NextResponse.json({ error: 'Errore nel recupero dei task' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const task = await prisma.task.create({
      data: {
        title: body.title,
        type: body.type,
        priority: body.priority ?? 'medium',
        dueDate: body.dueDate ? new Date(body.dueDate) : null,
        notes: body.notes,
        plantId: body.plantId,
      },
      include: { plant: { select: { name: true } } },
    })
    return NextResponse.json(task, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Errore nella creazione del task' }, { status: 500 })
  }
}