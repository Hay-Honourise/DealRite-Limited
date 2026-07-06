import prisma from '@/lib/db'
import AdminDashboardGrid from './AdminDashboardGrid'

export const revalidate = 0 // Disable caching for the admin view so data is always fresh

async function getDashboardData() {
  try {
    const posts = await prisma.blogPost.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        _count: {
          select: {
            comments: true,
          },
        },
      },
    })
    return posts
  } catch (error) {
    console.error('Error fetching dashboard posts:', error)
    return []
  }
}

export default async function AdminBlogDashboardPage() {
  const posts = await getDashboardData()

  return (
    <div className="pt-32 pb-24 min-h-screen bg-slate-50 w-full">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        {/* Header */}
        <div className="mb-10">
          <span className="text-orange-600 font-semibold text-sm tracking-wider uppercase">Editorial Hub</span>
          <h1 className="text-4xl font-extrabold text-slate-900 mt-2 mb-3">Blog Administration Portal</h1>
          <p className="text-slate-600">
            Monitor page view metrics, oversee community responses, and update brand articles.
          </p>
        </div>

        {/* Aggregate Stats and Manage Index Grid */}
        <AdminDashboardGrid initialPosts={posts} />
      </div>
    </div>
  )
}
