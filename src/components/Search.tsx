type SearchProps = {
    query: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Search({ query, onChange }: SearchProps) {
    return (
        <div className="w-full mb-4">
            <div className="flex my-2 rounded-md shadow-xl bg-gray-800 p-4">
                <img src="./search.svg" alt="Search Icon" className="relative top-0.5 h-5 w-5" />
                <input
                    type="text"
                    placeholder="Search a game..."
                    value={query}
                    onChange={onChange}
                    className="w-full focus:outline-none ml-2 text-gray-300"
                />
            </div>
        </div>
    );
}