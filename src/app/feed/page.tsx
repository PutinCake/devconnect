// app/feed/page.tsx
import { getRecentPosts } from "@/lib/db/post"

export default async function FeedPage() {
  const posts = await getRecentPosts()

  return (
    <main className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Feed</h1>

      {posts.length === 0 && <p>No posts yet.</p>}

      {posts.map((post) => (
        <div key={post.id} className="border p-4 mb-4 rounded-md shadow">
          <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
          <p className="text-sm text-gray-600 mb-2">by {post.author?.name}</p>
          <p className="text-gray-800">{post.content.slice(0, 100)}...</p>
        </div>
      ))}
    </main>
  )
}
