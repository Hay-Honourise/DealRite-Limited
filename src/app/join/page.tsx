'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, User, Mail, Phone, Briefcase, ChevronRight, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function JoinPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'Consultant',
    experience: '',
    message: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API request
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  return (
    <div className="pt-32 pb-24 min-h-screen bg-slate-50 flex items-center justify-center w-full">
      <div className="container mx-auto px-4 md:px-8 max-w-5xl">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-orange-600 transition mb-8 font-medium">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          {/* Info Side */}
          <div className="lg:col-span-5 bg-slate-900 text-white p-8 md:p-12 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-orange-600/20 via-transparent to-transparent"></div>
            
            <div className="relative z-10">
              <span className="text-orange-500 font-semibold text-sm tracking-wider uppercase">Careers & Partnerships</span>
              <h1 className="text-3xl md:text-4xl font-extrabold mt-3 mb-6 leading-tight">
                Join DealRite Realty Limited
              </h1>
              <p className="text-slate-300 mb-8 leading-relaxed">
                Become a part of Nigeria's fastest-growing premium real estate network. Empower your career, build wealth, and help clients find their dream homes.
              </p>
              
              <div className="space-y-6">
                {[
                  { title: "Attractive Commission", desc: "Earn market-leading commissions on every successful property deal." },
                  { title: "Professional Training", desc: "Gain access to masterclasses, marketing materials, and digital tools." },
                  { title: "Premium Properties", desc: "Sell high-demand residential and agricultural estate plots with genuine titles." }
                ].map((benefit, idx) => (
                  <div key={idx} className="flex gap-4">
                    <CheckCircle2 className="w-6 h-6 text-orange-500 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-white text-base">{benefit.title}</h4>
                      <p className="text-sm text-slate-400 mt-1">{benefit.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative z-10 mt-12 pt-8 border-t border-slate-800 text-xs text-slate-500">
              &copy; {new Date().getFullYear()} DealRite Realty Limited. All rights reserved.
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-7 p-8 md:p-12 flex flex-col justify-center">
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">Partner With Us</h2>
                  <p className="text-slate-600 mb-8">Fill out the form below, and our onboarding team will get in touch with you shortly.</p>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Name */}
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
                        <div className="relative">
                          <User className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                          <input
                            type="text"
                            required
                            placeholder="John Doe"
                            className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          />
                        </div>
                      </div>
                      
                      {/* Email */}
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                          <input
                            type="email"
                            required
                            placeholder="john@example.com"
                            className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Phone */}
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Phone Number</label>
                        <div className="relative">
                          <Phone className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                          <input
                            type="tel"
                            required
                            placeholder="+234 80 1234 5678"
                            className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          />
                        </div>
                      </div>

                      {/* Role */}
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Desired Role</label>
                        <div className="relative">
                          <Briefcase className="absolute left-4 top-3.5 w-5 h-5 text-slate-400 pointer-events-none" />
                          <select
                            className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition appearance-none bg-white"
                            value={formData.role}
                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                          >
                            <option>Consultant</option>
                            <option>Independent Agent</option>
                            <option>Real Estate Broker</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Short Bio / Pitch</label>
                      <textarea
                        rows={4}
                        placeholder="Tell us briefly about your experience or why you'd like to join us..."
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      ></textarea>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-orange-600 text-white py-4 rounded-xl font-semibold hover:bg-orange-700 transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-orange-600/20"
                    >
                      {isSubmitting ? 'Submitting Application...' : 'Submit Application'}
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="w-20 h-20 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-12 h-12" />
                  </div>
                  <h2 className="text-3xl font-extrabold text-slate-900 mb-3">Application Received!</h2>
                  <p className="text-slate-600 mb-8 max-w-md mx-auto">
                    Thank you for your interest in joining DealRite Realty Limited, <strong className="text-slate-900">{formData.name}</strong>. Our onboarding consultant will contact you via email ({formData.email}) or phone ({formData.phone}) within the next 24-48 business hours.
                  </p>
                  <Link href="/" className="inline-block bg-slate-900 text-white px-8 py-3.5 rounded-full font-semibold hover:bg-slate-800 transition">
                    Return to Homepage
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}
