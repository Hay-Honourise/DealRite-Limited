import Image from 'next/image'
import { PrismaClient } from '@prisma/client'
import Link from 'next/link'
import { MapPin, ArrowRight } from 'lucide-react'

const prisma = new PrismaClient()

export const dynamic = 'force-dynamic'

export default async function ProjectsPage() {
  const properties = await prisma.property.findMany({
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="pt-24 pb-16 min-h-screen bg-slate-50 w-full">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Our Projects</h1>
          <p className="text-slate-600">Explore our portfolio of premium real estate properties designed for luxurious and comfortable living.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => {
            const images = JSON.parse(property.images || '[]')
            const coverImage = images[0] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            
            return (
              <div key={property.id} className="bg-white rounded-2xl overflow-hidden shadow-lg group hover:shadow-xl transition-shadow">
                <div className="relative h-64 w-full overflow-hidden">
                  <Image 
                    src={coverImage} 
                    alt={property.title} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-orange-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
                    {property.status}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">{property.title}</h3>
                  <div className="flex items-center gap-2 text-slate-500 mb-4 text-sm">
                    <MapPin className="w-4 h-4" />
                    <span className="truncate">{property.location}</span>
                  </div>
                  <p className="text-orange-600 font-bold text-xl mb-6">{property.price}</p>
                  
                  <Link href="/contact" className="w-full block text-center bg-slate-100 text-slate-800 py-3 rounded-xl font-semibold hover:bg-orange-600 hover:text-white transition-colors flex items-center justify-center gap-2">
                    Book Inspection <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            )
          })}
          
          {properties.length === 0 && (
            <div className="col-span-full text-center py-12 text-slate-500">
              No projects found. Check back later.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
