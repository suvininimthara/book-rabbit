import React, { useState } from 'react';
import { FaHeart, FaStar } from 'react-icons/fa';
import './BookCard.css';

interface BookCardProps {
  title: string;
  imageUrl: string;
  rating: number;
  reviews: number;
  author: string;
  year: number;
  handleRating: (bookId: string, rate: number) => void;
}

const BookCard: React.FC<BookCardProps> = ({ title, imageUrl, rating, author, year }) => {
  const [inWishlist, setInWishlist] = useState(false);

  const toggleWishlist = () => {
    setInWishlist(!inWishlist);
  };

  return (
    <div className="book-card">
      <img src={imageUrl} alt={title} className="book-image" />
      <hr/>
      <div className="book-details">
      <div className="book-title">{title}</div>
      <div className="book-author">{author}</div>
        
        </div>
      </div>
    
  );
};

export default BookCard;
