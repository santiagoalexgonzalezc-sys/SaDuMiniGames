import Link from "next/link"
import { Gamepad2 } from "lucide-react"

export default function Header() {
  return (
    <header className="border-b border-gray-800 bg-gray-950/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Gamepad2 className="w-8 h-8 text-purple-500" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              SaDuMiniGames
            </h1>
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/" className="text-gray-300 hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/category/all" className="text-gray-300 hover:text-white transition-colors">
              All Games
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
