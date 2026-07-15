'use client'

import React, { useState } from 'react'
import { MapPin, Phone, Mail, Clock, Check, ChevronDown, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'

const PROJECTS = [
  'OwnFarm Phase 1',
  'OwnFarm Phase 2',
  'Coastal Residence',
  'Just making inquiries (no specific project yet)'
]

const REFERRAL_SOURCES = [
  'Facebook',
  'Instagram',
  'Twitter / X',
  'Tiktok',
  'Referral',
  'Billboard / Flyer',
  'Google / Web Search',
  'Other'
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    whatsapp: '',
    referredBy: '',
    message: ''
  })
  
  const [selectedProjects, setSelectedProjects] = useState<string[]>([])
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [validationError, setValidationError] = useState<string | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleProjectToggle = (project: string) => {
    setSelectedProjects(prev => 
      prev.includes(project)
        ? prev.filter(p => p !== project)
        : [...prev, project]
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setValidationError(null)
    setStatus('idle')

    // Form validation checks
    if (selectedProjects.length === 0) {
      setValidationError('Please select at least one project you are interested in.')
      return
    }

    if (!formData.referredBy) {
      setValidationError('Please select how you heard about us.')
      return
    }

    setStatus('submitting')

    // Package all extra metadata fields into the DB message column
    const formattedMessage = `
WhatsApp: ${formData.whatsapp}
Interested Projects: ${selectedProjects.join(', ')}
How they heard: ${formData.referredBy}

Additional Details:
${formData.message || 'None provided.'}
`.trim()

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formattedMessage
        })
      })

      if (res.ok) {
        setStatus('success')
        setFormData({
          name: '',
          email: '',
          phone: '',
          whatsapp: '',
          referredBy: '',
          message: ''
        })
        setSelectedProjects([])
      } else {
        setStatus('error')
      }
    } catch (error) {
      console.error('Error submitting contact form:', error)
      setStatus('error')
    }
  }

  return (
    <div className="pt-32 pb-24 min-h-screen bg-slate-50 w-full">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        
        {/* Main Columns Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Column Left: Contact Info */}
          <div className="lg:col-span-5 bg-orange-600 rounded-3xl p-10 text-white shadow-xl h-full flex flex-col justify-between">
            <div className="space-y-10">
              <div>
                <h2 className="text-3xl font-extrabold tracking-tight">Contact Information</h2>
                <p className="text-orange-100 mt-3 leading-relaxed text-sm">
                  Reach out to schedule a physical site inspection or clear up any investment inquiries. Our consultants typically respond within 24 hours.
                </p>
              </div>
              
              <div className="space-y-8">
                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-orange-700 rounded-2xl">
                    <Phone className="w-5 h-5 text-orange-200" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">Phone Contacts</h4>
                    <p className="text-orange-100 mt-1 text-sm font-medium">+234 811 019 1956</p>
                    <p className="text-orange-100 text-sm font-medium">+234 902 002 3672</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-orange-700 rounded-2xl">
                    <Mail className="w-5 h-5 text-orange-200" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">Email Address</h4>
                    <p className="text-orange-100 mt-1 text-sm font-medium">dealriterealtyoperations@gmail.com</p>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-orange-700 rounded-2xl">
                    <MapPin className="w-5 h-5 text-orange-200" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">Corporate Office</h4>
                    <p className="text-orange-100 mt-1 text-sm leading-relaxed font-medium">
                      Road 1, No 5, Alhaja Junction, Onigimejila, IITA/Ojoo, Ibadan, Oyo State, Nigeria.
                    </p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-orange-700 rounded-2xl">
                    <Clock className="w-5 h-5 text-orange-200" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">Business Hours</h4>
                    <p className="text-orange-100 mt-1 text-sm font-medium">Monday - Friday: 9:00 AM - 5:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Column Right: Styled Form Card */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 md:p-10 border border-slate-100 shadow-xl space-y-6">
            
            {/* Header info */}
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">Send us a message</h1>
              <p className="text-slate-500 mt-1 text-sm">Tell us a bit about you and what you&apos;re interested in.</p>
            </div>

            {/* Response Alerts */}
            {status === 'success' && (
              <div className="bg-green-50 border border-green-200 text-green-800 rounded-2xl p-4 flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">Message Sent Successfully</p>
                  <p className="text-sm mt-0.5">Thank you! We&apos;ve received your mail. A consultant will contact you shortly.</p>
                </div>
              </div>
            )}

            {status === 'error' && (
              <div className="bg-red-50 border border-red-200 text-red-800 rounded-2xl p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">Submission Failed</p>
                  <p className="text-sm mt-0.5">Oops! Something went wrong while submitting. Please check connections and try again.</p>
                </div>
              </div>
            )}

            {validationError && (
              <div className="bg-amber-50 border border-amber-200 text-amber-900 rounded-2xl p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">Validation Error</p>
                  <p className="text-sm mt-0.5">{validationError}</p>
                </div>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Inputs Group */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full name */}
                <div>
                  <label htmlFor="name" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Full name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition text-sm font-semibold text-slate-900"
                  />
                </div>

                {/* Email address */}
                <div>
                  <label htmlFor="email" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="e.g. name@domain.com"
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition text-sm font-semibold text-slate-900"
                  />
                </div>

                {/* Phone number */}
                <div>
                  <label htmlFor="phone" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Phone number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="e.g. 0803..."
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition text-sm font-semibold text-slate-900"
                  />
                </div>

                {/* WhatsApp number */}
                <div>
                  <label htmlFor="whatsapp" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">WhatsApp number *</label>
                  <input
                    type="tel"
                    id="whatsapp"
                    name="whatsapp"
                    required
                    value={formData.whatsapp}
                    onChange={handleInputChange}
                    placeholder="Active WhatsApp line"
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition text-sm font-semibold text-slate-900"
                  />
                </div>
              </div>

              {/* Checkbox Section: Projects */}
              <div className="space-y-3">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Which project(s) are you interested in? *</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {PROJECTS.map(project => {
                    const isChecked = selectedProjects.includes(project)
                    return (
                      <button
                        key={project}
                        type="button"
                        onClick={() => handleProjectToggle(project)}
                        className={`flex items-center gap-3 p-3.5 rounded-xl border text-left transition select-none cursor-pointer ${
                          isChecked 
                            ? 'border-orange-500 bg-orange-50/20 text-orange-950 shadow-sm' 
                            : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 transition ${
                          isChecked ? 'bg-orange-600 text-white' : 'border border-slate-300 bg-white'
                        }`}>
                          {isChecked && <Check className="w-3.5 h-3.5 stroke-[3px]" />}
                        </div>
                        <span className="text-xs font-bold tracking-tight">{project}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Dropdown Section: Referral */}
              <div className="space-y-2">
                <label htmlFor="referredBy" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">How did you hear about us? *</label>
                <div className="relative">
                  <select
                    id="referredBy"
                    name="referredBy"
                    required
                    value={formData.referredBy}
                    onChange={handleInputChange}
                    className="w-full pl-4 pr-10 py-3.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition text-xs font-bold text-slate-700 appearance-none cursor-pointer"
                  >
                    <option value="" disabled>Select how you heard about us</option>
                    {REFERRAL_SOURCES.map(source => (
                      <option key={source} value={source}>{source}</option>
                    ))}
                  </select>
                  <span className="absolute right-4 top-4.5 text-slate-400 pointer-events-none">
                    <ChevronDown className="w-4 h-4" />
                  </span>
                </div>
              </div>

              {/* Message Textarea */}
              <div className="space-y-2">
                <label htmlFor="message" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Is there anything else you&apos;d like us to know? (optional)</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Any extra details that will help us serve you better..."
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition text-sm font-medium leading-relaxed text-slate-900"
                />
              </div>

              {/* Actions Grid */}
              <div className="pt-2 flex flex-col sm:flex-row gap-4">
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="flex-1 bg-slate-950 hover:bg-slate-900 text-white font-bold py-4 rounded-xl shadow-lg transition duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-xs uppercase tracking-wider font-extrabold"
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Sending Message...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </button>
                <a
                  href="https://surveyheart.com/form/6a55732b49d3efd14c713a53"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center flex items-center justify-center bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 rounded-xl shadow-lg transition duration-200 text-xs uppercase tracking-wider font-extrabold"
                >
                  Book A Free Inspection.
                </a>
              </div>

            </form>

          </div>

        </div>

      </div>
    </div>
  )
}
