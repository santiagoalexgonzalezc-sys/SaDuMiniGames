# SaDuMiniGames

A web platform for hosting and playing mini-games from various creators, inspired by itch.io and poki.

## Tech Stack

- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Adding Games

### Quick Method (Recommended)
If you have a game you'd like to add to the platform, simply email me at **santiagoalexgonzalezc@gmail.com** with:
- Your game's URL (GitHub Pages or other hosting)
- Game title and description
- Category preference
- Any other relevant details

I'll add your game to the platform for you!

### Manual Method
If you prefer to add games yourself, follow these steps:

#### Step 1: Host Your Game on GitHub Pages

1. Create a GitHub repository for your game
2. Enable GitHub Pages for the repository
3. Your game will be accessible at: `https://username.github.io/repository-name/`

### For Local Games

If you have a local game (like `C:/Users/name1/name2/name2Programacion/BrawlStarsCopy/index.html`), you cannot directly use local file paths in iframes due to browser security restrictions. You must host it first:

**Option 1: GitHub Pages (Recommended)**
1. Create a new GitHub repository
2. Upload your game files (index.html and any assets)
3. Go to repository Settings → Pages
4. Select "Deploy from a branch" and choose "main" branch
5. Your game will be available at: `https://your-username.github.io/repository-name/`

**Option 2: Other Static Hosting**
- Netlify (drag and drop your folder)
- Vercel
- GitHub Pages (as described above)

### Step 2: Add Game Metadata

Edit `data/games.ts` and add your game to the `games` array:

```typescript
{
  id: "unique-game-id",
  title: "Your Game Title",
  description: "A brief description of your game",
  category: "Action", // Choose from: Action, Adventure, Puzzle, Arcade, Strategy, Sports, Racing, Educational
  thumbnail: "/thumbnails/your-game.jpg", // Add thumbnail image to public/thumbnails/
  gameUrl: "https://username.github.io/repository-name/",
  controls: "Instructions on how to play",
  tags: ["web", "browser", "your-tags"],
  rating: 4, // 1-5 stars
  releaseDate: "2024-01-15",
}
```

### Step 3: Add Thumbnail

1. Create or find a thumbnail image for your game (recommended size: 640x360)
2. Place it in the `public/thumbnails/` folder
3. Reference it in the game metadata

### Game Requirements

- Games must be hosted on GitHub Pages or similar static hosting
- Games should be responsive and work in iframes
- Recommended iframe size: 800x600 (adjustable)
- Games should handle keyboard/mouse input properly

### Available Categories

- Action
- Adventure
- Puzzle
- Arcade
- Strategy
- Sports
- Racing
- Educational

## Project Structure

```
/app
  /layout.tsx          # Root layout with Header and Footer
  /page.tsx            # Home page with game catalog
  /games
    /[gameId]/page.tsx # Individual game page
  /category
    /[category]/page.tsx # Category pages
/components
  /GameCard.tsx        # Game card component
  /GamePlayer.tsx      # Game player with iframe
  /Header.tsx          # Navigation header
  /Footer.tsx          # Footer with links
  /FilterBar.tsx       # Category filter and search
/data
  /games.ts            # Game metadata array
/public
  /thumbnails          # Game thumbnail images
```

## Features

- **Game Catalog**: Browse all games with filtering and search
- **Category Filtering**: Filter games by category
- **Search**: Search games by title or description
- **Game Player**: Embedded iframe player with fullscreen mode
- **Responsive Design**: Works on desktop and mobile
- **Modern UI**: Clean interface inspired by poki/itch.io

## Building for Production

```bash
npm run build
npm start
```

## License

MIT



## Website Of the Game
https://sa-du-mini-games.vercel.app/
