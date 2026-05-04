import 'dotenv/config'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
async function main() {
  const defaultProperty = await prisma.property.create({
    data: {
      title: 'Dariann Court',
      description: 'At Dariann Court, life is easy and convenient. Smart home features, reliable security, and a great location mean you are always connected to what matters. With spacious 4-bedroom duplexes, this estate is designed for comfort and everyday living. Whether you are looking for a home or an investment, Dariann Court offers a secure, well-placed space where you can truly settle in and enjoy life.',
      location: 'Olive Park Estate, Opposite LandWey Office, after Lagos Business School, Off Lekki-Epe Expressway, Lagos.',
      price: 'Starting from ₦160M',
      status: 'Ongoing',
      features: JSON.stringify([
        '24/7 security with CCTV surveillance',
        'Smart-Enabled Homes',
        'Prime Location with quick access to malls',
        'Gated Community',
        '4-Bedroom Fully Detached Duplex + BQ',
        '4-Bedroom Terrace'
      ]),
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600607687931-cecebd803622?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
      ]),
    },
  })
  console.log('Database seeded with property:', defaultProperty.title)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
