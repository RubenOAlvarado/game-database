const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT || 'http://localhost:3000';

export async function fetchGames({ query }: { query: string }){
  const response = await fetch(`${API_ENDPOINT}/games?search=${encodeURIComponent(query)}`,);
  if (!response.ok) {
    throw new Error(`Error fetching data: ${response.statusText}`);
  }
  return response.json();
}