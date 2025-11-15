import { notFound } from "next/navigation"
import { getPostBySlug, getAllPosts } from "@/lib/mdx"
import { formatDate } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import ReactMarkdown from "react-markdown"

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)

  if (!post) {
    return {
      title: "Статья не найдена",
    }
  }

  return {
    title: post.title,
    description: post.description,
  }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="container px-4 py-24">
      <article className="mx-auto max-w-3xl">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <div className="flex items-center gap-2 text-muted-foreground mb-4">
            <time>{formatDate(post.date)}</time>
            <span>•</span>
            <span>{post.author}</span>
          </div>
          {post.tags && post.tags.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </header>

        <div className="prose prose-slate max-w-none">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
      </article>
    </div>
  )
}
