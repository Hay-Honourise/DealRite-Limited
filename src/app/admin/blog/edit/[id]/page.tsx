import prisma from '@/lib/db'
import { notFound } from 'next/navigation'
import EditForm from './EditForm'

type Props = {
  params: Promise<{ id: string }>
}

async function getPostData(id: string) {
  try {
    const post = await prisma.blogPost.findUnique({
      where: {
        id: parseInt(id),
      },
    })
    return post
  } catch (error) {
    console.error('Error fetching post for edit:', error)
    return null
  }
}

export default async function EditBlogPostPage({ params }: Props) {
  const { id } = await params
  const post = await getPostData(id)

  if (!post) {
    notFound()
  }

  return (
    <div className="pt-32 pb-24 min-h-screen bg-slate-50 w-full">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        {/* Prefilled Form */}
        <EditForm post={post} />
      </div>
    </div>
  )
}
