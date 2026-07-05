'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, HelpCircle, TreePine, Waves, Download, CreditCard, AlertCircle } from 'lucide-react'
import Image from 'next/image'

type FAQType = {
  question: string
  answer: React.ReactNode
}

const coastalFAQs: FAQType[] = [
  { question: "Who is the developer of Coastal Residence?", answer: "The Project is developed by DealRite Realty Limited: also developer of OwnFarm Estate." },
  { question: "Where is Coastal Residence located?", answer: "Moniya, Ibadan, Oyo State - precisely at Ajobo, Moniya." },
  { question: "Are there any encumbrances on the land?", answer: "No. The land is free from government acquisition and any adverse claim." },
  { question: "What type of Title does DEALRITE REALTY LIMITED have on the land?", answer: "Coastal Residence comes with a Registered Survey." },
  { question: "Is the road to the Property motorable?", answer: "Yes, Coastal Residence is accessible via Moniya Road, a motorable and developed route." },
  { question: "What are the Landmarks & Neighborhood?", answer: "Moniya Train Station, IITA Ibadan, Ojoo Bus Terminal, New Ibadan Inland Dry Port (Akinyele LGA)." },
  { question: "What are the plot sizes available at Coastal Residence?", answer: "250SQM | 500SQM | 1000SQM | 1500SQM | 3000SQM" },
  { question: "How much is Coastal Residence selling for?", answer: "250SQM - N750,000\n500SQM - N1,500,000\n1000SQM - N3,000,000\n1500SQM - N4,500,000\n3000SQM - N9,000,000" },
  { question: "What is the initial Deposit?", answer: "N200,000 for 250SQM\nN500,000 for 500SQM\nN1,000,000 for 1500SQM\nN2,000,000 for 3000SQM" },
  { question: "What are the payment structures?", answer: "Outright payment - 0-6 months (Interest Free)" },
  { question: "What documents would I get after the initial Deposit?", answer: "• Payment Receipt\n• Acknowledgement Letter\n• Contract of Sale of Land" },
  { question: "What is the transaction flow?", answer: "The transaction process flow at Coastal Residence:\n• Client goes on inspection or appoints a representative to go\n• Payment for Land\n• Client fills the subscription form and signs.\n• Execution of the terms and conditions for subscription\n• Collect Payment Acknowledgement Letter\n• Collect Contract of Sale of Land\n• The client signs the Contract of Sale and return a copy to the office\n• Physical Allocation of plot(s) and issuance of allocation letter\n• Collect Deed of Assignment\n• Collect Registered Survey." },
  { question: "How do I get survey plan for my plots?", answer: "Your subscription to Coastal Residence comes with a Registered Survey. You will get your Survey at the point of allocation." },
  { question: "When will my plot(s) be physically allocated to me and take posession of my plot(s)?", answer: "After 100% completion of payment for your land, you take possession immediately." },
  { question: "Is there any extra charges, like developmental fee?", answer: "No developmental fee required. Your payment covers all charges." },
  { question: "What do I get at the point of allocation of my land?", answer: "Letter of Allocation, Free Deed of Agreement and Registerd Survey." },
  { question: "Can I start building after the physical allocation of my plots(s)?", answer: "Yes, you can but all building approval documents required must be obtained before building can commence." },
  { question: "Can I pay cash to your agents?", answer: "No, all payment must be made to our Bank accounts." },
  { question: "If I make payment, can I request a refund if I’m no longer interested?", answer: "Yes, you can request a refund; however, please note that refund will be 40% less than the entire amount paid at the point of refund. Which serves as administrative charges and will be paid within 90 days of approval of the refund or upon resale of the said plot(s)." },
  { question: "Will I be affected by price increase after paying initial deposit?", answer: "No, the subscriber will not be affected by price increase after making initial deposit." },
  { question: "Important Notice / Disclaimer", answer: "NOTE:\nUpon subscription, you are required to fill your personal contact details (Phone number and email) on your subscription form to enable us to give necessary information with respect to your property as against going through your representative.\n\nThe Company will not be liable for information not received by your result of breach of clause above.\n\nThe only part recognised by the company in receiving instructions and execution of documents as regards the property is the Client and in the event where the client intends to delegate that responsibility to a third party, a written instruction either in a letter form or an official email has to be sent to the Company's official email address before such third party can be recognised." }
]

