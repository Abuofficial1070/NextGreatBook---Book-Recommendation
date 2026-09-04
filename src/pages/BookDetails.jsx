import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getBookById, getRecommendations } from '../api';
import EbookOptions from '../components/EbookOptions';
import BookCard from '../components/BookCard';
import { Star, Calendar, Book as BookIcon, Globe, Tag } from 'lucide-react';

export default function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      window.scrollTo(0,0);
      const bookData = await getBookById(id);
      setBook(bookData);

      if (bookData?.volumeInfo) {
        const recs = await getRecommendations(
          bookData.volumeInfo.categories, 
          bookData.volumeInfo.authors?.[0]
        );
        // filter out the current book
        setRecommendations(recs.filter(r => r.id !== id).slice(0, 5));
      }
      setLoading(false);
    }
    loadData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!book || !book.volumeInfo) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Book Not Found</h2>
        <p className="text-gray-500">We couldn't find the details for this book.</p>
      </div>
    );
  }

  const {
    title,
    authors,
    publisher,
    publishedDate,
    description,
    industryIdentifiers,
    pageCount,
    categories,
    averageRating,
    imageLinks,
    language
  } = book.volumeInfo;

  const coverUrl = imageLinks?.thumbnail?.replace('http:', 'https:') || 'https://via.placeholder.com/300x450?text=No+Cover';
  const isbn = industryIdentifiers?.find(id => id.type === 'ISBN_13' || id.type === 'ISBN_10')?.identifier;

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-12 pb-12">
      
      {/* Top Section */}
      <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
        {/* Cover */}
        <div className="w-full md:w-1/3 lg:w-1/4 flex-shrink-0">
          <div className="sticky top-24">
            <img 
              src={coverUrl} 
              alt={title} 
              className="w-full rounded-2xl shadow-2xl object-cover aspect-[2/3] border border-gray-100"
            />
          </div>
        </div>

        {/* Details */}
        <div className="flex flex-col flex-grow">
          {categories && (
            <div className="flex flex-wrap gap-2 mb-4">
              {categories.map(cat => (
                <span key={cat} className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full uppercase tracking-wider">
                  {cat}
                </span>
              ))}
            </div>
          )}
          
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-2">
            {title}
          </h1>
          <h2 className="text-xl md:text-2xl text-gray-600 font-medium mb-6">
            by {authors ? authors.join(', ') : 'Unknown Author'}
          </h2>

          <div className="flex flex-wrap items-center gap-6 mb-8 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-yellow-50 flex items-center justify-center">
                <Star className="text-yellow-500 fill-yellow-500" size={20} />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Rating</p>
                <p className="font-bold text-gray-900">{averageRating || 'N/A'}</p>
              </div>
            </div>
            
            <div className="h-8 w-px bg-gray-200 hidden sm:block"></div>

            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                <BookIcon className="text-blue-500" size={20} />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Pages</p>
                <p className="font-bold text-gray-900">{pageCount || 'N/A'}</p>
              </div>
            </div>

            <div className="h-8 w-px bg-gray-200 hidden sm:block"></div>

            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
                <Calendar className="text-green-500" size={20} />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Published</p>
                <p className="font-bold text-gray-900">{publishedDate?.substring(0,4) || 'N/A'}</p>
              </div>
            </div>
          </div>

          <div className="mb-10">
            <h3 className="text-xl font-bold text-gray-900 mb-4">About the Book</h3>
            <div 
              className="text-gray-600 leading-relaxed text-lg [&>b]:text-gray-900 [&>br]:mb-4"
              dangerouslySetInnerHTML={{ __html: description || 'No description available.' }} 
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium text-gray-500">Publisher</span>
              <span className="font-semibold text-gray-900">{publisher || 'Unknown'}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium text-gray-500">ISBN</span>
              <span className="font-semibold text-gray-900">{isbn || 'N/A'}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium text-gray-500">Language</span>
              <span className="font-semibold text-gray-900 uppercase">{language || 'N/A'}</span>
            </div>
          </div>
        </div>
      </div>

      <hr className="border-gray-200" />

      {/* Bottom Section - Columns */}
      <div className="flex flex-col lg:flex-row gap-12">
        
        {/* eBook Options */}
        <div className="w-full lg:w-1/2">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Available eBook Options</h3>
          <EbookOptions accessInfo={book.accessInfo} saleInfo={book.saleInfo} />
        </div>

        {/* Recommendations */}
        <div className="w-full lg:w-1/2">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">You May Also Like</h3>
          {recommendations.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {recommendations.map(rec => (
                <BookCard key={rec.id} book={rec} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No recommendations available.</p>
          )}
        </div>

      </div>

    </div>
  );
}
