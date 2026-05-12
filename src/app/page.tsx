import Link from 'next/link'
import { ArrowRight, ShieldCheck, Home, MapPin, Search } from 'lucide-react'
import Image from 'next/image'

export default function HomePage() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center pt-20 overflow-hidden">
        <div className="absolute inset-0 bg-slate-900">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover opacity-50"
          >
            <source src="/DealRite-homepage-video.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="relative z-10 container mx-auto px-4 md:px-8 text-center text-white">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
            The Path to Finding a <span className="text-orange-500">Luxurious</span> Lifestyle
          </h1>
          <p className="text-lg md:text-2xl text-slate-200 mb-10 max-w-2xl mx-auto">
            ... Your Right Investment Deal
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/projects" className="bg-orange-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-orange-700 transition flex items-center justify-center gap-2">
              Explore Projects <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/contact" className="bg-white text-slate-900 px-8 py-4 rounded-full font-semibold hover:bg-slate-100 transition flex items-center justify-center gap-2">
              Book Inspection
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Ongoing Projects */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Our Ongoing Projects</h2>
            <p className="text-lg text-slate-600">Discover our latest developments designed to bring you high returns and premium living experiences.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
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
                    Book Inspection
                  </Link>
                  <Link href="/faqs" className="flex-1 text-center bg-orange-100 text-orange-600 px-4 py-3 rounded-xl font-medium hover:bg-orange-200 transition">
                    FAQs
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
                    Book Inspection
                  </Link>
                  <Link href="/faqs" className="flex-1 text-center bg-orange-100 text-orange-600 px-4 py-3 rounded-xl font-medium hover:bg-orange-200 transition">
                    FAQs
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us / Features */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8 text-center max-w-5xl">
          <h2 className="text-4xl font-bold text-slate-900 mb-16">Why Choose DealRite?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600 mb-6 transform -rotate-6 hover:rotate-0 transition duration-300">
                <ShieldCheck className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Top-tier Security</h3>
              <p className="text-slate-600 leading-relaxed">Enjoy 24/7 security with CCTV surveillance, fingerprint access, and motion-detecting lights across all our properties.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600 mb-6 transform rotate-6 hover:rotate-0 transition duration-300">
                <Home className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Smart-Enabled Homes</h3>
              <p className="text-slate-600 leading-relaxed">Experience modern convenience with pre-installed smart home technology for lighting, security, and climate control.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600 mb-6 transform -rotate-3 hover:rotate-0 transition duration-300">
                <MapPin className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Prime Locations</h3>
              <p className="text-slate-600 leading-relaxed">Our properties offer quick access to malls, entertainment centers, business hubs, and highly rated schools.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-24 bg-orange-600 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        <div className="relative z-10 container mx-auto px-4 max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to find your next home?</h2>
          <p className="text-orange-100 text-lg md:text-xl mb-10">Get in touch with our expert consultants today and schedule an inspection.</p>
          <Link href="/contact" className="inline-block bg-white text-orange-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-orange-50 hover:scale-105 transition transform shadow-xl">
            Contact Us Now
          </Link>
        </div>
      </section>
    </div>
  )
}
