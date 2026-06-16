"use client"

import { useState } from "react"
import { Maximize2, Minimize2 } from "lucide-react"

interface GamePlayerProps {
  gameUrl: string
  title: string
}

export default function GamePlayer({ gameUrl, title }: GamePlayerProps) {
  const [isFullscreen, setIsFullscreen] = useState(false)

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  return (
    <div className={`relative ${isFullscreen ? "fixed inset-0 z-50 bg-black" : ""}`}>
      <div className="absolute top-2 right-2 z-10">
        <button
          onClick={toggleFullscreen}
          className="bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-lg transition-colors"
          title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
        >
          {isFullscreen ? (
            <Minimize2 className="w-5 h-5" />
          ) : (
            <Maximize2 className="w-5 h-5" />
          )}
        </button>
      </div>
      <iframe
        src={gameUrl}
        width={isFullscreen ? "100%" : "800"}
        height={isFullscreen ? "100%" : "600"}
        frameBorder="0"
        scrolling="yes"
        allowFullScreen
        title={title}
        className="rounded-lg bg-gray-800"
      />
    </div>
  )
}
