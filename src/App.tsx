import { useCallback, useEffect, useMemo, useState } from "react";
import Search from "./components/Search";
import useFetch from "./hooks/useFetch";
import { fetchGames } from "./services/api";
import type { Game } from "./types/Game.interface";
import GameCard from "./components/GameCard";
import ErrorMessage from "./components/ErrorMessage";
import Spinner from "./components/Spinner";
import GameDetails from './components/GameDetails';

const DEBOUNCE_DELAY = 500;
const PARTICLE_COUNT = 50;

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showGameDetails, setShowGameDetails] = useState(false);
  const [currentGame, setCurrentGame] = useState<Game | null>(null);

  const fetchGamesMemoized = useCallback(({ query }: { query: string }) => {
    return fetchGames({ query });
  }, []);
  
  const { data: games, loading, error, fetchData } = useFetch<{ query: string }, Game[]>(fetchGamesMemoized);

  const hasSearchResults = useMemo(
    () => Boolean(searchQuery.trim() && games && games.length > 0),
    [searchQuery, games]
  );

  const showWelcomeState = useMemo(
    () => !loading && !error && !searchQuery.trim(),
    [loading, error, searchQuery]
  );

  const showNoResultsState = useMemo(
    () => !loading && !error && games && games.length === 0 && searchQuery.trim(),
    [loading, error, games, searchQuery]
  );

  const handleSearch = useCallback(async () => {
    if (searchQuery.trim()) {
      await fetchData({ query: searchQuery });
    }
  }, [searchQuery, fetchData]);

  const handleGameSelect = useCallback((game: Game) => {
    setCurrentGame(game);
    setShowGameDetails(true);
  }, []);

  const closeGameDetails = useCallback(() => {
    setShowGameDetails(false);
    setCurrentGame(null);
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(handleSearch, DEBOUNCE_DELAY);
    return () => clearTimeout(timeoutId);
  }, [searchQuery, handleSearch]);

  const renderParticles = useMemo(() => (
    [...Array(PARTICLE_COUNT)].map((_, i) => (
      <div
        key={`particle-${i}`}
        className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 3}s`,
          animationDuration: `${2 + Math.random() * 3}s`
        }}
      />
    ))
  ), []);

  const renderGameCards = useMemo(() => (
    games?.map((game, index) => (
      <div
        key={game.slug}
        className="transform transition-all duration-500 hover:scale-105 hover:-translate-y-3 opacity-0 animate-slideInUp"
        style={{
          animationDelay: `${index * 0.1}s`,
          animationFillMode: 'forwards'
        }}
      >
        <div className="group relative">
          <GameCard
            background_image={game.background_image || '/placeholder.png'}
            name={game.name}
            playtime={game.playtime}
            genres={game.genres}
            onClick={() => handleGameSelect(game)}
          />
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/20 group-hover:to-purple-500/20 rounded-xl blur-xl transition-all duration-500 -z-10" />
        </div>
      </div>
    ))
  ), [games, handleGameSelect]);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Dynamic animated background */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-out"
        style={{ backgroundImage: 'url(/background.png)' }}
      />
      
      {/* Sophisticated overlay with multiple layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-slate-800/90 to-indigo-900/95" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      
      {/* Animated particles/dots effect */}
      <div className="absolute inset-0 opacity-30">
        {renderParticles}
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        <header className="pt-12 pb-16">
          <div className="container mx-auto px-6">
            <div className="text-center space-y-6">
              <div className="inline-flex items-center gap-6 group">
                <div className="relative">
                  <img 
                    src="/logo.png" 
                    className="w-14 h-14 md:w-16 md:h-16 transition-all duration-500 group-hover:scale-110 drop-shadow-2xl filter brightness-110" 
                    alt="Logo" 
                  />
                  <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                
                <div className="relative">
                  <h1 className="text-5xl md:text-7xl font-black tracking-tight">
                    <span className="bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-transparent">
                      Games
                    </span>
                    <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent ml-4">
                      Database
                    </span>
                  </h1>
                  <div className="absolute inset-0 text-5xl md:text-7xl font-black tracking-tight opacity-20 blur-sm">
                    <span className="text-white">Games</span>
                    <span className="text-indigo-400 ml-4">Database</span>
                  </div>
                </div>
              </div>
              
              <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                Explore an extensive collection of games with detailed information, 
                ratings, and comprehensive metadata.
              </p>
            </div>
          </div>
        </header>

        <div className="flex-1 container mx-auto px-6">
          <div className="max-w-4xl mx-auto mb-12">
            <div className="relative group">
              <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl transition-all duration-500 group-hover:bg-white/10 group-hover:border-white/20">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <Search
                  query={searchQuery}
                  onChange={setSearchQuery}
                />
              </div>
              
              <div className="absolute -top-6 -right-6 w-12 h-12 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute -bottom-6 -left-6 w-8 h-8 bg-gradient-to-r from-pink-500/20 to-orange-500/20 rounded-full blur-lg opacity-30 group-hover:opacity-70 transition-opacity duration-500" />
            </div>
          </div>

          <div className="max-w-7xl mx-auto">
            {error && <ErrorMessage message="An error occurred while fetching games. Please try again later." />}
            
            {loading && (
              <div className="flex justify-center items-center py-20">
                <div className="relative">
                  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-12 shadow-2xl">
                    <div className="flex flex-col items-center gap-6">
                      <div className="relative">
                        <Spinner />
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-xl animate-pulse" />
                      </div>
                      <div className="text-center">
                        <h3 className="text-xl font-semibold text-white mb-2">Searching Games</h3>
                        <p className="text-slate-400">Please wait while we fetch the latest results...</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {hasSearchResults && (
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-white">
                    Search Results 
                    <span className="text-slate-400 font-normal ml-2">({games?.length} games found)</span>
                  </h2>
                  <div className="text-sm text-slate-400 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                    Updated just now
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                  {renderGameCards}
                </div>
              </div>
            )}

            {showNoResultsState && (
              <div className="text-center py-20">
                <div className="max-w-md mx-auto">
                  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-12 shadow-2xl">
                    <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-slate-600/20 to-slate-500/20 rounded-full flex items-center justify-center">
                      <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">No Games Found</h3>
                    <p className="text-slate-400 mb-6 leading-relaxed">
                      We couldn't find any games matching "<span className="text-white font-medium">{searchQuery}</span>". 
                      Try adjusting your search terms.
                    </p>
                    <div className="space-y-2 text-sm text-slate-500">
                      <p>💡 Try searching for: <span className="text-slate-300">"GTA", "Cyberpunk", "Minecraft"</span></p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {showWelcomeState && (
              <div className="text-center py-20">
                <div className="max-w-2xl mx-auto">
                  <div className="relative group">
                    <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-16 shadow-2xl transition-all duration-500 group-hover:from-white/15 group-hover:to-white/10">
                      <div className="space-y-8">
                        <div className="relative">
                          <div className="w-24 h-24 mx-auto mb-8 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/10">
                            <svg className="w-12 h-12 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                          </div>
                          <div className="absolute -top-4 -right-4 w-6 h-6 bg-purple-500/30 rounded-full blur-sm animate-pulse" />
                          <div className="absolute -bottom-4 -left-4 w-4 h-4 bg-blue-500/30 rounded-full blur-sm animate-pulse" style={{ animationDelay: '1s' }} />
                        </div>
                        
                        <div className="space-y-4">
                          <h2 className="text-3xl md:text-4xl font-bold text-white">
                            Discover Your Next
                            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent block md:inline md:ml-3">
                              Gaming Adventure
                            </span>
                          </h2>
                          <p className="text-xl text-slate-300 leading-relaxed">
                            Search through thousands of games with detailed metadata, 
                            ratings, and comprehensive information to find exactly what you're looking for.
                          </p>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-4 pt-8">
                          <div className="text-center p-4 bg-white/5 rounded-xl border border-white/10">
                            <div className="text-2xl font-bold text-blue-400">50K+</div>
                            <div className="text-sm text-slate-400">Games Available</div>
                          </div>
                          <div className="text-center p-4 bg-white/5 rounded-xl border border-white/10">
                            <div className="text-2xl font-bold text-purple-400">Real-time</div>
                            <div className="text-sm text-slate-400">Search Results</div>
                          </div>
                          <div className="text-center p-4 bg-white/5 rounded-xl border border-white/10">
                            <div className="text-2xl font-bold text-pink-400">Detailed</div>
                            <div className="text-sm text-slate-400">Game Info</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="absolute -top-8 -right-8 w-16 h-16 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                    <div className="absolute -bottom-8 -left-8 w-12 h-12 bg-gradient-to-r from-pink-500/10 to-orange-500/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" style={{ transitionDelay: '200ms' }} />
                  </div>
                </div>
              </div>
            )}

            {showGameDetails && currentGame && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeGameDetails} />
                <div className="relative max-w-6xl w-full max-h-[90vh] overflow-y-auto">
                  <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl">
                    <GameDetails
                      currentGame={currentGame}
                      goBack={closeGameDetails}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slideInUp {
          animation: slideInUp 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default App;