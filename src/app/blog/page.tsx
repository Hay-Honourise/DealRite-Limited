import prisma from '@/lib/db'
import BlogGrid from './BlogGrid'

export const revalidate = 3600

const INITIAL_MOCK_POSTS = [
  {
    title: 'Understanding Land Titles in Nigeria: C of O vs. Governor’s Consent',
    slug: 'understanding-land-titles-in-nigeria-c-of-o-vs-governors-consent',
    excerpt: 'Before purchasing land in Nigeria, you must understand the legal documentation. Here is a breakdown of the differences between Certificate of Occupancy and Governor’s Consent.',
    category: 'Documentation',
    coverImage: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    content: `<h2>Introduction to Land Titles</h2><p>Before purchasing land in Nigeria, you must understand the legal documentation. Real estate transactions require absolute security, and understanding titles is your first defense against ownership disputes.</p><h2>1. Certificate of Occupancy (C of O)</h2><p>The Certificate of Occupancy is arguably the most vital document. It is officially issued by the State Government to certify that the owner has been granted a statutory right of occupancy for a leasehold period of 99 years. A C of O is issued only once for any parcel of land.</p><h2>2. Governor’s Consent</h2><p>When a property that already holds a C of O is sold to a new buyer, the transfer of ownership must be approved by the state. This legal approval is called the <strong>Governor’s Consent</strong>. Without it, the new buyer cannot legally register the property under their name or use it as collateral for banking operations.</p><h2>Summary Comparison</h2><ul><li><strong>C of O:</strong> Issued directly by the government to the first person to register/lease the land.</li><li><strong>Governor’s Consent:</strong> Granted to subsequent buyers of the same land to validate the transfer of ownership.</li></ul><p>Always perform a land search at the Ministry of Lands before signing contracts and making payments.</p>`,
    published: true,
  },
  {
    title: 'Why Agricultural Real Estate is the Smartest Passive Income in 2026',
    slug: 'why-agricultural-real-estate-is-the-smartest-passive-income-in-2026',
    excerpt: 'Agricultural real estate is fast becoming the go-to for secure long-term investments. Learn how platforms like DealRite OwnFarm are helping investors earn solid annual ROIs.',
    category: 'Investment',
    coverImage: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    content: `<h2>Passive Wealth through Agriculture</h2><p>With inflation on the rise, investors are seeking tangible assets that generate cash flow. This is where Agro-Real Estate (agricultural real estate) comes in.</p><h2>Why Invest in Farms?</h2><p>Unlike residential buildings that require tenants and active building maintenance, farmland grows food that is constantly in demand. Food supply is a permanent global necessity. By investing in agricultural real estate, you benefit from dual returns:</p><ul><li><strong>Farmland Appreciation:</strong> The land value itself appreciates as urban boundaries expand.</li><li><strong>Harvest Returns:</strong> Annual cash flow generated from crop harvests and professional cultivation management.</li></ul><h2>The DealRite OwnFarm Model</h2><p>DealRite OwnFarm Phase 2 solves the bottleneck of active farming by handling soil testing, inputs procurement, land clearing, planting, pest control, harvesting, and distribution. Investors buy plots and earn a passive return on investment after harvest cycles.</p>`,
    published: true,
  },
  {
    title: '5 Crucial Things to Look Out for During a Real Estate Physical Inspection',
    slug: '5-crucial-things-to-look-out-for-during-a-real-estate-physical-inspection',
    excerpt: 'Never buy property blindly. When attending inspections, there are critical elements from layout to topography and access roads you must inspect. Read our checklists.',
    category: 'Buying Tips',
    coverImage: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    content: `<h2>Never Purchase Blindly</h2><p>A physical inspection is the single most critical step when purchasing properties or land. Photographs can be highly selective; inspecting the physical site gives you the ground truth.</p><h2>Inspection Checklist</h2><p>When attending a physical site inspection, make sure to verify these 5 crucial elements:</p><ol><li><strong>Topography and Land State:</strong> Is the land swampy, dry, or sloped? Swampy land requires deep piling and sand-filling, which increases construction costs significantly.</li><li><strong>Road Accessibility:</strong> Are the access roads motorable in both dry and rainy seasons?</li><li><strong>Landmarks and Neighbourhood:</strong> Check the proximity to major institutions, schools, railways, or industrial dry ports that stimulate appreciation.</li><li><strong>Soil Texture:</strong> Sandy or clay soils influence building foundations and agricultural yield capability.</li><li><strong>Genuineness of Survey Pegs:</strong> Verify physical concrete survey pegs match the coordinates registered on the survey plan diagram.</li></ol>`,
    published: true,
  },
  {
    title: 'Moniya and Fiditi: The New Investment Hotspots of Oyo State',
    slug: 'moniya-and-fiditi-the-new-investment-hotspots-of-oyo-state',
    excerpt: 'With infrastructure projects like the Lagos-Ibadan rail line and road expansions, the corridors of Moniya and Fiditi are experiencing massive appreciation. Here is why you should buy now.',
    category: 'Hotspots',
    coverImage: 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    content: `<h2>The Oyo State Expansion</h2><p>Ibadan and its surroundings are undergoing an industrial expansion. Strategic state developments are channeling real estate growth along the Moniya and Fiditi transport corridors.</p><h2>Key Drivers of Value</h2><p>Several government and commercial projects are driving rapid property appreciation in these areas:</p><ul><li><strong>Moniya Train Station:</strong> The new Lagos-Ibadan standard gauge railway has turned Moniya into a central transport gateway.</li><li><strong>Dry Inland Port:</strong> The Akinyele Local Government inland port development drives massive logistics and warehousing needs.</li><li><strong>Agro-Hub Potential:</strong> Fiditi's fertile land makes it a prime sector for agricultural investment, bridging the gap between Ibadan and Oyo town.</li></ul><p>Smart real estate investors are buying and banking plots in Moniya and Fiditi to capitalize on the incoming commercial sprawl.</p>`,
    published: true,
  }
]

async function getPosts() {
  try {
    let posts = await prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
    })

    // Seed mock data if database is empty
    if (posts.length === 0) {
      await prisma.blogPost.createMany({
        data: INITIAL_MOCK_POSTS,
      })
      
      posts = await prisma.blogPost.findMany({
        where: { published: true },
        orderBy: { createdAt: 'desc' },
      })
    }
    
    return posts
  } catch (error) {
    console.error('Error fetching posts:', error)
    return []
  }
}

async function getCategories() {
  try {
    let categories = await prisma.category.findMany({
      orderBy: { name: 'asc' }
    })

    if (categories.length === 0) {
      const defaultCategories = ['Investment', 'Documentation', 'Buying Tips', 'Hotspots']
      await prisma.category.createMany({
        data: defaultCategories.map(name => ({ name }))
      })
      categories = await prisma.category.findMany({
        orderBy: { name: 'asc' }
      })
    }
    return categories
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

export default async function BlogPage() {
  const [posts, categories] = await Promise.all([
    getPosts(),
    getCategories()
  ])

  return (
    <div className="pt-32 pb-24 min-h-screen bg-slate-50 w-full">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <span className="text-orange-600 font-semibold text-sm tracking-wider uppercase">DealRite Insights</span>
          <h1 className="text-4xl font-extrabold text-slate-900 mt-2 mb-4">Latest Blog & Articles</h1>
          <p className="text-slate-600">
            Stay informed with expert advice on real estate investing, land laws, documentation, and market trends.
          </p>
        </div>

        {/* Dynamic Blog Grid */}
        <BlogGrid initialPosts={posts} categories={categories} />
      </div>
    </div>
  )
}
