export interface Game {
  id: string
  title: string
  description: string
  category: string
  thumbnail: string
  gameUrl: string
  controls: string
  tags: string[]
  rating: number
  releaseDate: string
}

export const games: Game[] = [
  {
    id: "monkeydluzi-first-website",
    title: "MonkeyDluzi First Website",
    description: "A simple web-based game hosted on GitHub Pages",
    category: "Arcade",
    thumbnail: "/thumbnails/monkeydluzi.jpg",
    gameUrl: "https://monkeydluzi.github.io/MonkeyDluziMyFirstWebsite/",
    controls: "Use mouse to interact with the game",
    tags: ["web", "simple", "browser"],
    rating: 4,
    releaseDate: "2024-01-15",
  },
]

export const categories = [
  "All",
  "Action",
  "Adventure",
  "Puzzle",
  "Arcade",
  "Strategy",
  "Sports",
  "Racing",
  "Educational",
]
