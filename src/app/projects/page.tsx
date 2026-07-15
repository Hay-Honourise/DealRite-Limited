'use client'

import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Search, Home, Tag, CheckCircle, Image as ImageIcon } from 'lucide-react'
import { Suspense } from 'react'

const PROJECTS_DATA = [
  {
    id: 'ownfarm-phase2',
    title: 'DealRite OwnFarm (Phase 2)',
    description: 'Join the lucrative agricultural real estate sector. Purchase your farm plots and let us handle the farming to generate a solid ROI for you.',
    location: 'Fiditi, Ibadan - Oyo Rd, Oyo State.',
    detail: 'Kilimanjaro, Ojoo, Ibadan | Saturday, April 25th 2026 | 9AM PROMPT',
    status: 'selling', // 'selling' or 'sold'
    badge: 'Phase 2 - Currently Selling',
    type: 'Farm Estate',
    image: '/ownfarm_phase2.jpg',
    link: 'https://surveyheart.com/form/6a55732b49d3efd14c713a53',
    tagline: 'High yield farming investment'
  },
  {
    id: 'coastal',
    title: 'Coastal Residence',
    description: 'A premium residential project offering luxurious living. Designed for those who appreciate comfort, modern architecture, and a serene environment.',
    location: 'Ajobo, Moniya, Ibadan.',
    detail: 'Premium Modern Residential Homes',
    status: 'selling',
    badge: 'Pre-Launch - Currently Selling',
    type: 'Residential Homes',
    image: '/coastal_prelaunch.jpg',
    link: 'https://surveyheart.com/form/6a55732b49d3efd14c713a53',
    tagline: 'Modern smart living'
  },
  {
    id: 'ownfarm-phase1',
    title: 'DealRite OwnFarm (Phase 1)',
    description: 'Our agricultural real estate Phase 1 project. Fully allocated and completed, bringing immediate satisfaction and return value to our early investors.',
    location: 'Fiditi, Ibadan - Oyo Rd, Oyo State.',
    detail: '100% Sold Out - Phase 1 Appreciation',
    status: 'sold',
    badge: 'Sold Out',
    type: 'Farm Estate',
    image: '/ownfarm_soldout.jpg',
    link: '#',
    tagline: 'Delivered project'
  },
  {
    id: 'golden-estate',
    title: 'DealRite Golden Estate (Phase 1)',
    description: 'Our flagship residential estate that sold out in record time. Home to hundreds of families who invested early and are now enjoying premium infrastructure.',
    location: 'Elenusonso, Ido LGA, Ibadan, Oyo State.',
    detail: 'Fully Allocated & Developed Gated Community',
    status: 'sold',
    badge: 'Sold Out',
    type: 'Premium Plots',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    link: '#',
    tagline: 'Delivered project'
  },
  {
    id: 'grandview',
    title: 'Grand View Courts',
    description: 'A premium boutique estate offering picturesque views and absolute serenity. Fully purchased and now entering structural construction phase.',
    location: 'Arikuyeri, Moniya, Ibadan, Oyo State.',
    detail: '100% Sold Out - Infrastructure Development On-going',
    status: 'sold',
    badge: 'Sold Out',
    type: 'Luxury Residential',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    link: '#',
    tagline: 'Delivered project'
  }
]