const ownFarmPhase2FAQs: FAQType[] = [
  { question: "Who's the developer of Own Farm Estate (Phase 2)?", answer: "The developer of Own Farm Estate (Phase 2) is DealRiteRealty Limited; a Real Estate company fully registered by the Corporate Affairs Commission (CAC NO: 8734383) and licensed by Special Control Unit Against Money Laundering (SCUML RN: SC 311803025)" },
  { question: "What exactly is Own Farm Estate (Phase 2) offering?", answer: "This project is a unique blend of Real Estate and agriculture. This implies that it combines land ownership with agricultural income.\n\nOwn Farm Estate (Phase 2) offers investors the opportunity to own agricultural real estate with a focus on cassava, tomatoes, maize and palm farming. You acquire the land (in various sizes from 500sqm to multiple hectares) which we professionally manage for cultivation, generating returns through harvest yields." },
  { question: "Where is the project located?", answer: "Own Farm Estate (Phase 2) is strategically located in Fiditi, Ibadan—Oyo Road, Oyo State." },
  { question: "What type of Title does the Land have?", answer: "OwnFarm Estate (Phase 2) comes with a Registered Survey and a Deed of Assignment." },
  { question: "Are there any encumbrances on the land?", answer: "The land is totally free from government acquisition, adverse claim or any form of encumbrance." },
  { question: "Is the road to the Property motorable?", answer: "Yes, Road to the Property is Motorable." },
  { question: "What are the Landmarks & Neighborhood?", answer: "• Kola Daisi University\n• Fiditi Grammar School\n• Micheal Koleosho GRA\n• Bethel American College\n• Deeper Life High School\n• Grey West Mineral Processing Center\n• Hope College Of Health Technology" },
  { question: "What are the payment structures?", answer: "0–6 Months Payment Plan. NO interest! NO pressure!" },
  {
    question: "Plot sizes & Prices",
    answer: (
      <div className="overflow-x-auto mt-2">
        <table className="w-full text-left border-collapse border border-green-200 shadow-sm rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-green-50 text-green-900">
              <th className="border border-green-100 p-3 font-semibold text-sm">Plot sizes available</th>
              <th className="border border-green-100 p-3 font-semibold text-sm">Price</th>
              <th className="border border-green-100 p-3 font-semibold text-sm">Payment Plan (0-6 Months)</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-slate-50"><td className="border border-green-100 p-3 text-sm">1 Plot (500sqm)</td><td className="border border-green-100 p-3 text-sm font-medium">₦800,000</td><td className="border border-green-100 p-3 text-sm font-medium text-green-600">Interest-Free</td></tr>
            <tr className="hover:bg-slate-50"><td className="border border-green-100 p-3 text-sm">2 Plots (1000sqm)</td><td className="border border-green-100 p-3 text-sm font-medium">₦1,600,000</td><td className="border border-green-100 p-3 text-sm font-medium text-green-600">Interest-Free</td></tr>
            <tr className="hover:bg-slate-50"><td className="border border-green-100 p-3 text-sm">Half Acre (3 Plots / 1500sqm)</td><td className="border border-green-100 p-3 text-sm font-medium">₦2,400,000</td><td className="border border-green-100 p-3 text-sm font-medium text-green-600">Interest-Free</td></tr>
            <tr className="hover:bg-slate-50"><td className="border border-green-100 p-3 text-sm">1 Acre (6 Plots / 3000sqm)</td><td className="border border-green-100 p-3 text-sm font-medium">₦4,800,000</td><td className="border border-green-100 p-3 text-sm font-medium text-green-600">Interest-Free</td></tr>
          </tbody>
        </table>
      </div>
    )
  },
  { question: "What is the transaction flow?", answer: "The transaction process flow at Own Farm Estate (Phase 2) are as follows:\n• Client goes on inspection or appoints a representative to go or request virtual inspection or get videos/photos of the Estate\n• Client make payment for the Land\n• Client fills the Subscription form and signs.\n• Client collect Payment Acknowledgement Letter/Receipt\n• Client collect Contract of Sale of Land\n• The client signs the Contract of Sale and return a copy\n• Physical Allocation of plot(s) and issuance of Allocation letter\n• Collect Deed of Assignment\n• Collect Registered Survey\n• Collect Memorandum of Understanding" },
  { question: "What documents would I get after the initial Deposit?", answer: "• Welcome on Board/Acknowledgement Letter\n• Payment Receipt\n• Contract Of Sale Of Land\n\nAll shall be sent via your email Address." },
  { question: "What documents would I get after final payment for my land?", answer: "• Registered Survey\n• Deed of Assignment\n• Contract of Sales\n• Original Payment Receipt\n• Memorandum of understanding (MOU)\n\nAll of this shall be for free.\nMOU will be issued only after paying the cost for farming." },
  { question: "How do I get a survey plan for my plot(s)?", answer: "Your Subscription to OwnFarm Estate (Phase 2) comes with a FREE Registered Survey. You will get yours at the point of allocation." },
  { question: "When will my plot(s) be allocated to me and take possession of my plot(s)?", answer: "After 100% completion of payment for your land, and you take possession immediately." },
  { question: "If I make payment, can I request a refund if I'm no longer interested?", answer: "Yes, you can request a refund; however, please note that refund will be 40% less than the entire amount paid at the point of refund. This serves as administrative charges and will be paid within 90 days of approval of the refund or upon resale of the said plot(s)." },
  { question: "Can I pay cash to your agents/realtors?", answer: "No, all payment must be made to our Bank Accounts." },
  { question: "Will I be affected by Price Increase/Sold Out after paying initial Deposit?", answer: "No, subscribers shall not be affected by Price Increase or Sold out after making an initial deposit. You automatically have a fixed allocation after your initial deposit." },
  { question: "Do I need farming experience to invest?", answer: "No farming experience is needed to invest in Own Farm. We have a team of professional agriculturist handling all aspects." },
  { question: "When can I claim my return on investment?", answer: "After 12 months." },
  { question: "Do I get incentive for investing here?", answer: "Yes, you get 1 Plot free if you buy 1 Hectare." },
  { question: "What does the cost of farming cover?", answer: "• Soil Analysis\n• Input procurement\n• Land preparation: clearing, ploughing, harrowing, ridging, ETC\n• Planting\n• Pest control\n• Supervision/Security\n• Harvesting" },
  { question: "How can I get started with farming?", answer: "The moment you pay 100% for your land payment and 50% for your farming cost." },
  { question: "Can I buy the land and not farm there?", answer: "Yes, subscribers are not mandated to farm. You can also take landbanking. That's, you buy, keep and wait till it appreciates more and then sell or use for other purpose." },
  { question: "Can I extend my investment overtime?", answer: "Yes, subscribers are permitted to start with smaller plot(s) and expand their portfolio when they desire (but it will be at selling price by then peradventure the estate is yet to be sold out)." },
  { question: "Will my land also appreciate besides my farming return?", answer: "Yes, landed properties are known for appreciation overtime. But, land in strategic location and in an estate appreciate faster and with more massive assured return on investment (ROI). Own Farm Estate (Phase 2) has been strategically positioned for this goal as well. The location was selected not only for agricultural productivity but also for long-term development potential." },
  { question: "Can I visit my farm?", answer: "Yes, we encourage that our investors visit their farms. We organize quarterly group farm visits for all investors, and you can schedule additional private visits with advance notice." },
  {
    question: "FINANCIAL QUESTIONS FOR CASSAVA",
    answer: (
      <div className="overflow-x-auto mt-2">
        <p className="font-semibold text-orange-600 mb-3 text-lg">What is the cost for farming on each plot sizes & ROI</p>
        <table className="w-full text-left border-collapse border border-orange-200 shadow-sm rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-orange-50 text-slate-800">
              <th className="border border-orange-100 p-3 font-semibold text-sm">Plot sizes available</th>
              <th className="border border-orange-100 p-3 font-semibold text-sm">Farming Cost</th>
              <th className="border border-orange-100 p-3 font-semibold text-sm">ROI</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-slate-50"><td className="border border-orange-100 p-3 text-sm">500sqm</td><td className="border border-orange-100 p-3 text-sm font-medium">N50,000</td><td className="border border-orange-100 p-3 text-sm font-medium text-green-600">N75k — N85k</td></tr>
            <tr className="hover:bg-slate-50"><td className="border border-orange-100 p-3 text-sm">1000sqm</td><td className="border border-orange-100 p-3 text-sm font-medium">N100,000</td><td className="border border-orange-100 p-3 text-sm font-medium text-green-600">N150k - N170k</td></tr>
            <tr className="hover:bg-slate-50"><td className="border border-orange-100 p-3 text-sm">1500sqm</td><td className="border border-orange-100 p-3 text-sm font-medium">N150,000</td><td className="border border-orange-100 p-3 text-sm font-medium text-green-600">N225k - N255k</td></tr>
            <tr className="hover:bg-slate-50"><td className="border border-orange-100 p-3 text-sm">One Acre (3000sqm)</td><td className="border border-orange-100 p-3 text-sm font-medium">N300,000</td><td className="border border-orange-100 p-3 text-sm font-medium text-green-600">N450k — N900k</td></tr>
            <tr className="hover:bg-slate-50"><td className="border border-orange-100 p-3 text-sm">1 Hectare (7,500sqm)</td><td className="border border-orange-100 p-3 text-sm font-medium">N750,000</td><td className="border border-orange-100 p-3 text-sm font-medium text-green-600">N1.125m — N1.275m</td></tr>
          </tbody>
        </table>
      </div>
    )
  },
  {
    question: "FINANCIAL QUESTIONS FOR YAM",
    answer: (
      <div className="overflow-x-auto mt-2">
        <p className="font-semibold text-orange-600 mb-3 text-lg">What is the cost for farming on each plot sizes & ROI</p>
        <table className="w-full text-left border-collapse border border-orange-200 shadow-sm rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-orange-50 text-slate-800">
              <th className="border border-orange-100 p-3 font-semibold text-sm">Plot sizes available</th>
              <th className="border border-orange-100 p-3 font-semibold text-sm">Farming Cost</th>
              <th className="border border-orange-100 p-3 font-semibold text-sm">ROI</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-slate-50"><td className="border border-orange-100 p-3 text-sm">500sqm</td><td className="border border-orange-100 p-3 text-sm font-medium">N100,000</td><td className="border border-orange-100 p-3 text-sm font-medium text-green-600">N150k — N170k</td></tr>
            <tr className="hover:bg-slate-50"><td className="border border-orange-100 p-3 text-sm">1000sqm</td><td className="border border-orange-100 p-3 text-sm font-medium">N200,000</td><td className="border border-orange-100 p-3 text-sm font-medium text-green-600">N300k - N340k</td></tr>
            <tr className="hover:bg-slate-50"><td className="border border-orange-100 p-3 text-sm">1500sqm</td><td className="border border-orange-100 p-3 text-sm font-medium">N300,000</td><td className="border border-orange-100 p-3 text-sm font-medium text-green-600">N450k - N510k</td></tr>
            <tr className="hover:bg-slate-50"><td className="border border-orange-100 p-3 text-sm">One Acre (3000sqm)</td><td className="border border-orange-100 p-3 text-sm font-medium">N500,000</td><td className="border border-orange-100 p-3 text-sm font-medium text-green-600">N750k — N850k</td></tr>
            <tr className="hover:bg-slate-50"><td className="border border-orange-100 p-3 text-sm">1 Hectare (7,500sqm)</td><td className="border border-orange-100 p-3 text-sm font-medium">N1,500,000</td><td className="border border-orange-100 p-3 text-sm font-medium text-green-600">N2.25m - N2.55m</td></tr>
          </tbody>
        </table>
      </div>
    )
  }
]

