import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Mail, Phone, Globe, Send } from 'lucide-react'

const Facebook = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
)
const Twitter = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
)
const Linkedin = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
)
const Youtube = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M2.5 7.1c0 0-1.5 5.5.5 11.2C3.7 19.5 5.2 20 12 20s8.3-.5 9-1.7c2-5.7.5-11.2.5-11.2C20.8 6 19.3 5.5 12 5.5S3.2 6 2.5 7.1z"/><path d="m10 15 5-3-5-3v6z"/></svg>
)

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Info */}
          <div>
            <Link href="/" className="inline-block bg-white p-2 rounded-2xl mb-6 shadow-lg">
              <Image
                src="/logo1.png"
                alt="DealRite Realty Limited"
                width={400}
                height={1200}
                className="w-48 md:w-64 lg:w-72 h-auto object-contain"
              />
            </Link>
            <p className="text-sm text-slate-400 mb-6 leading-relaxed">
              We provide premium, secure, and modern living spaces designed for comfort and everyday living. Find your dream home or next investment with us.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-orange-600 transition-colors text-white">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-orange-600 transition-colors text-white">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-orange-600 transition-colors text-white">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-orange-600 transition-colors text-white">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-orange-600 transition-colors text-white">
                <Send className="w-4 h-4 ml-[-2px]" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/" className="hover:text-orange-500 transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-orange-500 transition-colors">About Us</Link></li>
              <li><Link href="/projects" className="hover:text-orange-500 transition-colors">Our Projects</Link></li>
              <li><Link href="/contact" className="hover:text-orange-500 transition-colors">Contact Us</Link></li>
              <li><Link href="https://surveyheart.com/form/69e462b8001e39939dc2b237" className="hover:text-orange-500 transition-colors">Book Inspection</Link></li>
            </ul>
          </div>

          {/* Projects */}
          <div>
            <h3 className="text-white font-semibold mb-6">Projects</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/projects?filter=ongoing" className="hover:text-orange-500 transition-colors">Ongoing Projects</Link></li>
              <li><Link href="/projects?filter=upcoming" className="hover:text-orange-500 transition-colors">Upcoming Projects</Link></li>
              <li><Link href="/projects?filter=completed" className="hover:text-orange-500 transition-colors">Completed Projects</Link></li>
              <li><Link href="/projects" className="hover:text-orange-500 transition-colors">DealRite Realty</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-orange-500 shrink-0" />
                <span>Road 1, No 5, Alhaja Junction, Onigimejila, IITA/Ojoo, Ibadan, Oyo State, Nigeria</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-orange-500 shrink-0" />
                <span>+234 8028998975 DEALRITE</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-orange-500 shrink-0" />
                <span>info@dealriterealty.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} DealRite Realty Limited. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
