import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import { createParagraphs } from "../utils/utils";
import type { GameDetails } from "../types/GameDetails.interface";
import Spinner from "./Spinner";
import ErrorMessage from "./ErrorMessage";
import type { Game } from "../types/Game.interface";
import { fetchGameData } from "../services/api";

export default function GameDetails({ currentGame, goBack }: {
    currentGame: Game;
    goBack: () => void;
}) {
    const [description, setDescription] = useState([] as string[]);
    const { data, loading, fetchData, error} = useFetch<{slug: string}, GameDetails>(() => fetchGameData({slug: currentGame.slug}));

    useEffect(() => {
        (async () => {
            await fetchData();
        })();
    }, []);

    useEffect(() => {
        if (data) {
            const paragraphs = createParagraphs(data.description_raw);
            setDescription(paragraphs);
        }
    }, [data]);

    return (
        <div className="relative">
            {/* Background layers similar to App component */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-slate-800/90 to-indigo-900/95 rounded-2xl" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent rounded-2xl" />
            
            {/* Main content */}
            <div className="relative z-10 p-8">
                <button 
                    className="main-button flex items-center bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 px-4 py-2 rounded-lg transition-all duration-300 hover:bg-white/10 group"
                    onClick={goBack}
                >
                    <img 
                        src="./back-arrow.svg" 
                        alt="Back" 
                        className="w-5 h-5 group-hover:scale-110 transition-transform"
                    />
                    <span className="ml-2 text-slate-300 group-hover:text-white">Go Back</span>
                </button>

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
                                        <h3 className="text-xl font-semibold text-white mb-2">Loading Game Details</h3>
                                        <p className="text-slate-400">Please wait while we fetch the game information...</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {error && (
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl mt-6">
                        <div className="text-center">
                            <ErrorMessage message="We couldn't load the details for this game. Please try again later." />
                            <button 
                                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity"
                                onClick={() => fetchData()}
                            >
                                Retry
                            </button>
                        </div>
                    </div>
                )}

                {data && !loading && !error && (
                    <div className="mt-6 space-y-8">
                        {/* Game header with image */}
                        <div className="relative group">
                            <div className="relative overflow-hidden rounded-xl">
                                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-transparent z-10" />
                                <img
                                    className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-105"
                                    src={currentGame.background_image || './placeholder.png'}
                                    alt={currentGame.name}
                                />
                                <div className="absolute bottom-0 left-0 z-20 p-6">
                                    <h1 className="text-3xl md:text-4xl font-bold text-white">
                                        {currentGame.name}
                                        {data.released && (
                                            <span className="block text-lg text-slate-300 mt-1">
                                                Released: {new Date(data.released).toLocaleDateString()}
                                            </span>
                                        )}
                                    </h1>
                                    {data.metacritic && (
                                        <div className="mt-3 inline-flex items-center bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10">
                                            <span className={`text-sm font-semibold ${
                                                data.metacritic >= 75 ? 'text-green-400' :
                                                data.metacritic >= 50 ? 'text-yellow-400' :
                                                'text-red-400'
                                            }`}>
                                                Metacritic: {data.metacritic}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 shadow-2xl">
                            <h2 className="text-xl font-bold text-white mb-4 border-b border-white/10 pb-2">
                                About the Game
                            </h2>
                            <div className="text-slate-300 space-y-4">
                                {description.map((paragraph, index) => (
                                    <p key={index} className="leading-relaxed">
                                        {paragraph}
                                    </p>
                                ))}
                            </div>
                        </div>

                        {/* Game details grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Genres and Platforms */}
                            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 shadow-2xl space-y-6">
                                <div>
                                    <h2 className="text-xl font-bold text-white mb-3">Genres</h2>
                                    <ul className="flex flex-wrap gap-2">
                                        {currentGame.genres.map((genre) => (
                                            <li 
                                                key={genre.name}
                                                className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10 text-sm text-slate-300 hover:text-white transition-colors"
                                            >
                                                {genre.name}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div>
                                    <h2 className="text-xl font-bold text-white mb-3">Platforms</h2>
                                    <ul className="flex flex-wrap gap-2">
                                        {currentGame.platforms.map((platform) => (
                                            <li 
                                                key={platform.platform.name}
                                                className="bg-gradient-to-r from-slate-600/20 to-slate-500/20 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10 text-sm text-slate-300 hover:text-white transition-colors"
                                            >
                                                {platform.platform.name}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Additional info and purchase */}
                            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 shadow-2xl space-y-6">
                                {data.developers.length > 0 && (
                                    <div>
                                        <h2 className="text-xl font-bold text-white mb-3">Developers</h2>
                                        <ul className="flex flex-wrap gap-2">
                                            {data.developers.map((dev) => (
                                                <li 
                                                    key={dev.name}
                                                    className="bg-gradient-to-r from-indigo-500/20 to-pink-500/20 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10 text-sm text-slate-300 hover:text-white transition-colors"
                                                >
                                                    {dev.name}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {data.publishers.length > 0 && (
                                    <div>
                                        <h2 className="text-xl font-bold text-white mb-3">Publishers</h2>
                                        <ul className="flex flex-wrap gap-2">
                                            {data.publishers.map((pub) => (
                                                <li 
                                                    key={pub.name}
                                                    className="bg-gradient-to-r from-orange-500/20 to-yellow-500/20 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10 text-sm text-slate-300 hover:text-white transition-colors"
                                                >
                                                    {pub.name}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                <div className="pt-4">
                                    <button 
                                        className="main-button w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center group"
                                        onClick={() =>
                                            window.open(
                                              `https://google.com/search?q=where+to+buy+${currentGame.name}`,
                                              "_blank"
                                            )
                                          }
                                    >
                                        <span className="mr-2">Purchase Game</span>
                                        <img
                                            src="./shopping-cart.svg"
                                            className="w-5 h-5 transition-transform group-hover:scale-110"
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Additional sections if available */}
                        {data.website && (
                            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 shadow-2xl">
                                <h2 className="text-xl font-bold text-white mb-4 border-b border-white/10 pb-2">
                                    Official Website
                                </h2>
                                <a 
                                    href={data.website} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-blue-400 hover:text-blue-300 transition-colors flex items-center"
                                >
                                    <span>Visit Website</span>
                                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                </a>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-8 -right-8 w-16 h-16 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-8 -left-8 w-12 h-12 bg-gradient-to-r from-pink-500/10 to-orange-500/10 rounded-full blur-xl" />
        </div>
    );
}