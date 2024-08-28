import React from 'react';
import { Link, useParams } from 'react-router-dom';
import './BookComponent.css';

interface Book {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    description?: string;
    imageLinks?: {
      thumbnail?: string;
    };
    averageRating?: number;
    previewLink?: string;
  };
}

interface BookListProps {
  books: Book[];
  wishlist: Book[];
  toggleWishlistView: () => void;
  wishlistView: boolean;
}

const StarRating: React.FC<{ rating?: number }> = ({ rating }) => {
  const stars = Math.round(rating || 0);
  return (
    <div className="star-rating">
      {[...Array(5)].map((_, index) => (
        <span key={index} className={index < stars ? 'filled' : ''}>
          ★
        </span>
      ))}
    </div>
  );
};

const BookList: React.FC<BookListProps> = ({ books, wishlist, toggleWishlistView, wishlistView }) => {
  const displayBooks = wishlistView ? wishlist : books;

  return (
    <div>
      <ul className="book-list">
        {displayBooks.length === 0 ? (
          <p>No books available in wishlist</p>
        ) : (
          displayBooks.map((book) => (
            <li key={book.id} className="book-list-item">
              <Link to={`/book/${book.id}`}>
                {book.volumeInfo.imageLinks?.thumbnail && (
                  <img
                    src={book.volumeInfo.imageLinks.thumbnail}
                    alt={`Cover of ${book.volumeInfo.title}`}
                    className="book-image"
                  />
                )}
              </Link>
              <div className="book-info">
                <h2 className="book-title">
                  <Link to={`/book/${book.id}`}>{book.volumeInfo.title}</Link>
                </h2>
                {book.volumeInfo.averageRating && (
                  <StarRating rating={book.volumeInfo.averageRating} />
                )}
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

interface BookDetailProps {
  books: Book[];
  wishlist: Book[];
  addToWishlist: (book: Book) => void;
  removeFromWishlist: (bookId: string) => void;
  toggleWishlistView: () => void;
}

const BookDetail: React.FC<BookDetailProps> = ({ books, wishlist, addToWishlist, removeFromWishlist, toggleWishlistView }) => {
  const { id } = useParams<{ id: string }>();
  console.log('Current Book ID:', id);
  console.log('Available Books:', books);

  const book = books.find((book) => book.id === id);

  if (!book) {
    return <p>Book not found</p>;
  }

  const isInWishlist = wishlist.some((wishlistBook) => wishlistBook.id === id);

  const handleWishlistToggle = () => {
    if (isInWishlist) {
      if (window.confirm("Do you want to remove from wishlist?")) {
        removeFromWishlist(book.id);
      }
    } else {
      if (window.confirm("Do you want to add to wishlist?")) {
        addToWishlist(book);
      }
    }
  };

  return (
    <div className="book-detail">
      <div className="book-detail-content">
        <div className="book-detail-image">
          {book.volumeInfo.imageLinks?.thumbnail && (
            <img
              src={book.volumeInfo.imageLinks.thumbnail}
              alt={`Cover of ${book.volumeInfo.title}`}
              className="book-detail-image-img"
              onClick={() => window.location.href = `/book/${book.id}`} // Redirect to book detail on image click
            />
          )}
        </div>
        <div className="book-detail-text">
          <h2>{book.volumeInfo.title}</h2>
          {book.volumeInfo.authors && (
            <p><strong>Authors:</strong> {book.volumeInfo.authors.join(', ')}</p>
          )}
          {book.volumeInfo.description && (
            <p><strong>Description:</strong> {book.volumeInfo.description}</p>
          )}
          {book.volumeInfo.averageRating && (
            <div>
              <strong>Rating:</strong> <StarRating rating={book.volumeInfo.averageRating} />
            </div>
          )}
          <div className="book-detail-actions">
            <a href={book.volumeInfo.previewLink} className="read-button">
              Read
            </a>
            <span
              className={`heart-symbol ${isInWishlist ? 'heart-red' : 'heart-yellow'}`}
              onClick={handleWishlistToggle}
            >
              ♥
            </span>
            <Link to="/" className="back-to-list">Back to Book List</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export { BookList, BookDetail };