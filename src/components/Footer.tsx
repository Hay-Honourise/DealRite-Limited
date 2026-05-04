import Link from 'next/link'
import { Building, MapPin, Mail, Phone, Globe } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Info */}
          <div>
            <Link href="/" className="flex items-center gap-2 text-xl font-bold text-white mb-6">
              <Building className="w-8 h-8 text-white" />
              <span>DealRite Realty</span>
            </Link>
            <p className="text-sm text-slate-400 mb-6 leading-relaxed">
              We provide premium, secure, and modern living spaces designed for comfort and everyday living. Find your dream home or next investment with us.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-orange-600 transition-colors text-white font-bold text-sm">
                X
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-orange-600 transition-colors text-white font-bold text-sm">
                f
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-orange-600 transition-colors text-white font-bold text-sm">
                In
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
              <li><Link href="/contact" className="hover:text-orange-500 transition-colors">Book Inspection</Link></li>
            </ul>
          </div>

          {/* Projects */}
          <div>
            <h3 className="text-white font-semibold mb-6">Projects</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/projects?filter=ongoing" className="hover:text-orange-500 transition-colors">Ongoing Projects</Link></li>
              <li><Link href="/projects?filter=upcoming" className="hover:text-orange-500 transition-colors">Upcoming Projects</Link></li>
              <li><Link href="/projects?filter=completed" className="hover:text-orange-500 transition-colors">Completed Projects</Link></li>
              <li><Link href="/projects" className="hover:text-orange-500 transition-colors">Dariann Court</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-orange-500 shrink-0" />
                <span>Olive Park Estate, Opposite LandWey Office, after Lagos Business School, Lagos.</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-orange-500 shrink-0" />
                <span>+234 800 DEALRITE</span>
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
