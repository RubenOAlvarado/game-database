import { useEffect, useState } from "react";
import Search from "./components/Search";
import useFetch from "./hooks/useFetch";
import { fetchGames } from "./services/api";
import type { Game } from "./types/Game.interface";
import GameCard from "./components/GameCard";
import ErrorMessage from "./components/ErrorMessage";
import Spinner from "./components/Spinner";

function App() {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const { data, loading, error, fetchData } = 
      useFetch<{ query: string }, Game[]>(() => fetchGames({ query: searchQuery }));

  useEffect(() => {
    const timeoutId = setTimeout( async () => {
      if(searchQuery.trim()){
        await fetchData();
        return;
      }
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  return (
    <main className='w-full p-2 flex flex-col items-center'>
      <div className='flex items-center'>
        <h1 className="text-gradient text-4xl font-bold">Game database</h1>
        <img src='./logo.png' className='w-25 h-25' />
      </div>
      <div className="w-full max-w-4xl">
        <Search
          query={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} 
        />
        <div className="w-full">
          {data && !loading && !error && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {data.map((game) => (
                    <GameCard
                      key={game.slug}
                      background_image={game.background_image || './placeholder.png'}
                      name={game.name}
                      playtime={game.playtime}
                      genres={game.genres}
                      onClick={() => window.open(`https://rawg.io/games/${game.slug}`, '_blank')}
                    />
                ))}
              </div>
              {data?.length === 0 && (
                <ErrorMessage
                  message="No games found. Try a different search term."
                />
              )}
            </>
          )}
          {error && <ErrorMessage message="Network error ocurred!" />}
          {loading && <Spinner />}
        </div>
      </div>
    </main>
  )
}

export default App
