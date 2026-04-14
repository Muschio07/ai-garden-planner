
import "dotenv/config"
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.task.deleteMany()
  await prisma.plant.deleteMany()

  const basilico = await prisma.plant.create({
    data: {
      name: 'Basilico',
      species: 'Ocimum basilicum',
      location: 'Balcone sud',
      sunlight: 'Pieno sole',
      wateringFrequency: 'Ogni giorno',
      notes: 'Tenere lontano dal vento. Raccogliere le foglie regolarmente.',
    },
  })

  const ficus = await prisma.plant.create({
    data: {
      name: 'Ficus Benjamin',
      species: 'Ficus benjamina',
      location: 'Soggiorno',
      sunlight: 'Sole parziale',
      wateringFrequency: 'Una volta a settimana',
      notes: 'Non spostare spesso, perde le foglie facilmente.',
    },
  })

  const rosa = await prisma.plant.create({
    data: {
      name: 'Rosa rampicante',
      species: 'Rosa multiflora',
      location: 'Giardino',
      sunlight: 'Pieno sole',
      wateringFrequency: 'Ogni 2-3 giorni',
      notes: 'Potare a fine inverno. Attenta agli afidi in primavera.',
    },
  })

  const aloe = await prisma.plant.create({
    data: {
      name: 'Aloe Vera',
      species: 'Aloe barbadensis',
      location: 'Davanzale cucina',
      sunlight: 'Pieno sole',
      wateringFrequency: 'Ogni 2 settimane',
      notes: "Resiste bene alla siccità. Evitare ristagni d'acqua.",
    },
  })

  const lavanda = await prisma.plant.create({
    data: {
      name: 'Lavanda',
      species: 'Lavandula angustifolia',
      location: 'Balcone nord',
      sunlight: 'Pieno sole',
      wateringFrequency: 'Raramente',
      notes: 'Molto resistente. Ottima per tenere lontani gli insetti.',
    },
  })

  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  const nextWeek = new Date(today)
  nextWeek.setDate(nextWeek.getDate() + 7)
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)

  await prisma.task.createMany({
    data: [
      {
        title: 'Annaffia il basilico',
        type: 'watering',
        priority: 'high',
        dueDate: today,
        plantId: basilico.id,
        notes: 'Controlla che il terreno sia asciutto prima di annaffiare.',
      },
      {
        title: 'Raccogli le foglie mature',
        type: 'other',
        priority: 'medium',
        dueDate: tomorrow,
        plantId: basilico.id,
      },
      {
        title: 'Annaffia il Ficus',
        type: 'watering',
        priority: 'medium',
        dueDate: today,
        plantId: ficus.id,
      },
      {
        title: 'Controlla le foglie per parassiti',
        type: 'other',
        priority: 'low',
        dueDate: nextWeek,
        plantId: ficus.id,
      },
      {
        title: 'Annaffia la rosa',
        type: 'watering',
        priority: 'high',
        dueDate: yesterday,
        completed: true,
        plantId: rosa.id,
      },
      {
        title: 'Controlla afidi sui germogli',
        type: 'other',
        priority: 'high',
        dueDate: today,
        plantId: rosa.id,
        notes: 'Primavera: periodo critico per gli afidi.',
      },
      {
        title: 'Pota i rami secchi',
        type: 'pruning',
        priority: 'medium',
        dueDate: nextWeek,
        plantId: rosa.id,
      },
      {
        title: 'Annaffia aloe',
        type: 'watering',
        priority: 'low',
        dueDate: nextWeek,
        plantId: aloe.id,
      },
      {
        title: 'Fertilizza la lavanda',
        type: 'fertilizing',
        priority: 'low',
        dueDate: nextWeek,
        plantId: lavanda.id,
      },
    ],
  })

  console.log('✅ Seed completato — 5 piante e 9 task aggiunti')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())