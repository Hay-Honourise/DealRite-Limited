'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, ShieldCheck, Zap, Heart, Home, MapPin, Search, Play, X, Star, Send, CheckCircle, AlertCircle } from 'lucide-react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'



export default function HomePage() {
  const [isVideoOpen, setIsVideoOpen] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [subscribeStatus, setSubscribeStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [subscribeMessage, setSubscribeMessage] = useState('')

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setSubscribeStatus('loading')
    setSubscribeMessage('')

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName, email }),
      })

      const data = await response.json()

      if (!response.ok) {
        setSubscribeStatus('error')
        setSubscribeMessage(data.error || 'Something went wrong. Please try again.')
      } else {
        setSubscribeStatus('success')
        setSubscribeMessage('Thank you for subscribing!')
        setFirstName('')
        setEmail('')
      }
    } catch (error) {
      console.error('Newsletter error:', error)
      setSubscribeStatus('error')
      setSubscribeMessage('Failed to connect to the server. Please try again later.')
    }
  }

  const reviews = [
    {
      stars: 5,
      quote: "Owning land felt like a distant dream, especially since my parents didn't have that opportunity. Thanks to DealRite Realty, I'm now a proud landowner at a young age. I look forward to expanding my portfolio with them!",
      author: "Stephanie"
    },
    {
      stars: 5,
      quote: "I picked up my mum's land documents and was impressed by DealRite Realty's amazing customer service. They deliver exactly what they promise, and documents are ready within the agreed timeframe.",
      author: "Omotoyosi"
    },
    {
      stars: 5,
      quote: "I'm so glad I partnered with DealRite Realty for my first land purchase. I couldn't believe how fast and flexible the payment plan was!",
      author: "Olamidotun Bakare"
    },
    {
      stars: 5,
      quote: "I was allocated my land today and now have verified physical evidence of my ownership. Anyone who hasn't invested with DealRite Realty is missing out!",
      author: "Aaron Samuel"
    }
  ]

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
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight leading-tight">
            The Path to Finding a <span className="text-orange-500">Luxurious</span> Lifestyle
          </h1>
          <p className="text-lg md:text-2xl text-slate-200 mb-10 max-w-2xl mx-auto font-medium">
            ... Your Right Investment Deal
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/projects" 
              className="w-full sm:w-auto bg-orange-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-orange-700 transition flex items-center justify-center gap-2 shadow-lg shadow-orange-600/30"
            >
              Explore Our Projects <ArrowRight className="w-5 h-5" />
            </Link>
            
            <button 
              onClick={() => setIsVideoOpen(true)}
              className="w-full sm:w-auto bg-slate-900/60 backdrop-blur-md text-white border border-slate-700 px-8 py-4 rounded-full font-semibold hover:bg-slate-800 transition flex items-center justify-center gap-2 cursor-pointer"
            >
              Watch Our Allocation <Play className="w-5 h-5 fill-orange-500 text-orange-500" />
            </button>
            
            <Link 
              href="https://surveyheart.com/form/6a55732b49d3efd14c713a53" 
              target="_blank"
              className="w-full sm:w-auto bg-white text-slate-900 px-8 py-4 rounded-full font-semibold hover:bg-slate-100 transition flex items-center justify-center gap-2 shadow-md"
            >
              Book A Free Inspection.
            </Link>
          </div>
        </div>

        {/* Scroll Down Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 cursor-pointer group">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-300 select-none group-hover:text-white transition duration-300">
            Our Projects
          </span>
          <button 
            onClick={() => {
              const element = document.getElementById('projects')
              element?.scrollIntoView({ behavior: 'smooth' })
            }}
            aria-label="Scroll to Projects"
            className="relative w-12 h-12 flex items-center justify-center"
          >
            {/* Blinking/pulsing outer ring */}
            <span className="absolute inset-0 rounded-full border border-orange-500/40 animate-ping opacity-75"></span>
            {/* Pulsing inner ring */}
            <span className="absolute inset-2 rounded-full border border-orange-400/60 animate-pulse"></span>
            {/* Solid inner circle with arrow */}
            <span className="relative w-8 h-8 rounded-full bg-slate-900/80 border border-slate-700/50 flex items-center justify-center group-hover:bg-orange-600 group-hover:border-orange-500 transition duration-300 shadow-lg">
              <span className="text-orange-500 font-extrabold group-hover:text-white transition duration-300">
                ↓
              </span>
            </span>
          </button>
        </div>
      </section>

      {/* Video Modal */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          >
            <motion.div 
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="relative w-full max-w-4xl bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-850"
            >
              <button 
                onClick={() => setIsVideoOpen(false)}
                className="absolute top-4 right-4 bg-black/50 hover:bg-black/80 text-white p-2.5 rounded-full transition z-10 focus:outline-none"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="aspect-video w-full">
                <video 
                  controls 
                  autoPlay 
                  className="w-full h-full object-contain"
                >
                  <source src="/DealRite-homepage-video.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Featured Ongoing Projects */}
      <section id="projects" className="py-24 bg-slate-50 scroll-mt-20">
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
                  src="/ownfarm_phase2.jpg"
                  alt="DealRite OwnFarm (Phase 2)"
                  width={800}
                  height={1000}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-orange-600 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-md">
                  Phase 2 - Currently Selling
                </div>
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-3xl font-bold text-slate-900 mb-4">DealRite OwnFarm (Phase 2)</h3>
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
                  <Link href="https://surveyheart.com/form/6a55732b49d3efd14c713a53" target="_blank" className="flex-1 text-center bg-slate-900 text-white px-4 py-3 rounded-xl font-medium hover:bg-slate-800 transition whitespace-nowrap">
                    Book A Free Inspection.
                  </Link>
                  <Link href="/faqs#ownfarm" className="flex-1 text-center bg-orange-100 text-orange-600 px-4 py-3 rounded-xl font-medium hover:bg-orange-200 transition">
                    FAQs
                  </Link>
                </div>
              </div>
            </div>

            {/* Coastal Residence */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-xl group flex flex-col">
              <div className="relative w-full overflow-hidden shrink-0 bg-white border-b border-slate-100">
                <Image 
                  src="/coastal_prelaunch.jpg"
                  alt="Coastal Residence"
                  width={800}
                  height={1000}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-orange-600 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-md">
                  Pre-Launch - Currently Selling
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
                  <Link href="https://surveyheart.com/form/6a55732b49d3efd14c713a53" target="_blank" className="flex-1 text-center bg-slate-900 text-white px-4 py-3 rounded-xl font-medium hover:bg-slate-800 transition whitespace-nowrap">
                    Book A Free Inspection.
                  </Link>
                  <Link href="/faqs#coastal" className="flex-1 text-center bg-orange-100 text-orange-600 px-4 py-3 rounded-xl font-medium hover:bg-orange-200 transition">
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
              <h3 className="text-xl font-bold text-slate-900 mb-3">Verified & Secure Land</h3>
              <p className="text-slate-600 leading-relaxed">Every estate is carefully selected with verified documentation and strategic location value.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600 mb-6 transform rotate-6 hover:rotate-0 transition duration-300">
                <Zap className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Hassle-Free Process</h3>
              <p className="text-slate-600 leading-relaxed">From inquiry to allocation, we provide a seamless, transparent experience. No hidden fees. No complications.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600 mb-6 transform -rotate-3 hover:rotate-0 transition duration-300">
                <Heart className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Passionate Support Team</h3>
              <p className="text-slate-600 leading-relaxed">Our team is committed to helping you invest wisely and confidently.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Client Testimonials Section */}
      <section className="py-24 bg-orange-50/50 border-t border-b border-orange-100/30 overflow-hidden">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">Our Clients Review</h2>
            <p className="text-lg font-semibold text-orange-600">Unlock the Potential of Real Estate Investment</p>
          </div>

          <div className="relative w-full overflow-hidden py-4">
            {/* Edge fade gradients */}
            <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-orange-50/10 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-orange-50/10 to-transparent z-10 pointer-events-none"></div>

            <div className="flex w-max gap-6 animate-marquee items-center py-4 hover:[animation-play-state:paused]">
              {/* First Set of reviews */}
              {[...Array(10)].map((_, index) => {
                const num = index + 1;
                return (
                  <div 
                    key={`review-1-${num}`} 
                    className="relative h-[380px] w-[260px] shrink-0 rounded-3xl overflow-hidden border border-slate-100 bg-white hover:scale-[1.03] transition duration-300 shadow-xl shadow-orange-950/5"
                  >
                    <Image 
                      src={`/Allocation   ${num}.png`}
                      alt={`Client Review Allocation ${num}`}
                      fill
                      sizes="260px"
                      className="object-contain p-2"
                    />
                  </div>
                )
              })}

              {/* Second Set of reviews for continuous looping */}
              {[...Array(10)].map((_, index) => {
                const num = index + 1;
                return (
                  <div 
                    key={`review-2-${num}`} 
                    className="relative h-[380px] w-[260px] shrink-0 rounded-3xl overflow-hidden border border-slate-100 bg-white hover:scale-[1.03] transition duration-300 shadow-xl shadow-orange-950/5"
                  >
                    <Image 
                      src={`/Allocation   ${num}.png`}
                      alt={`Client Review Allocation ${num}`}
                      fill
                      sizes="260px"
                      className="object-contain p-2"
                    />
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA & Newsletter Combined Section */}
      <section className="py-24 bg-[#0c1d33] text-white relative overflow-hidden border-t border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-orange-600/10 via-transparent to-transparent opacity-40"></div>
        <div className="relative z-10 container mx-auto px-4 md:px-8 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left: CTA "Ready to find your next home?" */}
            <div className="text-left space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
                Ready to find your next home?
              </h2>
              <p className="text-slate-300 text-lg leading-relaxed">
                Get in touch with our expert consultants today and schedule an inspection. Discover premium living and high-return investments.
              </p>
              <Link 
                href="/contact" 
                className="inline-flex items-center gap-2 bg-orange-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-orange-700 transition transform hover:scale-105 shadow-xl shadow-orange-600/30"
              >
                Contact Us Now <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            {/* Right: Newsletter Form Card */}
            <div className="bg-[#0b1b30]/80 backdrop-blur-md rounded-3xl p-8 md:p-10 border border-slate-800 shadow-2xl relative">
              <span className="text-orange-500 font-bold text-xs uppercase tracking-widest block mb-2">
                Newsletter
              </span>
              <h3 className="text-2xl font-bold text-white mb-2">
                Stay Informed, Stay Ahead
              </h3>
              <h4 className="text-sm font-semibold text-[#FFBF00] mb-4">
                Subscribe for Exclusive Updates
              </h4>
              <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                Be the first to know about our latest land offerings, exciting company news, insightful real estate tips, and special promotions.
              </p>

              <form onSubmit={handleSubscribe} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    disabled={subscribeStatus === 'loading'}
                    className="w-full px-4 py-3 rounded-xl text-slate-900 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 font-medium text-sm transition disabled:opacity-75"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={subscribeStatus === 'loading'}
                    className="w-full px-4 py-3 rounded-xl text-slate-900 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 font-medium text-sm transition disabled:opacity-75"
                  />
                </div>
                <button
                  type="submit"
                  disabled={subscribeStatus === 'loading'}
                  className="w-full bg-[#F9A602] hover:bg-[#FC6600] disabled:bg-[#F9A602]/60 text-slate-900 py-3.5 rounded-xl font-bold transition flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#F9A602]/10 disabled:cursor-not-allowed text-sm"
                >
                  {subscribeStatus === 'loading' ? 'Subscribing...' : 'Subscribe'}
                  <Send className="w-4 h-4" />
                </button>
              </form>

              {/* Feedback messages */}
              <div className="mt-4 min-h-[24px]">
                <AnimatePresence mode="wait">
                  {subscribeStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="flex items-center gap-2 text-green-400 font-medium text-sm"
                    >
                      <CheckCircle className="w-4 h-4" />
                      {subscribeMessage}
                    </motion.div>
                  )}
                  {subscribeStatus === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="flex items-center gap-2 text-red-400 font-medium text-sm"
                    >
                      <AlertCircle className="w-4 h-4" />
                      {subscribeMessage}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}
