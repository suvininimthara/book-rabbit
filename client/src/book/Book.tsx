import React from 'react';
import { Link, useParams } from 'react-router-dom';
import './App.css';

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

const BookList: React.FC<{ books: Book[], wishlist: Book[], toggleWishlistView: () => void }> = ({ books, wishlist, toggleWishlistView }) => (
  <div>
    <ul className="book-list">
      {books.map((book) => (
        <li key={book.id} className="book-list-item">
          {book.volumeInfo.imageLinks?.thumbnail && (
            <img
              src={book.volumeInfo.imageLinks.thumbnail}
              alt={`Cover of ${book.volumeInfo.title}`}
              className="book-image"
            />
          )}
          <div className="book-info">
            <h2 className="book-title">
              <Link to={`/book/${book.id}`}>{book.volumeInfo.title}</Link>
            </h2>
            {book.volumeInfo.averageRating && (
              <StarRating rating={book.volumeInfo.averageRating} />
            )}
          </div>
        </li>
      ))}
    </ul>
  </div>
);

const BookDetail: React.FC<{
  books: Book[];
  wishlist: Book[];
  addToWishlist: (book: Book) => void;
  removeFromWishlist: (bookId: string) => void;
  toggleWishlistView: () => void;
  resetWishlistView: () => void; // Added prop to reset wishlist view
}> = ({ books, wishlist, addToWishlist, removeFromWishlist, toggleWishlistView, resetWishlistView }) => {
  const { id } = useParams<{ id: string }>();
  const book = books.find((book) => book.id === id);

  if (!book) {
    return <p>Book not found</p>;
  }

  const isInWishlist = wishlist.some((wishlistBook) => wishlistBook.id === id);

  const handleWishlistToggle = () => {
    if (isInWishlist) {
      removeFromWishlist(book.id);
    } else {
      addToWishlist(book);
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
          </div>
        </div>
      </div>
      <Link
        to="/"
        className="back-to-list"
        onClick={resetWishlistView} // Reset wishlist view when going back
      >
        Back to Book List
      </Link>
    </div>
  );
};

export { BookList, BookDetail };
