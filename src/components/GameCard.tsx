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
    return(
        <div className="flex-col relative" onClick={onClick}>
            <img
                src={background_image}
                alt={name}
                loading="lazy"
                className="w-full h-64 object-cover rounded-lg shadow-lg"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 rounded-b-lg">
                <h2 className="text-white text-xl font-semibold p-2">{name}</h2>
                { playtime > 0 && (
                    <div>
                        <img
                            src="./clock-fill.svg"
                            className="text-gray-300 max-w-xs max-h-xs" 
                        />
                        <p className="text-gray-300 text-sm whitespace-nowrap">
                            {playtime} {playtime === 1 ? "Hour" : "Hours"}
                        </p>
                    </div>
                )}
                <div className="flex flex-row flex-wrap gap-2 m-2 mt-auto">
                    {genres.map((genre) => (
                        <span
                            key={genre.id}
                            className="genre-pill"
                        >
                            {genre.name}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}