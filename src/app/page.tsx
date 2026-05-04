import Link from 'next/link'
import { ArrowRight, ShieldCheck, Home, MapPin, Search } from 'lucide-react'
import Image from 'next/image'

export default function HomePage() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center pt-20 overflow-hidden">
        <div className="absolute inset-0 bg-slate-900">
          <Image 
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
            alt="Premium Estate" 
            fill 
            className="object-cover opacity-50"
            priority
          />
        </div>
        <div className="relative z-10 container mx-auto px-4 md:px-8 text-center text-white">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
            Find Your Dream <span className="text-orange-500">Home</span> Today
          </h1>
          <p className="text-lg md:text-2xl text-slate-200 mb-10 max-w-2xl mx-auto">
            Experience premium, secure, and smart living spaces designed for comfort and everyday life.
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

      {/* Featured Property: Dariann Court Details */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2 relative h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl">
              <Image 
                src="https://images.unsplash.com/photo-1600607687931-cecebd803622?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Dariann Court"
                fill
                className="object-cover"
              />
              <div className="absolute top-4 left-4 bg-orange-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                Now Selling
              </div>
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Dariann Court</h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                At Dariann Court, life is easy and convenient. Smart home features, reliable security, and a great location mean you're always connected to what matters. With spacious 4-bedroom duplexes, this estate is designed for comfort and everyday living.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="bg-orange-100 p-3 rounded-xl text-orange-600">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Location</h4>
                    <p className="text-sm text-slate-600">Olive Park Estate, Lekki-Epe Express</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-orange-100 p-3 rounded-xl text-orange-600">
                    <Home className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Property Types</h4>
                    <p className="text-sm text-slate-600">4-Bed Detached Duplex + BQ</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-slate-200 pt-8">
                <div>
                  <p className="text-sm text-slate-500 font-medium uppercase tracking-wider mb-1">Starting From</p>
                  <p className="text-3xl font-bold text-orange-600">₦160M</p>
                </div>
                <Link href="/contact" className="bg-slate-900 text-white px-6 py-3 rounded-xl font-medium hover:bg-slate-800 transition">
                  Book Inspection
                </Link>
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
