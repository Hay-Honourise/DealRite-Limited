import Image from 'next/image'
import { CheckCircle2 } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="pt-24 pb-16 min-h-screen bg-white w-full">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-slate-900 mb-6">About DealRite Realty Limited</h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            We are a premium real estate development and investment company dedicated to creating smart, secure, and luxurious living spaces.
          </p>
        </div>

        {/* Image and Story */}
        <div className="flex flex-col lg:flex-row gap-16 items-center mb-24">
          <div className="lg:w-1/2 relative h-[500px] w-full rounded-3xl overflow-hidden shadow-2xl">
            <Image 
              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
              alt="Our Story"
              fill
              className="object-cover"
            />
          </div>
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Building the Future of Real Estate</h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              Founded on the principles of trust, excellence, and innovation, DealRite Realty Limited has grown to become a leading name in the property sector. We don't just build houses; we curate lifestyles.
            </p>
            <p className="text-slate-600 leading-relaxed mb-8">
              Our projects, like Coastal Residence and DealRite OwnFarm, are a testament to our commitment to quality. From smart home integrations to unparalleled security systems, we ensure our clients get the best value for their investments.
            </p>
            
            <ul className="space-y-4">
              {[
                "Uncompromising Quality & Standards",
                "Transparent & Ethical Practices",
                "Customer-Centric Approach",
                "Sustainable Development"
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3 text-slate-800 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-orange-600" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Team/Leadership Placeholder */}
        <div className="text-center bg-slate-50 py-16 rounded-3xl">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Leadership</h2>
          <p className="text-slate-600 mb-10 max-w-2xl mx-auto">
            Driven by a team of visionary experts in real estate, finance, and architecture.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition">
                <div className="w-24 h-24 bg-slate-200 rounded-full mx-auto mb-4 overflow-hidden relative">
                  <Image src={`https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80`} alt="Team Member" fill className="object-cover" />
                </div>
                <h3 className="font-bold text-slate-900 text-lg">Executive Name</h3>
                <p className="text-orange-600 text-sm font-medium">Director</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
