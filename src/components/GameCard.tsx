import type { Genre } from "../types/Game.interface";

interface GameCardProps {
  background_image: string;
  name: string;
  playtime: number;
  genres: Genre[];
  onClick: () => void;
}

export default function GameCard({
  background_image,
  name,
  playtime,
  genres,
  onClick,
}: GameCardProps) {
  return (
    <div 
      className="relative group overflow-hidden rounded-xl shadow-2xl cursor-pointer transition-all duration-500 hover:shadow-indigo-500/20"
      onClick={onClick}
    >
      {/* Game image with overlay effects */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={background_image || '/placeholder.png'}
          alt={name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        {/* Hover effect layer */}
        <div className="absolute inset-0 bg-indigo-500/0 group-hover:bg-indigo-500/10 transition-all duration-500" />
      </div>

      {/* Game info container */}
      <div className="absolute inset-0 p-4 flex flex-col justify-end">
        {/* Game title */}
        <h2 className="text-white text-xl font-bold mb-2 drop-shadow-md transition-all duration-300 group-hover:text-indigo-300">
          {name}
        </h2>

        {/* Metadata row */}
        <div className="flex items-center gap-4 mb-3">
          {/* Playtime */}
          {playtime > 0 && (
            <div className="flex items-center gap-1.5">
              <svg 
                className="w-4 h-4 text-indigo-300" 
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z" />
                <path d="M13 7h-2v6h6v-2h-4z" />
              </svg>
              <span className="text-sm text-slate-300">
                {playtime} {playtime === 1 ? "Hour" : "Hours"}
              </span>
            </div>
          )}

          {/* Genres */}
          <div className="flex flex-wrap gap-2">
            {genres.slice(0, 2).map((genre) => (
              <span
                key={genre.id}
                className="px-2 py-1 text-xs font-medium rounded-full bg-indigo-900/60 text-indigo-100 backdrop-blur-sm border border-indigo-500/30"
              >
                {genre.name}
              </span>
            ))}
            {genres.length > 2 && (
              <span className="px-2 py-1 text-xs font-medium rounded-full bg-slate-800/60 text-slate-300 backdrop-blur-sm border border-slate-600/30">
                +{genres.length - 2}
              </span>
            )}
          </div>
        </div>

        {/* Hover action indicator */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-10 h-10 flex items-center justify-center bg-indigo-600/90 rounded-full backdrop-blur-sm border border-indigo-400/30">
            <svg 
              className="w-5 h-5 text-white" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}