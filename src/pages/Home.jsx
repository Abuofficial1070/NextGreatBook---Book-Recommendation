import { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import BookCard from '../components/BookCard';
import { searchBooks } from '../api';

const CATEGORIES = [
  "Fiction", "Mystery", "Romance", "Science Fiction", 
  "Self Help", "Business", "Biography", "History", "Technology"
];

export default function Home() {
  const [popularBooks, setPopularBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadInitialBooks() {
      // Fetch some default popular books (e.g. by a known query or top rated)
      // Since Google Books API doesn't have a raw "trending" endpoint, we search for a broad topic
      const books = await searchBooks('subject:fiction', 0, 8);
      setPopularBooks(books);
      setLoading(false);
    }
    loadInitialBooks();
  }, []);

  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full py-16 md:py-24 flex flex-col items-center text-center px-4 bg-gradient-to-b from-primary/5 to-transparent rounded-3xl mb-12">
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-6 max-w-3xl">
          Find Your Next <span className="text-primary">Great Book</span>
        </h1>
        <p className="text-lg text-gray-600 mb-10 max-w-2xl">
          Discover millions of books, recommendations, and legal eBook sources tailored just for you.
        </p>
        <SearchBar />
      </section>

      {/* Categories */}
      <section className="w-full mb-16">
        <div className="flex flex-wrap justify-center gap-3">
          {CATEGORIES.map(cat => (
            <a 
              key={cat}
              href={`/search?q=subject:${cat}`}
              className="px-5 py-2.5 rounded-full bg-white border border-gray-200 text-sm font-medium text-gray-700 hover:border-primary hover:text-primary hover:shadow-md transition-all cursor-pointer"
            >
              {cat}
            </a>
          ))}
        </div>
      </section>

      {/* Popular Books */}
      <section className="w-full">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Trending Now</h2>
        </div>
        
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {popularBooks.map(book => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
