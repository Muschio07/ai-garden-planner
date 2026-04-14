import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.plant.deleteMany()

  await prisma.plant.createMany({
    data: [
      {
        name: 'Basilico',
        species: 'Ocimum basilicum',
        location: 'Balcone sud',
        sunlight: 'Pieno sole',
        wateringFrequency: 'Ogni giorno',
        notes: 'Tenere lontano dal vento. Raccogliere le foglie regolarmente.',
      },
      {
        name: 'Ficus Benjamin',
        species: 'Ficus benjamina',
        location: 'Soggiorno',
        sunlight: 'Sole parziale',
        wateringFrequency: 'Una volta a settimana',
        notes: 'Non spostare spesso, perde le foglie facilmente.',
      },
      {
        name: 'Rosa rampicante',
        species: 'Rosa multiflora',
        location: 'Giardino',
        sunlight: 'Pieno sole',
        wateringFrequency: 'Ogni 2-3 giorni',
        notes: 'Potare a fine inverno. Attenta agli afidi in primavera.',
      },
      {
        name: 'Aloe Vera',
        species: 'Aloe barbadensis',
        location: 'Davanzale cucina',
        sunlight: 'Pieno sole',
        wateringFrequency: 'Ogni 2 settimane',
        notes: 'Resiste bene alla siccità. Evitare ristagni d\'acqua.',
      },
      {
        name: 'Lavanda',
        species: 'Lavandula angustifolia',
        location: 'Balcone nord',
        sunlight: 'Pieno sole',
        wateringFrequency: 'Raramente',
        notes: 'Molto resistente. Ottima per tenere lontani gli insetti.',
      },
    ],
  })

  console.log('✅ Seed completato — 5 piante aggiunte')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())