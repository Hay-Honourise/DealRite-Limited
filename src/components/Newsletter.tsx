'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, AlertCircle, Send } from 'lucide-react'

export default function Newsletter() {
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setStatus('loading')
    setMessage('')

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
        setStatus('error')
        setMessage(data.error || 'Something went wrong. Please try again.')
      } else {
        setStatus('success')
        setMessage('Thank you for subscribing!')
        setFirstName('')
        setEmail('')
      }
    } catch (error) {
      console.error('Newsletter error:', error)
      setStatus('error')
      setMessage('Failed to connect to the server. Please try again later.')
    }
  }

  return (
    <section className="py-20 bg-[#0c1d33] text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-orange-600/10 via-transparent to-transparent opacity-40"></div>
      
      <div className="container mx-auto px-4 md:px-8 relative z-10 max-w-5xl text-center">
        {/* Header */}
        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-3 tracking-tight">
          Stay Informed, Stay Ahead
        </h2>
        
        {/* Subheader (Gold/yellow accent) */}
        <h3 className="text-xl md:text-2xl font-bold text-[#c99b62] mb-6 tracking-wide">
          Subscribe for Exclusive Updates
        </h3>
        
        {/* Descriptive paragraph */}
        <p className="text-slate-300 text-base md:text-lg max-w-3xl mx-auto mb-10 leading-relaxed">
          Be the first to know about our latest land offerings, exciting company news, insightful real estate tips, and special promotions.
        </p>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row justify-center items-center gap-4 max-w-4xl mx-auto">
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            disabled={status === 'loading'}
            className="w-full md:w-64 px-5 py-4 rounded-xl text-slate-900 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 font-medium transition disabled:opacity-75"
          />
          <input
            type="email"
            required
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === 'loading'}
            className="w-full md:w-80 px-5 py-4 rounded-xl text-slate-900 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 font-medium transition disabled:opacity-75"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full md:w-auto bg-[#c99b62] hover:bg-[#b88c53] disabled:bg-[#c99b62]/60 text-slate-900 px-8 py-4 rounded-xl font-bold transition flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#c99b62]/10 disabled:cursor-not-allowed whitespace-nowrap"
          >
            {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
            <Send className="w-4.5 h-4.5" />
          </button>
        </form>

        {/* Feedback Messages */}
        <div className="h-12 mt-6 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {status === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="flex items-center gap-2 text-green-400 font-semibold"
              >
                <CheckCircle className="w-5 h-5" />
                {message}
              </motion.div>
            )}
            {status === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="flex items-center gap-2 text-red-400 font-semibold"
              >
                <AlertCircle className="w-5 h-5" />
                {message}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
