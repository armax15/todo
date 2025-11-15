import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getAllPosts } from "@/lib/mdx"
import { formatDate } from "@/lib/utils"

export const metadata = {
  title: "Блог",
  description: "Статьи о продуктивности, управлении задачами и советы по работе",
}

export default function BlogPage() {
  const posts = getAllPosts()

  if (posts.length === 0) {
    return (
      <div className="container px-4 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold mb-4">Блог</h1>
          <p className="text-muted-foreground">
            Скоро здесь появятся интересные статьи!
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="container px-4 py-24">
      <div className="mx-auto max-w-4xl">
        <div className="mb-16">
          <h1 className="text-4xl font-bold mb-4">Блог</h1>
          <p className="text-lg text-muted-foreground">
            Статьи о продуктивности, управлении задачами и советы по работе
          </p>
        </div>

        <div className="grid gap-8">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <time>{formatDate(post.date)}</time>
                    <span>•</span>
                    <span>{post.author}</span>
                  </div>
                  <CardTitle className="text-2xl">{post.title}</CardTitle>
                  <CardDescription className="text-base">
                    {post.description}
                  </CardDescription>
                </CardHeader>
                {post.tags && post.tags.length > 0 && (
                  <CardContent>
                    <div className="flex gap-2 flex-wrap">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                )}
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
