import Link from "next/link"
import { Game } from "@/data/games"
import { Star } from "lucide-react"

interface GameCardProps {
  game: Game
}

export default function GameCard({ game }: GameCardProps) {
  return (
    <Link href={`/games/${game.id}`}>
      <div className="group relative bg-gray-900 rounded-lg overflow-hidden border border-gray-800 hover:border-purple-500 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 cursor-pointer">
        <div className="aspect-video bg-gray-800 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60" />
          <div className="absolute inset-0 flex items-center justify-center text-gray-600">
            <span className="text-sm">Game Thumbnail</span>
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-white mb-2 group-hover:text-purple-400 transition-colors">
            {game.title}
          </h3>
          <p className="text-gray-400 text-sm mb-3 line-clamp-2">{game.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-xs text-purple-400 bg-purple-400/10 px-2 py-1 rounded">
              {game.category}
            </span>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <span className="text-sm text-gray-400">{game.rating}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
