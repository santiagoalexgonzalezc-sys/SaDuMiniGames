"use client"

import { useState, useEffect } from "react"
import { categories, games } from "@/data/games"
import { Copy, Check, Trash2, Lock } from "lucide-react"

const ADMIN_PASSWORD = "12ifdojn12f234"

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    description: "",
    category: "Arcade",
    thumbnail: "",
    gameUrl: "",
    controls: "",
    tags: "",
    rating: "4",
    releaseDate: new Date().toISOString().split("T")[0],
  })

  const [generatedCode, setGeneratedCode] = useState("")
  const [copied, setCopied] = useState(false)
  const [deleteCode, setDeleteCode] = useState("")

  useEffect(() => {
    const auth = localStorage.getItem("adminAuth")
    if (auth === "true") {
      setIsAuthenticated(true)
    }
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      localStorage.setItem("adminAuth", "true")
      setPasswordError("")
    } else {
      setPasswordError("Incorrect password")
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem("adminAuth")
    setPassword("")
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const generateCode = () => {
    const tagsArray = formData.tags.split(",").map(tag => tag.trim()).filter(tag => tag)
    
    const code = `  {
    id: "${formData.id}",
    title: "${formData.title}",
    description: "${formData.description}",
    category: "${formData.category}",
    thumbnail: "${formData.thumbnail}",
    gameUrl: "${formData.gameUrl}",
    controls: "${formData.controls}",
    tags: ${JSON.stringify(tagsArray)},
    rating: ${parseInt(formData.rating)},
    releaseDate: "${formData.releaseDate}",
  },`

    setGeneratedCode(code)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const generateDeleteCode = (gameId: string) => {
    const code = `// Find and remove this game from the games array:
// Look for the game with id: "${gameId}"
// Delete the entire object block for this game`
    setDeleteCode(code)
  }

  const copyDeleteCode = () => {
    navigator.clipboard.writeText(deleteCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-gray-900 rounded-lg p-8 border border-gray-800 max-w-md w-full mx-4">
          <div className="flex items-center justify-center mb-6">
            <Lock className="w-12 h-12 text-purple-500" />
          </div>
          <h1 className="text-2xl font-bold text-white text-center mb-2">Admin Login</h1>
          <p className="text-gray-400 text-center mb-6">Enter password to access admin panel</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
              />
              {passwordError && (
                <p className="text-red-400 text-sm mt-2">{passwordError}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-purple-500 hover:bg-purple-600 text-white py-3 rounded-lg font-medium transition-colors"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Admin Panel</h1>
          <p className="text-gray-400">Add and manage games</p>
        </div>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <h2 className="text-xl font-semibold text-white mb-6">Add New Game</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Game ID *</label>
              <input
                type="text"
                name="id"
                value={formData.id}
                onChange={handleChange}
                placeholder="unique-game-id"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Your Game Title"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="A brief description of your game"
                rows={3}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 resize-none"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
              >
                {categories.filter(cat => cat !== "All").map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Thumbnail URL *</label>
              <input
                type="text"
                name="thumbnail"
                value={formData.thumbnail}
                onChange={handleChange}
                placeholder="/thumbnails/game.jpg or https://example.com/image.jpg"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Game URL (GitHub Pages) *</label>
              <input
                type="text"
                name="gameUrl"
                value={formData.gameUrl}
                onChange={handleChange}
                placeholder="https://username.github.io/repository-name/"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Controls *</label>
              <input
                type="text"
                name="controls"
                value={formData.controls}
                onChange={handleChange}
                placeholder="Use arrow keys to move"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Tags (comma-separated)</label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="puzzle, browser, simple"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Rating (1-5) *</label>
              <select
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
              >
                {[1, 2, 3, 4, 5].map(rating => (
                  <option key={rating} value={rating}>{rating} stars</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Release Date *</label>
              <input
                type="date"
                name="releaseDate"
                value={formData.releaseDate}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
              />
            </div>

            <button
              onClick={generateCode}
              className="w-full bg-purple-500 hover:bg-purple-600 text-white py-3 rounded-lg font-medium transition-colors"
            >
              Generate Code
            </button>
          </div>
        </div>

        <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
          <h2 className="text-xl font-semibold text-white mb-6">Generated Code</h2>
          
          {generatedCode ? (
            <div className="space-y-4">
              <div className="bg-gray-800 rounded-lg p-4 overflow-x-auto">
                <pre className="text-sm text-gray-300 whitespace-pre-wrap">{generatedCode}</pre>
              </div>
              
              <button
                onClick={copyToClipboard}
                className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                {copied ? (
                  <>
                    <Check className="w-5 h-5" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-5 h-5" />
                    Copy to Clipboard
                  </>
                )}
              </button>

              <div className="bg-blue-500/10 border border-blue-500 rounded-lg p-4">
                <h3 className="text-blue-400 font-semibold mb-2">Next Steps:</h3>
                <ol className="text-sm text-gray-300 space-y-1 list-decimal list-inside">
                  <li>Copy the generated code</li>
                  <li>Go to your GitHub repository</li>
                  <li>Open <code className="bg-gray-800 px-1 rounded">data/games.ts</code></li>
                  <li>Paste the code inside the <code className="bg-gray-800 px-1 rounded">games</code> array</li>
                  <li>Commit the changes</li>
                  <li>Vercel will auto-deploy in 1-2 minutes</li>
                </ol>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-400">
              <p>Fill out the form and click "Generate Code"</p>
            </div>
          )}
        </div>
        </div>

        <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
          <h2 className="text-xl font-semibold text-white mb-6">Manage Games</h2>
          <div className="space-y-3">
            {games.map((game) => (
              <div key={game.id} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                <div className="flex-1">
                  <h3 className="text-white font-medium">{game.title}</h3>
                  <p className="text-gray-400 text-sm">{game.category}</p>
                </div>
                <button
                  onClick={() => generateDeleteCode(game.id)}
                  className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg transition-colors"
                  title="Delete game"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {deleteCode && (
            <div className="mt-4 space-y-3">
              <div className="bg-gray-800 rounded-lg p-4">
                <pre className="text-sm text-gray-300 whitespace-pre-wrap">{deleteCode}</pre>
              </div>
              <button
                onClick={copyDeleteCode}
                className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy Delete Instructions
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
