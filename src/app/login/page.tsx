'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Lock, Mail, Eye, EyeOff, Loader2, AlertCircle, Building2 } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Authentication failed. Please verify credentials.')
      }

      setSuccess(data.message || 'Verification successful! Access granted.')
      
      // Redirect to the Admin Console
      setTimeout(() => {
        router.push('/admin/blog/new')
        router.refresh()
      }, 1000)
    } catch (err: any) {
      setError(err.message || 'An error occurred during authentication.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen bg-slate-950 flex flex-col justify-center items-center px-4 overflow-hidden select-none">
      
      {/* Visual background glows */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-orange-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-orange-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Main card box container */}
      <div className="w-full max-w-md bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-8 md:p-10 shadow-2xl relative z-10 space-y-8">
        
        {/* Branding header logo */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-tr from-orange-600 to-amber-500 rounded-2xl shadow-lg shadow-orange-600/20">
            <Building2 className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">DealRite Realty</h1>
            <p className="text-slate-400 text-xs mt-1.5 uppercase tracking-widest font-semibold">Admin Authentication</p>
          </div>
        </div>

        {/* Form panel */}
        <form onSubmit={handleLogin} className="space-y-5">
          {/* Success / Error notification blocks */}
          {error && (
            <div className="bg-red-950/40 border border-red-800/60 text-red-200 text-xs font-semibold p-3.5 rounded-xl flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="bg-green-950/40 border border-green-800/60 text-green-200 text-xs font-semibold p-3.5 rounded-xl flex items-start gap-2.5">
              <CheckCircleIcon className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
              <span>{success}</span>
            </div>
          )}

          {/* Email input field */}
          <div className="space-y-2">
            <label htmlFor="email" className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Email Address</label>
            <div className="relative">
              <span className="absolute left-4 top-3.5 text-slate-500">
                <Mail className="w-4.5 h-4.5" />
              </span>
              <input
                type="email"
                id="email"
                required
                placeholder="admin@dealriterealty.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 bg-slate-950 border border-slate-800/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white text-sm font-medium transition duration-200 placeholder-slate-600"
              />
            </div>
          </div>

          {/* Password input field */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label htmlFor="password" className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Password</label>
            </div>
            <div className="relative">
              <span className="absolute left-4 top-3.5 text-slate-500">
                <Lock className="w-4.5 h-4.5" />
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-11 py-3.5 bg-slate-950 border border-slate-800/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white text-sm font-medium transition duration-200 placeholder-slate-600"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3.5 text-slate-500 hover:text-slate-300 transition cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
              </button>
            </div>
          </div>

          {/* Submit button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-orange-600 to-amber-500 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-orange-600/10 hover:shadow-orange-600/20 hover:brightness-105 active:scale-[0.99] transition duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4.5 h-4.5 animate-spin" /> Verifying Credentials...
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" /> Authenticate Account
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      <footer className="mt-8 text-center relative z-10">
        <p className="text-slate-600 text-xs font-semibold">
          © {new Date().getFullYear()} DealRite Realty Limited. Secure Access Core.
        </p>
      </footer>
    </div>
  )
}

// Simple Helper Icon component inline to keep file compile-safe
function CheckCircleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <path d="m9 11 3 3L22 4" />
    </svg>
  )
}
