'use client'

import { useState } from 'react'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')
    
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (res.ok) {
        setStatus('success')
        setFormData({ name: '', email: '', phone: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch (error) {
      console.error(error)
      setStatus('error')
    }
  }

  return (
    <div className="pt-24 pb-16 min-h-screen bg-slate-50 w-full">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Contact Us & Book Inspection</h1>
          <p className="text-slate-600">Get in touch with our team of expert consultants to schedule an inspection or inquire about our premium properties.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 bg-white rounded-3xl shadow-xl overflow-hidden max-w-5xl mx-auto">
          {/* Contact Info */}
          <div className="lg:w-2/5 bg-orange-600 p-10 text-white flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
              <p className="text-orange-100 mb-10 leading-relaxed">Fill up the form and our Team will get back to you within 24 hours.</p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 text-orange-200 shrink-0" />
                  <div>
                    <h4 className="font-medium text-white">Phone</h4>
                    <p className="text-orange-100 mt-1">+234 811 019 1956 or +234 902 002 3672</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 text-orange-200 shrink-0" />
                  <div>
                    <h4 className="font-medium text-white">Email</h4>
                    <p className="text-orange-100 mt-1">dealriterealtyoperations@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-orange-200 shrink-0" />
                  <div>
                    <h4 className="font-medium text-white">Head Office</h4>
                    <p className="text-orange-100 mt-1">Road 1, No 5, Alhaja Junction, Onigimejila, IITA/Ojoo, Ibadan, Oyo State, Nigeria.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Clock className="w-6 h-6 text-orange-200 shrink-0" />
                  <div>
                    <h4 className="font-medium text-white">Working Hours</h4>
                    <p className="text-orange-100 mt-1">Mon - Fri: 9:00 AM - 5:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:w-3/5 p-10">
            <h3 className="text-2xl font-semibold text-slate-900 mb-6">Send a Message</h3>
            
            {status === 'success' && (
              <div className="mb-6 bg-green-50 text-green-700 p-4 rounded-xl border border-green-200">
                Thank you! Your inspection request has been submitted successfully. We will be in touch soon.
              </div>
            )}
            
            {status === 'error' && (
              <div className="mb-6 bg-red-50 text-red-700 p-4 rounded-xl border border-red-200">
                Oops! Something went wrong. Please try again later.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-orange-600 focus:border-transparent transition"
                    placeholder="david Macauley"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-orange-600 focus:border-transparent transition"
                    placeholder="+234 800 000 0000"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-orange-600 focus:border-transparent transition"
                  placeholder="david@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">Message or Preferred Inspection Date</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-orange-600 focus:border-transparent transition"
                  placeholder="I would like to schedule an inspection for Coastal Residence..."
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="flex-1 bg-slate-900 text-white py-4 rounded-xl font-semibold hover:bg-slate-800 transition disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {status === 'submitting' ? 'Sending...' : 'Send Message'}
                </button>
                <a
                  href="https://surveyheart.com/form/69e462b8001e39939dc2b237"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center flex items-center justify-center bg-orange-600 text-white py-4 rounded-xl font-semibold hover:bg-orange-700 transition"
                >
                  Book Inspection Instead
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
