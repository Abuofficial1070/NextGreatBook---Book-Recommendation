import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-primary/10 p-2 rounded-xl group-hover:bg-primary/20 transition-colors">
            <BookOpen className="text-primary" size={24} />
          </div>
          <span className="font-bold text-xl tracking-tight text-gray-900">NextGreatBook</span>
        </Link>
        
        <div className="hidden md:flex gap-6 text-sm font-medium text-gray-600">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <a href="#" className="hover:text-primary transition-colors">Categories</a>
          <a href="#" className="hover:text-primary transition-colors">Bestsellers</a>
        </div>
      </div>
    </nav>
  );
}
