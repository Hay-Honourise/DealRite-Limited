import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const categories = [
    'Buying Tips',
    'Real Estate News',
    'Market Trends',
    'Home Decor',
    'Investment Guides',
    'Property Showcases',
    'Inside DealRite'
  ]

  for (const name of categories) {
    await prisma.category.upsert({
      where: { name },
      update: {},
      create: { name }
    })
  }

  console.log('Categories seeded successfully!')
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect()
  })