const ownFarmPhase1FAQs: FAQType[] = [
  { question: "Who's the developer of Own Farm Estate (Phase 1)?", answer: "The developer of Own Farm Estate is DealRiteRealty Limited; a Real Estate company fully registered by the Corporate Affairs Commission (CAC NO: 8734383) and licensed by Special Control Unit Against Money Laundering (SCUML RN: SC 311803025)" },
  { question: "What exactly is Own Farm Estate (Phase 1) offering?", answer: "This project is a unique blend of Real Estate and agriculture. This implies that it combines land ownership with agricultural income.\n\nOwn Farm Estate (Phase 1) offers investors the opportunity to own agricultural real estate with a focus on cassava, tomatoes, maize and palm farming. You acquire the land (in various sizes from 500sqm to multiple hectares) which we professionally manage for cultivation, generating returns through harvest yields." },
  { question: "Where is the project located?", answer: "Own Farm Estate (Phase 1) is strategically located in Fiditi, Oyo Town, Oyo State." },
  { question: "What type of Title does the Land have?", answer: "The Land has a REGISTERED SURVEY (Provisional Survey)." },
  { question: "Are there any encumbrances on the land?", answer: "The land is totally free from government acquisition, adverse claim or any form of encumbrance." },
  { question: "Is the road to the Property motorable?", answer: "Yes, Road to the Property is Motorable." },
  { question: "What are the Landmarks & Neighborhood?", answer: "• Kola Daisi University\n• Micheal Koleosho GRA\n• Bethel America College\n• Gray West Mineral Processing Center\n• Deeper Life High School\n• New Hope College of Health Technology" },
  { question: "What are the payment structures for instalment?", answer: "• 0—3 months (for 500sqm and 1000sqm)\n• 0—6 months (for Half Acre, 1 Acre, 1 Hectare)\n\nInterest Free For All Instalment Package" },
  {
    question: "Plot sizes, Prices & Initial Deposit (Phase 1)",
    answer: (
      <div className="overflow-x-auto mt-2">
        <table className="w-full text-left border-collapse border border-green-200 shadow-sm rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-green-50 text-green-900">
              <th className="border border-green-100 p-3 font-semibold text-sm">Plot sizes available</th>
              <th className="border border-green-100 p-3 font-semibold text-sm">Price</th>
              <th className="border border-green-100 p-3 font-semibold text-sm">Initial Deposit</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-slate-50"><td className="border border-green-100 p-3 text-sm">1 Plot (500sqm)</td><td className="border border-green-100 p-3 text-sm font-medium">N500,000</td><td className="border border-green-100 p-3 text-sm font-medium">N200,000</td></tr>
            <tr className="hover:bg-slate-50"><td className="border border-green-100 p-3 text-sm">3 Plots (1500sqm)</td><td className="border border-green-100 p-3 text-sm font-medium">N1,500,000</td><td className="border border-green-100 p-3 text-sm font-medium">N500,000</td></tr>
            <tr className="hover:bg-slate-50"><td className="border border-green-100 p-3 text-sm">6 Plots (3000sqm)</td><td className="border border-green-100 p-3 text-sm font-medium">N3,000,000</td><td className="border border-green-100 p-3 text-sm font-medium">N1,000,000</td></tr>
            <tr className="hover:bg-slate-50"><td className="border border-green-100 p-3 text-sm">15 Plots (7,500sqm)</td><td className="border border-green-100 p-3 text-sm font-medium">N7,500,000</td><td className="border border-green-100 p-3 text-sm font-medium">N2,000,000</td></tr>
          </tbody>
        </table>
      </div>
    )
  },
  { question: "What is the transaction flow?", answer: "The transaction process flow at Own Farm Estate are as follows:\n• Client goes on inspection or appoints a representative to go or request virtual inspection or get videos/photos of the Estate\n• Client make payment for the Land\n• Client fills the Subscription form and signs.\n• Client collect Payment Acknowledgement Letter/Receipt\n• Client collect Contract of Sale of Land\n• The client signs the Contract of Sale and return a copy\n• Physical Allocation of plot(s) and issuance of Allocation letter\n• Collect Deed of Assignment\n• Collect Provisional Survey\n• Collect Memorandum of Understanding" },
  { question: "What documents would I get after the initial Deposit?", answer: "• Welcome on Board/Acknowledgement Letter\n• Payment Receipt\n• Contract Of Sale Of Land\n\nAll shall be sent via your email Address." },
  { question: "What documents would I get after final payment for my land?", answer: "• Provisional Survey\n• Deed of Assignment\n• Contract of Sales\n• Original Payment Receipt\n• Memorandum of understanding (MOU)\n\nAll of this shall be for free.\nMOU will be issued only after paying the cost for farming." },
  { question: "How do I get a survey plan for my plot(s)?", answer: "Your Subscription to OwnFarm Estate comes with a FREE Provisional Survey. You will get yours at the point of allocation." },
  { question: "When will my plot(s) be allocated to me and take possession of my plot(s)?", answer: "After 100% completion of payment for your land, and you take possession immediately." },
  { question: "If I make payment, can I request a refund if I'm no longer interested?", answer: "Yes, you can request a refund; however, please note that refund will be 40% less than the entire amount paid at the point of refund. This serves as administrative charges and will be paid within 90 days of approval of the refund or upon resale of the said plot(s)." },
  { question: "Can I pay cash to your agents/realtors?", answer: "No, all payment must be made to our Bank Accounts." },
  { question: "Will I be affected by Price Increase/Sold Out after paying initial Deposit?", answer: "No, subscribers shall not be affected by Price Increase or Sold out after making an initial deposit. You automatically have a fixed allocation after your initial deposit." },
  { question: "Do I need farming experience to invest?", answer: "No farming experience is needed to invest in Own Farm. We have a team of professional agriculturist handling all aspects." },
  { question: "When can I claim my return on investment?", answer: "After 12 months." },
  { question: "Do I get incentive for investing here?", answer: "Yes, you get 1 Plot free if you buy 1 Hectare." },
  { question: "What does the cost of farming cover?", answer: "• Soil Analysis\n• Input procurement\n• Land preparation: clearing, ploughing, harrowing, ridging, ETC\n• Planting\n• Pest control\n• Supervision/Security\n• Harvesting" },
  { question: "How can I get started with farming?", answer: "The moment you pay 100% for your land payment and 50% for your farming cost." },
  { question: "Can I buy the land and not farm there?", answer: "Yes, subscribers are not mandated to farm. You can also take landbanking. That's, you buy, keep and wait till it appreciates more and then sell or use for other purpose." },
  { question: "Can I extend my investment overtime?", answer: "Yes, subscribers are permitted to start with smaller plot(s) and expand their portfolio when they desire (but it will be at selling price by then peradventure the estate is yet to be sold out)." },
  { question: "Will my land also appreciate besides my farming return?", answer: "Yes, landed properties are known for appreciation overtime. But, land in strategic location and in an estate appreciate faster and with more massive assured return on investment (ROI). Own Farm Estate has been strategically positioned for this goal as well. The location was selected not only for agricultural productivity but also for long-term development potential." },
  { question: "Can I visit my farm?", answer: "Yes, we encourage that our investors visit their farms. We organize quarterly group farm visits for all investors, and you can schedule additional private visits with advance notice." }
]

