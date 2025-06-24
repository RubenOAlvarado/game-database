import type { ChangeEvent } from 'react';

type SearchProps = {
  query: string;
  onChange: (value: string) => void;
};

const Search = ({ query, onChange }: SearchProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="relative w-full group">
      {/* Search icon with gradient effect */}
      <div className="absolute inset-y-0 left-0 flex items-center pl-6 pointer-events-none">
        <svg 
          className="w-5 h-5 text-indigo-400 group-hover:text-purple-400 transition-colors duration-300" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
          />
        </svg>
      </div>
      
      {/* Input field with glassmorphism effect */}
      <input
        type="text"
        placeholder="Search for a game..."
        value={query}
        onChange={handleChange}
        className="w-full py-5 pl-16 pr-6 text-lg text-white placeholder-slate-400 bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl shadow-2xl transition-all duration-500 focus:border-indigo-400/50 focus:ring-2 focus:ring-indigo-400/20 focus:bg-white/10 group-hover:border-white/20 outline-none"
      />
      
      {/* Decorative elements */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
      <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
};

export default Search;