function ProjectsContent() {
  const searchParams = useSearchParams()
  const filterStatus = searchParams.get('status') // 'selling' | 'sold' | null (all)

  const filteredProjects = PROJECTS_DATA.filter(project => {
    if (!filterStatus) return true
    return project.status === filterStatus
  })

  const titleText = filterStatus === 'selling' 
    ? 'Currently Selling Projects' 
    : filterStatus === 'sold' 
      ? 'Sold Out Developments' 
      : 'Our Properties & Projects'

  return (
    <div className="pt-32 pb-24 min-h-screen bg-slate-50 w-full">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <span className="text-orange-600 font-semibold text-sm tracking-wider uppercase">Our Portfolio</span>
          <h1 className="text-4xl font-extrabold text-slate-900 mt-2 mb-4">{titleText}</h1>
          <p className="text-slate-600">
            Explore our curated developments, from active premium plots to fully sold-out gated communities.
          </p>
        </div>

        {/* Filter Navigation Links on Page */}
        <div className="flex justify-center gap-4 mb-12">
          <Link
            href="/projects"
            className={`px-5 py-2.5 rounded-full text-sm font-semibold transition ${
              !filterStatus 
                ? 'bg-slate-900 text-white' 
                : 'bg-white text-slate-600 hover:bg-slate-100'
            }`}
          >
            All Projects ({PROJECTS_DATA.length})
          </Link>
          <Link
            href="/projects?status=selling"
            className={`px-5 py-2.5 rounded-full text-sm font-semibold transition ${
              filterStatus === 'selling' 
                ? 'bg-orange-600 text-white' 
                : 'bg-white text-slate-600 hover:bg-slate-100'
            }`}
          >
            Currently Selling ({PROJECTS_DATA.filter(p => p.status === 'selling').length})
          </Link>
          <Link
            href="/projects?status=sold"
            className={`px-5 py-2.5 rounded-full text-sm font-semibold transition ${
              filterStatus === 'sold' 
                ? 'bg-slate-500 text-white' 
                : 'bg-white text-slate-600 hover:bg-slate-100'
            }`}
          >
            Sold Out ({PROJECTS_DATA.filter(p => p.status === 'sold').length})
          </Link>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {filteredProjects.map((project) => {
            const isSold = project.status === 'sold'
            return (
              <div 
                key={project.id} 
                className={`bg-white rounded-3xl overflow-hidden shadow-xl group flex flex-col transition duration-300 relative ${
                  isSold ? 'opacity-85 border border-slate-200' : ''
                }`}
              >
                {/* Image & Badge */}
                <div className="relative w-full overflow-hidden shrink-0 bg-white border-b border-slate-100 aspect-[16/10]">
                  <Image 
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className={`absolute top-4 left-4 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-md ${
                    isSold ? 'bg-slate-500' : 'bg-orange-600'
                  }`}>
                    {project.badge}
                  </div>
                  
                  {isSold && (
                    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] flex items-center justify-center">
                      <div className="bg-red-600/90 text-white text-lg font-bold tracking-wider uppercase px-6 py-2 rounded-xl shadow-lg border border-red-500">
                        Sold Out
                      </div>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col flex-grow">
                  <span className="text-orange-600 font-bold text-xs uppercase tracking-wide mb-1 flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5" />
                    {project.type}
                  </span>
                  <h3 className="text-3xl font-extrabold text-slate-900 mb-4">{project.title}</h3>
                  <p className="text-slate-600 mb-6 leading-relaxed flex-grow">
                    {project.description}
                  </p>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">Location</h4>
                        <p className="text-sm text-slate-600">{project.location}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      {isSold ? (
                        <CheckCircle className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
                      ) : (
                        <Search className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                      )}
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">
                          {isSold ? 'Status Detail' : 'Meet Location & Time'}
                        </h4>
                        <p className="text-sm text-slate-600 whitespace-pre-line">{project.detail}</p>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-3 mt-auto w-full">
                    <div className="flex gap-3 w-full">
                      {isSold ? (
                        <>
                          <button 
                            disabled 
                            className="flex-1 text-center bg-slate-100 text-slate-400 px-4 py-3.5 rounded-xl font-bold cursor-not-allowed text-xs uppercase tracking-wider"
                          >
                            Sold Out
                          </button>
                          <Link 
                            href={project.id === 'ownfarm-phase1' ? '/faqs#ownfarm-phase1' : '/faqs'} 
                            className="flex-1 text-center bg-orange-50 text-[#FC6600] px-4 py-3.5 rounded-xl font-bold hover:bg-orange-100/50 transition flex items-center justify-center text-xs uppercase tracking-wider border border-orange-100"
                          >
                            FAQs
                          </Link>
                        </>
                      ) : (
                        <>
                          <Link 
                            href={project.link} 
                            target="_blank"
                            className="flex-1 text-center bg-slate-950 text-white px-4 py-3.5 rounded-xl font-bold hover:bg-slate-900 transition whitespace-nowrap text-xs uppercase tracking-wider font-extrabold flex items-center justify-center shadow-lg hover:shadow-xl shadow-slate-950/10"
                          >
                            Book Free Inspection
                          </Link>
                          <Link 
                            href={project.id === 'ownfarm-phase2' ? '/faqs#ownfarm' : project.id === 'coastal' ? '/faqs#coastal' : '/faqs'} 
                            className="flex-1 text-center bg-orange-50 text-[#FC6600] px-4 py-3.5 rounded-xl font-bold hover:bg-orange-100/50 transition text-xs uppercase tracking-wider border border-orange-100 flex items-center justify-center"
                          >
                            FAQs & Details
                          </Link>
                        </>
                      )}
                    </div>

                    {/* View Allocation Gallery */}
                    {(project.id === 'coastal' || project.id === 'ownfarm-phase2' || project.id === 'ownfarm-phase1') && (
                      <Link 
                        href={project.id === 'coastal' ? '/news/allocation/coastal' : '/news/allocation/ownfarm'} 
                        className="w-full text-center bg-orange-600 hover:bg-orange-700 text-white px-4 py-3.5 rounded-xl font-bold transition text-xs uppercase tracking-wider font-extrabold flex items-center justify-center gap-1.5 shadow-lg shadow-orange-600/10 hover:shadow-orange-600/20 active:scale-[0.99] duration-150"
                      >
                        <ImageIcon className="w-4 h-4" /> View Allocation Gallery
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default function ProjectsPage() {
  return (
    <Suspense fallback={
      <div className="pt-32 pb-24 min-h-screen bg-slate-50 flex items-center justify-center w-full">
        <div className="text-slate-500 font-medium">Loading projects...</div>
      </div>
    }>
      <ProjectsContent />
    </Suspense>
  )
}
