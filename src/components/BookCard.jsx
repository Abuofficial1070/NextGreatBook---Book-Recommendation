import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';

export default function BookCard({ book }) {
  const id = book.id;
  const { title, authors, imageLinks, averageRating, categories } = book.volumeInfo;
  
  // High quality cover image or placeholder
  const coverUrl = imageLinks?.thumbnail?.replace('http:', 'https:') || 'https://via.placeholder.com/128x192?text=No+Cover';
  const author = authors ? authors[0] : 'Unknown Author';
  const category = categories ? categories[0] : '';

  return (
    <Link to={`/book/${id}`} className="group flex flex-col h-full bg-white rounded-2xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1">
      <div className="relative w-full aspect-[2/3] mb-4 overflow-hidden rounded-xl bg-gray-100">
        <img 
          src={coverUrl} 
          alt={title} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </div>
      
      <div className="flex flex-col flex-grow">
        {category && (
          <span className="text-xs font-semibold text-primary/80 uppercase tracking-wider mb-1">
            {category}
          </span>
        )}
        <h3 className="font-bold text-gray-900 leading-tight mb-1 line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-sm text-gray-500 mb-2 line-clamp-1">{author}</p>
        
        <div className="mt-auto flex items-center gap-1">
          <Star className="fill-yellow-400 text-yellow-400" size={16} />
          <span className="text-sm font-medium text-gray-700">
            {averageRating ? averageRating : 'New'}
          </span>
        </div>
      </div>
    </Link>
  );
}
