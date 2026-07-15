'use client'

import { useState } from 'react'
import Image from 'next/image'
import { 
  Target, 
  Compass, 
  ShieldCheck, 
  Gem, 
  Sparkles, 
  CheckCircle2, 
  Lightbulb, 
  TrendingUp, 
  Users, 
  MapPin, 
  Award,
  ChevronRight
} from 'lucide-react'

// Team Member Card sub-component
function TeamMemberCard({ 
  name, 
  role, 
  image
}: { 
  name: string
  role: string
  image: string
}) {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300 group hover:-translate-y-1">
      <div className="aspect-square w-full rounded-2xl overflow-hidden relative mb-6 bg-slate-50 border border-slate-100 shadow-inner">
        <Image 
          src={image} 
          alt={name} 
          fill 
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <h3 className="font-extrabold text-slate-900 text-lg mb-1 leading-tight tracking-tight">{name}</h3>
      <p className="text-[#FC6600] text-sm font-semibold tracking-wide uppercase">{role}</p>
    </div>
  )
}

export default function AboutPage() {
  const stats = [
    { value: '100+', label: 'Clients' },
    { value: '500+', label: 'Sales Partners' },
    { value: '3', label: 'Projects' },
    { value: '2', label: 'Locations' }
  ]

  const values = [
    {
      title: 'Trust',
      desc: 'We earn confidence through honesty, transparency, and keeping our word.',
      icon: ShieldCheck
    },
    {
      title: 'Value',
      desc: "Every opportunity we offer is selected with our clients' long-term success in mind.",
      icon: Gem
    },
    {
      title: 'Excellence',
      desc: 'We are committed to delivering exceptional service and maintaining high standards in everything we do.',
      icon: Sparkles
    },
    {
      title: 'Integrity',
      desc: 'We do what is right, even when no one is watching.',
      icon: CheckCircle2
    },
    {
      title: 'Innovation',
      desc: 'We embrace fresh ideas and modern solutions to create better investment experiences.',
      icon: Lightbulb
    },
    {
      title: 'Growth',
      desc: 'We believe real estate should help people build wealth, create opportunities, and secure a better future.',
      icon: TrendingUp
    }
  ]

  const team = [
    {
      name: 'Adegoke Faith (GokeProperties)',
      role: 'Director of Operations',
      image: '/Goke.jpeg',
      fallback: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?fit=crop&w=400&h=400&q=80'
    },
    {
      name: 'Hammed Mustapha',
      role: 'Director of Partnerships, Brands & Influence',
      image: '/hammed.jpeg',
      fallback: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=400&h=400&q=80'
    },
    {
      name: 'Oyebade Tosin (Investor Tee)',
      role: 'Director of Strategy, Growth & Investment',
      image: '/oyebade.jpeg',
      fallback: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?fit=crop&w=400&h=400&q=80'
    },
    {
      name: 'Favour Adeniyi',
      role: 'Head of Administration',
      image: '/favour.jpeg',
      fallback: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?fit=crop&w=400&h=400&q=80'
    },
    {
      name: 'Fatoye Ifeoluwa',
      role: 'Human Resources Manager',
      image: '/fatoye.jpeg',
      fallback: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?fit=crop&w=400&h=400&q=80'
    },
    {
      name: 'Julius Emmanuel Adeniyi',
      role: 'Social Media Manager',
      image: '/julius.jpeg',
      fallback: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?fit=crop&w=400&h=400&q=80'
    },
    {
      name: 'BOLARINWA MUHAMMED OLAMIDE',
      role: 'PROJECT MANAGER',
      image: '/bolarinwa.jpeg',
      fallback: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?fit=crop&w=400&h=400&q=80'
    },
    {
      name: 'David Precious Imebong',
      role: 'Customer Relations Officer',
      image: '/precious.jpeg',
      fallback: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?fit=crop&w=400&h=400&q=80'
    },
    {
      name: 'Oreoluwa Rotimi Kolawole',
      role: 'Client Education Lead',
      image: '/oreoluwa.jpeg',
      fallback: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=400&h=400&q=80'
    },
    {
      name: 'Esther Tolulope Akindele',
      role: 'Admin Department',
      image: '/esther.jpeg',
      fallback: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?fit=crop&w=400&h=400&q=80'
    },
    {
      name: 'Thomas Erioluwa Abraham',
      role: 'Allocation Officer',
      image: '/thomas.jpeg',
      fallback: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?fit=crop&w=400&h=400&q=80'
    }
  ]

  return (
    <div className="w-full min-h-screen bg-white">
      {/* Hero Header Section */}
      <section className="relative pt-36 pb-24 bg-[#0c1d33] text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-orange-600/15 via-transparent to-transparent opacity-60"></div>
        <div className="relative z-10 container mx-auto px-4 md:px-8 max-w-5xl text-center">
          <span className="text-[#FFBF00] font-extrabold text-sm tracking-widest uppercase block mb-3">
            Who We Are
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight leading-tight">
            ABOUT DEALRITE
          </h1>
          <div className="h-1.5 w-24 bg-[#FC6600] mx-auto rounded-full"></div>
        </div>
      </section>

      {/* Story & Image Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Origin Story Text */}
            <div className="lg:col-span-7 space-y-6 text-slate-600 leading-relaxed text-base md:text-lg">
              <p className="font-semibold text-[#000000] text-lg md:text-xl border-l-4 border-[#FC6600] pl-4">
                Founded on September 8, 2025, DealRite was established with a simple but powerful goal: to help people make smarter real estate decisions and build lasting wealth through opportunities they can trust.
              </p>
              <p>
                Based in Ibadan, Oyo State Nigeria, we specialize in land sales, land banking, agro-real estate investments, and strategic property opportunities in high-growth locations. Beyond transactions, we are committed to educating and guiding our clients, helping them understand the value of real estate and make informed investment decisions with confidence.
              </p>
              <p>
                At DealRite, we understand that buying property is more than acquiring land—it is securing a future, preserving wealth, and creating opportunities for generations to come. That is why we focus on delivering real value through carefully selected investment opportunities backed by professional guidance and a commitment to excellence.
              </p>
              <p>
                What sets us apart is our approach. While we are a young and innovative company, our leadership team brings valuable industry experience and a deep understanding of the real estate market. We combine fresh thinking with proven expertise to identify opportunities that create meaningful returns for our clients.
              </p>
              <p className="text-slate-800 font-medium">
                We are passionate about doing real estate the right way—built on trust, transparency, integrity, and results. The confidence our clients place in us and the positive experiences they share continue to drive our growth and reinforce our commitment to excellence and to this end is why we often say <span className="text-[#FC6600] font-bold">REAL ESTATE = REAL VALUE</span> and we are focused on delivering that all the time.
              </p>
            </div>

            {/* Right Column: Custom Property Image */}
            <div className="lg:col-span-5 relative h-[450px] md:h-[550px] w-full rounded-3xl overflow-hidden shadow-2xl border border-slate-100 bg-slate-50">
              <Image 
                src="/groupa.png"
                alt="DealRite Group Photo"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
                priority
              />
            </div>

          </div>

          {/* Stats Bar */}
          <div className="mt-20 bg-slate-50 rounded-3xl border border-slate-100 p-8 shadow-sm">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-200">
              {stats.map((stat, idx) => (
                <div key={idx} className={`pt-6 md:pt-0 ${idx === 0 ? '' : 'pt-6 md:pt-0'}`}>
                  <span className="block text-4xl md:text-5xl font-black text-[#FC6600] mb-2">
                    {stat.value}
                  </span>
                  <span className="block text-xs md:text-sm font-extrabold uppercase tracking-widest text-slate-800">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Mission & Vision statements */}
      <section className="py-20 bg-slate-50 border-t border-b border-slate-100">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            
            {/* Mission card */}
            <div className="bg-white p-8 md:p-10 rounded-3xl shadow-lg border border-slate-100 relative group overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#FC6600]/5 rounded-bl-full transition-all duration-300 group-hover:scale-110"></div>
              <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center text-[#FC6600] mb-6">
                <Target className="w-7 h-7" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Our Mission</h2>
              <p className="text-slate-600 leading-relaxed font-medium">
                We help young people and aspiring investors build wealth and secure their future through trusted real estate opportunities and professional guidance.
              </p>
            </div>

            {/* Vision card */}
            <div className="bg-white p-8 md:p-10 rounded-3xl shadow-lg border border-slate-100 relative group overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#F9A602]/5 rounded-bl-full transition-all duration-300 group-hover:scale-110"></div>
              <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center text-[#F9A602] mb-6">
                <Compass className="w-7 h-7" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Our Vision</h2>
              <p className="text-slate-600 leading-relaxed font-medium">
                To be the most trusted real estate company empowering a generation to build lasting wealth through smart property investments.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <span className="text-[#FC6600] font-extrabold text-sm tracking-widest uppercase block mb-3">
              Core Principles
            </span>
            <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">
              OUR CORE VALUES
            </h2>
            <div className="h-1 w-16 bg-[#F9A602] mx-auto rounded-full mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((val, idx) => (
              <div key={idx} className="bg-white rounded-3xl p-8 border border-slate-100 shadow-md flex gap-5 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-[#FC6600] shrink-0">
                  <val.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{val.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{val.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team / Leadership section */}
      <section className="py-24 bg-slate-50 border-t border-slate-100">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <span className="text-[#FC6600] font-extrabold text-sm tracking-widest uppercase block mb-3">
              Leadership
            </span>
            <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">
              The Hearts Behind Your Dreams
            </h2>
            <div className="h-1 w-16 bg-[#F9A602] mx-auto rounded-full mt-4"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {team.map((member, idx) => (
              <TeamMemberCard 
                key={idx}
                name={member.name}
                role={member.role}
                image={member.image}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