const FAQItem = ({ question, answer }: { question: string, answer: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 flex items-center justify-between bg-white text-left focus:outline-none"
      >
        <span className="font-semibold text-slate-900 pr-4">{question}</span>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${isOpen ? 'bg-orange-100 text-orange-600' : 'bg-slate-100 text-slate-500'}`}>
          <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-6 pb-6 pt-2 text-slate-600 leading-relaxed border-t border-slate-50 whitespace-pre-wrap">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQsPage() {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const id = window.location.hash.substring(1)
      const element = document.getElementById(id)
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 200)
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-24">
      {/* Header Section */}
      <div className="container mx-auto px-4 md:px-8 text-center mb-20">
        <div className="inline-flex items-center justify-center p-3 bg-orange-100 rounded-2xl mb-6">
          <HelpCircle className="w-8 h-8 text-orange-600" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">Frequently Asked Questions</h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Find answers to common questions about our ongoing projects. If you need more specific details, feel free to contact our support team.
        </p>
      </div>

      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main FAQ Content */}
          <div className="lg:col-span-2 space-y-24">
            {/* Coastal Residence Section */}
            <div id="coastal" className="relative scroll-mt-28">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center shrink-0 shadow-sm">
                  <Waves className="w-6 h-6" />
                </div>
                <div className="flex-grow">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h2 className="text-3xl font-bold text-slate-900">Coastal Residence</h2>
                    <span className="bg-orange-600 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-sm">
                      Currently Selling
                    </span>
                  </div>
                  <p className="text-slate-500 mt-1">Everything you need to know about our premium housing development.</p>
                </div>
              </div>
              
              <div className="mb-8 rounded-2xl overflow-hidden shadow-md border border-slate-100 max-w-xl mx-auto">
                <Image 
                  src="/coastal_prelaunch.jpg" 
                  alt="Coastal Residence Estate" 
                  width={1000} 
                  height={500} 
                  className="w-full h-48 md:h-56 object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              
              <div className="space-y-4">
                {coastalFAQs.map((faq, idx) => (
                  <FAQItem key={idx} question={faq.question} answer={faq.answer} />
                ))}
              </div>
              
              <div className="mt-8 flex justify-center md:justify-start">
                <a 
                  href="https://drive.google.com/drive/u/0/folders/1CiZjZv3SBc2xVbf18KrxJusl4M4XCKns?ths=true" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition shadow-md hover:shadow-lg"
                >
                  <Download className="w-5 h-5" />
                  Read & Download PDF
                </a>
              </div>
            </div>

            {/* DealRite OwnFarm Section */}
            <div id="ownfarm" className="relative scroll-mt-28">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center shrink-0 shadow-sm">
                  <TreePine className="w-6 h-6" />
                </div>
                <div className="flex-grow">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h2 className="text-3xl font-bold text-slate-900">DealRite OwnFarm (Phase 2)</h2>
                    <span className="bg-green-600 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-sm">
                      Currently Selling
                    </span>
                  </div>
                  <p className="text-slate-500 mt-1">Learn how to invest and earn through our agricultural real estate Phase 2 initiative.</p>
                </div>
              </div>

              <div className="mb-8 rounded-2xl overflow-hidden shadow-md border border-slate-100 max-w-xl mx-auto">
                <Image 
                  src="/ownfarm_phase2.jpg" 
                  alt="DealRite OwnFarm (Phase 2)" 
                  width={1000} 
                  height={500} 
                  className="w-full h-48 md:h-56 object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              
              <div className="space-y-4">
                {ownFarmPhase2FAQs.map((faq, idx) => (
                  <FAQItem key={idx} question={faq.question} answer={faq.answer} />
                ))}
              </div>
              
              <div className="mt-8 flex justify-center md:justify-start">
                <a 
                  href="https://drive.google.com/drive/u/0/folders/1CiZjZv3SBc2xVbf18KrxJusl4M4XCKns?ths=true" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-green-700 transition shadow-md hover:shadow-lg"
                >
                  <Download className="w-5 h-5" />
                  Read & Download PDF
                </a>
              </div>
            </div>

            {/* DealRite OwnFarm Phase 1 Section */}
            <div id="ownfarm-phase1" className="relative scroll-mt-28 border-t border-slate-200 pt-16">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-slate-100 text-slate-600 rounded-xl flex items-center justify-center shrink-0 shadow-sm">
                  <TreePine className="w-6 h-6" />
                </div>
                <div className="flex-grow">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h2 className="text-3xl font-bold text-slate-900">DealRite OwnFarm (Phase 1)</h2>
                    <span className="bg-slate-500 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-sm">
                      Sold Out
                    </span>
                  </div>
                  <p className="text-slate-500 mt-1">Reference information for our completed Phase 1 agricultural initiative.</p>
                </div>
              </div>

              <div className="mb-8 rounded-2xl overflow-hidden shadow-md border border-slate-100 max-w-xl mx-auto filter grayscale">
                <Image 
                  src="/ownfarm_soldout.jpg" 
                  alt="DealRite OwnFarm (Phase 1) - Sold Out" 
                  width={1000} 
                  height={500} 
                  className="w-full h-48 md:h-56 object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              
              <div className="space-y-4">
                {ownFarmPhase1FAQs.map((faq, idx) => (
                  <FAQItem key={idx} question={faq.question} answer={faq.answer} />
                ))}
              </div>
            </div>
          </div>
          
          {/* Right Side Sticky Payment Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 bg-slate-900 text-white rounded-3xl p-6 shadow-2xl">
              <div className="w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-orange-600/30">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Approved Payment Account</h3>
              <p className="text-slate-300 mb-6 text-xs leading-relaxed">
                All payments for DealRite Realty Limited properties must be made securely to our official bank account below.
              </p>
              
              <div className="bg-slate-800 rounded-2xl p-5 border border-slate-700 shadow-inner">
                <div className="mb-3">
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-0.5">Bank Name</p>
                  <p className="font-semibold text-base text-white">Providus Bank</p>
                </div>
                <div className="mb-3">
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-0.5">Account Name</p>
                  <p className="font-semibold text-base text-orange-400">DealRite Realty Limited</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-0.5">Account Number</p>
                  <p className="text-2xl font-mono font-bold tracking-widest text-white mt-1">1308243537</p>
                </div>
              </div>
              
              <div className="mt-5 flex items-start gap-2 bg-orange-600/10 p-3 rounded-xl border border-orange-600/20 mb-5">
                <AlertCircle className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                <p className="text-[11px] text-orange-200 leading-relaxed">
                  Please do not pay cash to any agent or realtor. We only recognize payments made directly to this official account.
                </p>
              </div>
              
              <a 
                href="https://form.svhrt.com/68becf6cee5a85ed44cfa0b4" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-orange-600 text-white px-5 py-3 rounded-xl font-bold text-sm hover:bg-orange-700 transition shadow-lg shadow-orange-600/20 text-center"
              >
                Fill Subscription Form
              </a>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}
