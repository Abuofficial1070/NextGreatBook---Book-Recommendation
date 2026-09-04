import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import BookCard from '../components/BookCard';
import { searchBooks } from '../api';

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchResults() {
      if (!query) return;
      setLoading(true);
      const data = await searchBooks(query, 0, 20);
      setResults(data);
      setLoading(false);
    }
    fetchResults();
  }, [query]);

  return (
    <div className="flex flex-col w-full max-w-6xl mx-auto">
      <div className="mb-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <SearchBar initialQuery={query.replace('subject:', '')} />
      </div>

      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">
          Search Results for "{query.replace('subject:', '')}"
        </h2>
        <span className="text-gray-500 text-sm font-medium">
          {results.length} {results.length === 1 ? 'result' : 'results'}
        </span>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : results.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {results.map(book => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-2">No books found</h3>
          <p className="text-gray-500">We couldn't find any books matching your search. Try different keywords.</p>
        </div>
      )}
    </div>
  );
}
