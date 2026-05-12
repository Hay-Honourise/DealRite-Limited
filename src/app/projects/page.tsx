import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Search, Home } from 'lucide-react'

export default function ProjectsPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-slate-50 w-full">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Our Active Projects</h1>
          <p className="text-slate-600">Discover our latest developments designed to bring you high returns and premium living experiences.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* OwnFarm Estate */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-xl group flex flex-col">
            <div className="relative w-full overflow-hidden shrink-0 bg-white border-b border-slate-100">
              <Image 
                src="/ownfarm.jpeg"
                alt="DealRite OwnFarm"
                width={800}
                height={1000}
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4 bg-orange-600 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-md">
                Estate Allocation
              </div>
            </div>
            <div className="p-8 flex flex-col flex-grow">
              <h3 className="text-3xl font-bold text-slate-900 mb-4">DealRite OwnFarm</h3>
              <p className="text-slate-600 mb-6 leading-relaxed flex-grow">
                Join the lucrative agricultural real estate sector. Purchase your farm plots and let us handle the farming to generate a solid ROI for you.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-slate-900">Location</h4>
                    <p className="text-sm text-slate-600">Fiditi, Ibadan - Oyo Rd, Oyo State.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Search className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-slate-900">Meet Location & Time</h4>
                    <p className="text-sm text-slate-600">Kilimanjaro, Ojoo, Ibadan<br/>Saturday, April 25th 2026 | 9AM PROMPT</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col xl:flex-row gap-3 mt-auto">
                <Link href="https://surveyheart.com/form/69e462b8001e39939dc2b237" className="flex-1 text-center bg-slate-900 text-white px-4 py-3 rounded-xl font-medium hover:bg-slate-800 transition whitespace-nowrap">
                  Learn More
                </Link>
                <Link href="/faqs" className="flex-1 text-center bg-orange-100 text-orange-600 px-4 py-3 rounded-xl font-medium hover:bg-orange-200 transition">
                  FAQs & Form
                </Link>
              </div>
            </div>
          </div>

          {/* Coastal Residence */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-xl group flex flex-col">
            <div className="relative w-full overflow-hidden shrink-0 bg-white border-b border-slate-100">
              <Image 
                src="/coastal.jpeg"
                alt="Coastal Residence"
                width={800}
                height={1000}
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4 bg-orange-600 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-md">
                Official Launching
              </div>
            </div>
            <div className="p-8 flex flex-col flex-grow">
              <h3 className="text-3xl font-bold text-slate-900 mb-4">Coastal Residence</h3>
              <p className="text-slate-600 mb-6 leading-relaxed flex-grow">
                A premium residential project offering luxurious living. Designed for those who appreciate comfort, modern architecture, and a serene environment.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-slate-900">Location</h4>
                    <p className="text-sm text-slate-600">Ajobo, Moniya, Ibadan.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Home className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-slate-900">Property Types</h4>
                    <p className="text-sm text-slate-600">Premium Modern Residential Homes</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col xl:flex-row gap-3 mt-auto">
                <Link href="https://surveyheart.com/form/69e462b8001e39939dc2b237" className="flex-1 text-center bg-slate-900 text-white px-4 py-3 rounded-xl font-medium hover:bg-slate-800 transition whitespace-nowrap">
                  Learn More
                </Link>
                <Link href="/faqs" className="flex-1 text-center bg-orange-100 text-orange-600 px-4 py-3 rounded-xl font-medium hover:bg-orange-200 transition">
                  FAQs & Form
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
