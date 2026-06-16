"use client"

import { useState } from "react"
import { games, categories } from "@/data/games"
import GameCard from "@/components/GameCard"
import FilterBar from "@/components/FilterBar"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function CategoryPage({ params }: { params: { category: string } }) {
  const [searchQuery, setSearchQuery] = useState("")
  const category = params.category

  const filteredGames = games.filter((game) => {
    const matchesCategory = category === "all" || game.category.toLowerCase() === category.toLowerCase()
    const matchesSearch =
      searchQuery === "" ||
      game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </Link>

      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2 capitalize">
          {category === "all" ? "All Games" : category}
        </h2>
        <p className="text-gray-400">
          {filteredGames.length} game{filteredGames.length !== 1 ? "s" : ""} found
        </p>
      </div>

      <FilterBar
        selectedCategory={category === "all" ? "All" : category.charAt(0).toUpperCase() + category.slice(1)}
        onCategoryChange={(newCategory) => {
          window.location.href = `/category/${newCategory.toLowerCase()}`
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {filteredGames.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">No games found in this category</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredGames.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      )}
    </div>
  )
}
