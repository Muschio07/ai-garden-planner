import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const body = await request.json()
  const task = await prisma.task.update({
    where: { id },
    data: {
      title: body.title,
      type: body.type,
      priority: body.priority,
      dueDate: body.dueDate ? new Date(body.dueDate) : null,
      notes: body.notes,
      completed: body.completed,
    },
  })
  return NextResponse.json(task)
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  await prisma.task.delete({ where: { id } })
  return NextResponse.json({ success: true })
}