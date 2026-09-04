import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

export default function SearchBar({ initialQuery = '' }) {
  const [query, setQuery] = useState(initialQuery);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full max-w-2xl mx-auto">
      <div className="relative flex items-center w-full h-14 rounded-full focus-within:shadow-lg bg-white overflow-hidden border border-gray-200 transition-shadow">
        <div className="grid place-items-center h-full w-12 text-gray-400">
          <Search size={20} />
        </div>

        <input
          className="peer h-full w-full outline-none text-sm text-gray-700 pr-2 bg-transparent"
          type="text"
          id="search"
          placeholder="Search for a book, author, or topic..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        
        <button 
          type="submit" 
          className="bg-primary text-white h-full px-6 font-medium hover:bg-blue-600 transition-colors hidden sm:block"
        >
          Search
        </button>
      </div>
    </form>
  );
}
