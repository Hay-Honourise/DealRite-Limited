'use client'

import { useState } from 'react'
import { X, User } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
)

interface Contact {
  role: string
  name: string
  phone: string
  message: string
}

const contacts: Contact[] = [
  {
    role: 'Sales Department',
    name: 'Sales Rep',
    phone: '2348028998975',
    message: 'Hello, I am interested in purchasing a property and would like to speak with Sales.'
  },
  {
    role: 'Property Manager',
    name: 'Management',
    phone: '2348028998975',
    message: 'Hello, I have an inquiry regarding property management.'
  },
  {
    role: 'Technical Support',
    name: 'Support Team',
    phone: '2348028998975',
    message: 'Hello, I need technical support.'
  }
]

export default function MultiWhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false)

  const handleWhatsAppClick = (contact: Contact) => {
    const url = `https://wa.me/${contact.phone}?text=${encodeURIComponent(contact.message)}`
    window.open(url, '_blank')
  }

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mb-4 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden w-80 sm:w-96"
          >
            <div className="bg-[#25D366] p-5 flex justify-between items-center text-white">
              <div>
                <h3 className="font-bold text-lg">Chat with us</h3>
                <p className="text-sm opacity-90">Usually replies in a few minutes</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/20 rounded-full transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-2 max-h-[400px] overflow-y-auto">
              {contacts.map((contact, index) => (
                <button
                  key={index}
                  onClick={() => handleWhatsAppClick(contact)}
                  className="w-full flex items-center gap-4 p-3 hover:bg-slate-50 transition-colors rounded-xl text-left group border-b border-slate-50 last:border-0"
                >
                  <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center shrink-0 text-slate-400 group-hover:bg-[#25D366]/10 group-hover:text-[#25D366] transition-colors">
                    <User className="w-6 h-6" />
                  </div>
                  <div className="flex-grow">
                    <p className="font-semibold text-slate-900">{contact.role}</p>
                    <p className="text-sm text-slate-500">{contact.name}</p>
                  </div>
                  <WhatsAppIcon className="w-8 h-8 text-[#25D366]" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative bg-[#25D366] hover:bg-[#20bd5a] text-white w-16 h-16 rounded-full flex items-center justify-center shadow-xl shadow-[#25D366]/50 transition-transform hover:scale-110 active:scale-95"
        aria-label="Open WhatsApp Menu"
      >
        {!isOpen && (
          <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-40"></span>
        )}
        <span className="relative z-10 flex items-center justify-center">
          {isOpen ? <X className="w-8 h-8" /> : <WhatsAppIcon className="w-10 h-10" />}
        </span>
      </button>
    </div>
  )
}
