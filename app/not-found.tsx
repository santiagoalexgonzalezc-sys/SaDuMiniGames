import Link from "next/link"
import { Gamepad2 } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <Gamepad2 className="w-16 h-16 text-purple-500 mx-auto mb-4" />
        <h1 className="text-4xl font-bold text-white mb-4">Game Not Found</h1>
        <p className="text-gray-400 mb-8">
          The game you're looking for doesn't exist or has been removed.
        </p>
        <Link
          href="/"
          className="inline-block bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg transition-colors"
        >
          Back to Games
        </Link>
      </div>
    </div>
  )
}
