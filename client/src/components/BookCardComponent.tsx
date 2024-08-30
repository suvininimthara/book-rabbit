import React, { useState } from 'react';
import { Book } from '../models/bookModel';
import './BookCard.css';


const BookCard: React.FC<Book> = ({ title, imageUrl, author }) => {
  const [inWishlist, setInWishlist] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
