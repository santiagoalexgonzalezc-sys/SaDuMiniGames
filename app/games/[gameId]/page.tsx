"use client"

import { useState, useEffect } from "react"
import { games } from "@/data/games"
import GamePlayer from "@/components/GamePlayer"
import Link from "next/link"
import { ArrowLeft, Star, Tag, MessageSquare, Send } from "lucide-react"
import { notFound } from "next/navigation"

interface Comment {
  id: string
  author: string
  text: string
  date: string
}

export default function GamePage({ params }: { params: { gameId: string } }) {
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState({ author: "", text: "" })
  
  const game = games.find((g) => g.id === params.gameId)

  useEffect(() => {
    if (game) {
      const storedComments = localStorage.getItem(`comments-${game.id}`)
      if (storedComments) {
        setComments(JSON.parse(storedComments))
      }
    }
  }, [game])

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.author.trim() || !newComment.text.trim() || !game) return

    const comment: Comment = {
      id: Date.now().toString(),
      author: newComment.author.trim(),
      text: newComment.text.trim(),
      date: new Date().toISOString(),
    }

    const updatedComments = [...comments, comment]
    setComments(updatedComments)
    localStorage.setItem(`comments-${game.id}`, JSON.stringify(updatedComments))
    setNewComment({ author: "", text: "" })
  }

  if (!game) {
    notFound()
  }

  const relatedGames = games
    .filter((g) => g.id !== game.id && g.category === game.category)
    .slice(0, 3)

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Games
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-4">{game.title}</h1>
            <GamePlayer gameUrl={game.gameUrl} title={game.title} />
          </div>

          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Comments ({comments.length})
            </h2>

            <form onSubmit={handleSubmitComment} className="space-y-4 mb-6">
              <div>
                <input
                  type="text"
                  placeholder="Your name"
                  value={newComment.author}
                  onChange={(e) => setNewComment({ ...newComment, author: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                />
              </div>
              <div>
                <textarea
                  placeholder="Write a comment..."
                  value={newComment.text}
                  onChange={(e) => setNewComment({ ...newComment, text: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 resize-none"
                />
              </div>
              <button
                type="submit"
                className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                Post Comment
              </button>
            </form>

            <div className="space-y-4">
              {comments.length === 0 ? (
                <p className="text-gray-400 text-center py-4">No comments yet. Be the first to comment!</p>
              ) : (
                comments.map((comment) => (
                  <div key={comment.id} className="bg-gray-800 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-medium">{comment.author}</span>
                      <span className="text-gray-400 text-sm">
                        {new Date(comment.date).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-gray-300">{comment.text}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <h2 className="text-xl font-semibold text-white mb-4">Game Info</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm text-gray-400 mb-1">Description</h3>
                <p className="text-gray-300">{game.description}</p>
              </div>
              <div>
                <h3 className="text-sm text-gray-400 mb-1">Category</h3>
                <span className="text-purple-400">{game.category}</span>
              </div>
              <div>
                <h3 className="text-sm text-gray-400 mb-1">Controls</h3>
                <p className="text-gray-300">{game.controls}</p>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <span className="text-white font-semibold">{game.rating}</span>
                <span className="text-gray-400">/ 5</span>
              </div>
              <div>
                <h3 className="text-sm text-gray-400 mb-2 flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {game.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {relatedGames.length > 0 && (
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <h2 className="text-xl font-semibold text-white mb-4">
                Related Games
              </h2>
              <div className="space-y-3">
                {relatedGames.map((relatedGame) => (
                  <Link
                    key={relatedGame.id}
                    href={`/games/${relatedGame.id}`}
                    className="block p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    <h3 className="text-white font-medium mb-1">
                      {relatedGame.title}
                    </h3>
                    <p className="text-gray-400 text-sm line-clamp-2">
                      {relatedGame.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
