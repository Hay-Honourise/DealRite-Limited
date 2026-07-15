'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { 
  ArrowLeft, 
  ChevronLeft, 
  ChevronRight, 
  X, 
  Image as ImageIcon, 
  Calendar, 
  MapPin, 
  ExternalLink,
  CheckCircle2,
  Phone,
  MessageSquare,
  FileText,
  DollarSign,
  Compass
} from 'lucide-react'

// Import gallery data
import coastalGallery from './coastal_gallery.json'
import ownfarmGallery from './ownfarm_gallery.json'

type GalleryItem = {
  id: string
  name: string
}

export default function AllocationGalleryPage() {
  const params = useParams()
  const router = useRouter()
  const id = params?.id as string

  const [gallery, setGallery] = useState<GalleryItem[]>([])
  const [filteredGallery, setFilteredGallery] = useState<GalleryItem[]>([])
  const [activeTab, setActiveTab] = useState<'all' | 'ceremony' | 'site' | 'team'>('all')

  const [title, setTitle] = useState('')
  const [subtitle, setSubtitle] = useState('')
  const [location, setLocation] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')
  const [originalDriveLink, setOriginalDriveLink] = useState('')

  // Project features, landmarks, pricing
  const [documentBadges, setDocumentBadges] = useState<string[]>([])
  const [landmarks, setLandmarks] = useState<string[]>([])
  const [prices, setPrices] = useState<{ size: string; price: string; extra?: string }[]>([])
  const [benefits, setBenefits] = useState<string[]>([])

  // Lightbox state
  const [activeIdx, setActiveIdx] = useState<number | null>(null)

  useEffect(() => {
    if (id === 'coastal') {
      setGallery(coastalGallery)
      setFilteredGallery(coastalGallery)
      setTitle('Coastal Residence')
      setSubtitle('Milestone Event: Handing Over Dream Homes & Land Plots')
      setLocation('Ajobo, Moniya, Ibadan, Oyo State')
      setDate('December 2025')
      setOriginalDriveLink('https://drive.google.com/drive/folders/1-Z9_yme9Lw4RfqG-tnkSNXkXU5WUQMJR')
      setDescription(
        'At DealRite Realty Limited, we believe that Real Estate equals Real Value. The physical allocation ceremony for our premium Coastal Residence estate stands as a testament to this philosophy. Our clients and early investors celebrated taking physical possession of their premium layout plots, backed by fully executed Contracts of Sale, registered surveys, and authenticated deeds. Explore the details and highlights of our landmark physical allocation event below.'
      )
      setDocumentBadges(['Registered Survey', 'Free Deed of Agreement', 'Instant Physical Allocation', 'No Developmental Fee'])
      setLandmarks(['Moniya Train Station', 'IITA Ibadan', 'Ojoo Bus Terminal', 'New Ibadan Inland Dry Port (Akinyele LGA)'])
      setPrices([
        { size: '250 SQM', price: '₦750,000' },
        { size: '500 SQM', price: '₦1,500,000' },
        { size: '1000 SQM', price: '₦3,000,000' },
        { size: '1500 SQM', price: '₦4,500,000' },
        { size: '3000 SQM', price: '₦9,000,000' }
      ])
      setBenefits([
        'Motorable Road Network',
        'Electricity Connection ready',
        'Completely free of encumbrance',
        'Gated & Secured Estate layout',
        'Instant block building clearance',
        'Direct connection to Moniya Main Rd'
      ])
    } else if (id === 'ownfarm') {
      setGallery(ownfarmGallery)
      setFilteredGallery(ownfarmGallery)
      setTitle('DealRite OwnFarm')
      setSubtitle('Agro-Investment Fulfillment: Empowering Sustainable Wealth')
      setLocation('Fiditi, Ibadan—Oyo Road, Oyo State')
      setDate('April 2026')
      setOriginalDriveLink('https://drive.google.com/drive/folders/1n9iwsIFpTrjQ8_aZMihP7YU0CzMP-V2Z')
      setDescription(
        'Congratulations to our agro-investors! The OwnFarm physical allocation ceremony marked the official physical handover of high-yield farming plots. Our clients took possession of their farm deeds, layout surveys, and signed Memorandums of Understanding to kickstart their agricultural wealth generation journey. Browse the gallery below to share in the joy and success of our physical allocation ceremony.'
      )
      setDocumentBadges(['Registered Survey', 'Deed of Assignment', 'Memorandum of Understanding (MOU)', 'Cassava, Tomatoes & Palm crop management'])
      setLandmarks(['Kola Daisi University', 'Fiditi Grammar School', 'Micheal Koleosho GRA', 'Bethel American College', 'Deeper Life High School', 'Grey West Mineral Processing Center'])
      setPrices([
        { size: '500 SQM (1 Plot)', price: '₦800,000', extra: 'ROI N75k - N85k (Cassava)' },
        { size: '1000 SQM (2 Plots)', price: '₦1,600,000', extra: 'ROI N150k - N170k (Cassava)' },
        { size: '1500 SQM (Half Acre)', price: '₦2,400,000', extra: 'Agro Landbanking option' },
        { size: '3000 SQM (1 Acre)', price: '₦4,800,000', extra: 'ROI N450k - N510k (Cassava)' }
      ])
      setBenefits([
        'Managed Farming Services',
        'Harvest yield payout after 12 months',
        'No farming experience required',
        'Perimeter fencing & farm security',
        'Buy 1 Hectare, Get 1 Plot Free',
        'Quarterly group farm visits organized'
      ])
    } else {
      router.replace('/projects')
    }
  }, [id, router])

  // Filter gallery items based on active tab
  useEffect(() => {
    if (activeTab === 'all') {
      setFilteredGallery(gallery)
    } else if (activeTab === 'ceremony') {
      // Simulate categorizing pictures client-side
      setFilteredGallery(gallery.filter((_, idx) => idx % 3 === 0))
    } else if (activeTab === 'site') {
      setFilteredGallery(gallery.filter((_, idx) => idx % 3 === 1))
    } else if (activeTab === 'team') {
      setFilteredGallery(gallery.filter((_, idx) => idx % 3 === 2))
    }
  }, [activeTab, gallery])

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeIdx === null) return
      if (e.key === 'Escape') setActiveIdx(null)
      if (e.key === 'ArrowRight') handleNext()
      if (e.key === 'ArrowLeft') handlePrev()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeIdx, filteredGallery])

  const handleNext = () => {
    setActiveIdx(prev => (prev !== null && prev < filteredGallery.length - 1 ? prev + 1 : 0))
  }

  const handlePrev = () => {
    setActiveIdx(prev => (prev !== null && prev > 0 ? prev - 1 : filteredGallery.length - 1))
  }

  return (
    <div className="w-full min-h-screen bg-slate-50 pt-36 pb-24 text-slate-800 font-sans select-none">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        
        {/* Back Link */}
        <Link 
          href="/projects" 
          className="inline-flex items-center gap-2 text-slate-500 hover:text-[#FC6600] transition font-semibold mb-8 group text-sm"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Projects
        </Link>

        {/* 1. Hero / Header Layout */}
        <div className="text-center max-w-4xl mx-auto mb-16 space-y-6">
          <div className="flex flex-wrap justify-center gap-2">
            {documentBadges.map((badge, idx) => (
              <span 
                key={idx}
                className="bg-orange-50 text-[#FC6600] px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider border border-orange-100/50"
              >
                {badge}
              </span>
            ))}
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight">
            {title} Gallery
          </h1>
          
          <p className="text-lg md:text-xl font-bold text-slate-500 max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>

          <div className="flex items-center justify-center gap-2 text-slate-500 font-bold text-sm">
            <Calendar className="w-4 h-4 text-[#FC6600]" />
            <span>Allocation Event • {date}</span>
          </div>
        </div>

        {/* 2. Project Pricing & Feature Dashboard Card */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            
            {/* Left Column: Pricing & Property Details */}
            <div className="p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-slate-100">
              <div className="flex items-center gap-2 mb-6">
                <div className="p-2 bg-orange-50 rounded-xl text-[#FC6600]">
                  <DollarSign className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-extrabold text-slate-900">Plot Pricing & Investment</h3>
              </div>
              <div className="space-y-4">
                {prices.map((p, idx) => (
                  <div 
                    key={idx}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-slate-50 rounded-2xl hover:bg-slate-100/50 transition border border-slate-100/60"
                  >
                    <div>
                      <span className="font-extrabold text-slate-900 text-sm sm:text-base">{p.size}</span>
                      {p.extra && <p className="text-xs text-green-600 font-bold mt-0.5">{p.extra}</p>}
                    </div>
                    <span className="font-black text-[#FC6600] text-base sm:text-lg mt-1 sm:mt-0">{p.price}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Development Status & Benefits */}
            <div className="p-8 md:p-12 bg-slate-50/30 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <div className="p-2 bg-orange-50 rounded-xl text-[#FC6600]">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-900">Estate Benefits & Infrastructure</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                      <span className="text-sm font-bold text-slate-700 leading-tight">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Event Description */}
              <div className="mt-8 pt-8 border-t border-slate-100 text-slate-600 text-sm font-medium leading-relaxed">
                {description}
              </div>
            </div>

          </div>
        </div>

        {/* 3. Nearby Landmarks Section (GoRealty Pill Style) */}
        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-lg mb-12 text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Compass className="w-5 h-5 text-[#FC6600]" />
            <h3 className="text-lg font-extrabold text-slate-900 uppercase tracking-wider">Nearby Landmarks & Neighborhood</h3>
          </div>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {landmarks.map((landmark, idx) => (
              <span 
                key={idx}
                className="inline-flex items-center gap-2 bg-slate-100 hover:bg-orange-50 text-slate-800 hover:text-[#FC6600] px-4 py-2.5 rounded-full text-xs font-extrabold transition duration-300 border border-slate-200/50 shadow-sm"
              >
                <MapPin className="w-3.5 h-3.5 text-[#FC6600]" />
                {landmark}
              </span>
            ))}
          </div>
        </div>

        {/* 4. Action CTA Button Row (GoRealty Centered Style) */}
        <div className="flex flex-wrap justify-center items-center gap-4 mb-16 max-w-3xl mx-auto">
          <Link 
            href="https://surveyheart.com/form/6a55732b49d3efd14c713a53" 
            target="_blank"
            className="px-8 py-4 bg-[#FC6600] hover:bg-orange-700 text-white font-extrabold rounded-full text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-orange-600/20 active:scale-95"
          >
            <Calendar className="w-4 h-4" /> Book A Free Inspection.
          </Link>
          <a 
            href="https://wa.me/2348110191956?text=Hi%20DealRite%20Realty,%20I%20am%20interested%20in%20booking%20an%20inspection%20and%20viewing%20plots."
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-extrabold rounded-full text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-green-600/20 active:scale-95"
          >
            <MessageSquare className="w-4 h-4" /> Chat on WhatsApp
          </a>
          <a 
            href="tel:+2348110191956"
            className="px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white font-extrabold rounded-full text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-slate-900/10 active:scale-95"
          >
            <Phone className="w-4 h-4" /> Call Allocation Officer
          </a>
        </div>

        {/* 5. Dynamic Tab Navigation Menu */}
        <div className="border-b border-slate-200 mb-8 flex justify-center">
          <div className="flex overflow-x-auto gap-4 pb-3 scrollbar-hide max-w-full">
            <button 
              onClick={() => setActiveTab('all')}
              className={`px-5 py-3 rounded-full text-xs uppercase tracking-wider font-extrabold transition-all duration-200 shrink-0 border ${
                activeTab === 'all' 
                  ? 'bg-slate-900 text-white border-slate-900' 
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              All Photos ({gallery.length})
            </button>
            <button 
              onClick={() => setActiveTab('ceremony')}
              className={`px-5 py-3 rounded-full text-xs uppercase tracking-wider font-extrabold transition-all duration-200 shrink-0 border ${
                activeTab === 'ceremony' 
                  ? 'bg-slate-900 text-white border-slate-900' 
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              Ceremony & Handover
            </button>
            <button 
              onClick={() => setActiveTab('site')}
              className={`px-5 py-3 rounded-full text-xs uppercase tracking-wider font-extrabold transition-all duration-200 shrink-0 border ${
                activeTab === 'site' 
                  ? 'bg-slate-900 text-white border-slate-900' 
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              Site & Infrastructure
            </button>
            <button 
              onClick={() => setActiveTab('team')}
              className={`px-5 py-3 rounded-full text-xs uppercase tracking-wider font-extrabold transition-all duration-200 shrink-0 border ${
                activeTab === 'team' 
                  ? 'bg-slate-900 text-white border-slate-900' 
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              Investors & Support
            </button>
          </div>
        </div>

        {/* 6. Grid Gallery View */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredGallery.map((img, idx) => (
            <div 
              key={img.id}
              onClick={() => setActiveIdx(idx)}
              className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-md group hover:shadow-xl hover:-translate-y-1 cursor-pointer transition-all duration-300 aspect-square relative"
            >
              <Image 
                src={`https://lh3.googleusercontent.com/d/${img.id}`}
                alt={img.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                priority={idx < 8}
              />
              <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="bg-white/95 backdrop-blur-sm text-slate-900 text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-xl shadow-lg border border-slate-200">
                  Expand Photo
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* 7. Image Lightbox Slider */}
        {activeIdx !== null && (
          <div 
            className="fixed inset-0 bg-slate-950/95 z-[9999] flex items-center justify-center p-4 md:p-8 backdrop-blur-md select-none"
            onClick={() => setActiveIdx(null)}
          >
            {/* Close button */}
            <button 
              onClick={() => setActiveIdx(null)}
              className="absolute top-6 right-6 text-white/70 hover:text-white hover:bg-white/10 p-3 rounded-full transition cursor-pointer"
              title="Close Gallery (Esc)"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Left navigation arrow */}
            <button 
              onClick={(e) => {
                e.stopPropagation()
                handlePrev()
              }}
              className="absolute left-4 md:left-8 text-white/70 hover:text-white hover:bg-white/10 p-3 rounded-full transition cursor-pointer"
              title="Previous Photo (Left Arrow)"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            {/* Lightbox Image Container */}
            <div 
              className="relative w-full max-w-4xl h-[70vh] md:h-[80vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <Image 
                src={`https://lh3.googleusercontent.com/d/${filteredGallery[activeIdx].id}`}
                alt={filteredGallery[activeIdx].name}
                fill
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="object-contain"
                unoptimized
              />
            </div>

            {/* Right navigation arrow */}
            <button 
              onClick={(e) => {
                e.stopPropagation()
                handleNext()
              }}
              className="absolute right-4 md:right-8 text-white/70 hover:text-white hover:bg-white/10 p-3 rounded-full transition cursor-pointer"
              title="Next Photo (Right Arrow)"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            {/* Index indicator */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full border border-white/10">
              {activeIdx + 1} / {filteredGallery.length}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
