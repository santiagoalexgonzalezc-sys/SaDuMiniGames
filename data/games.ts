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
  {
    id: "2048-game",
    title: "2048",
    description: "Classic 2048 puzzle game - slide tiles to combine numbers and reach 2048",
    category: "Puzzle",
    thumbnail: "/thumbnails/2048.jpg",
    gameUrl: "https://dofunprojects.github.io/2048/",
    controls: "Use arrow keys or swipe to move tiles",
    tags: ["puzzle", "numbers", "classic"],
    rating: 5,
    releaseDate: "2024-01-20",
  },
  {
    id: "button-game",
    title: "Button Game",
    description: "A simple button-clicking game",
    category: "Arcade",
    thumbnail: "/thumbnails/button-game.jpg",
    gameUrl: "https://dofunprojects.github.io/button1/",
    controls: "Click buttons to interact with the game",
    tags: ["simple", "clicker", "browser"],
    rating: 3,
    releaseDate: "2024-01-22",
  },
  {
    id: "css-study",
    title: "Catch A Button",
    description: "Catch a button with style",
    category: "Educational",
    thumbnail: "https://via.placeholder.com/640x360?text=CSS+Study",
    gameUrl: "https://monkeydluzi.github.io/CssStudy/",
    controls: "Use mouse to click the button",
    tags: ["educational", "css", "web", "learning"],
    rating: 4,
    releaseDate: "2024-06-19",
  },

  {
    id: "portal-chooser",
    title: "Portal Chooser",
    description: "Try the guess the right portals",
    category: "Puzzle",
    thumbnail: "https://via.placeholder.com/640x360?text=Portal+Chooser",
    gameUrl: "https://santiagoalexgonzalezc-sys.github.io/Portal_Chooser/",
    controls: "Choose different portals and get as many in a row",
    tags: ["educational", "Guess", "web", "Rng"],
    rating: 5,
    releaseDate: "2024-06-19",
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
