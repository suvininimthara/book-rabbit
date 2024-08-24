import React, { useState } from 'react';
import { FaHeart, FaStar } from 'react-icons/fa';
import './BookCard.css';

interface BookCardProps {
  title: string;
  imageUrl: string;
  rating: number;
  reviews: number;
}

const BookCard: React.FC<BookCardProps> = ({ title, imageUrl, rating, reviews }) => {
  const [inWishlist, setInWishlist] = useState(false);

  const toggleWishlist = () => {
    setInWishlist(!inWishlist);
  };

  return (
    <div className="book-card">
      <img src={imageUrl} alt={title} className="book-image" />
      <hr className='bg-light'/>
      <div className="book-title">{title}</div>
      <div className="book-rating">
        <div>
          {Array.from({ length: 5 }, (_, i) => (
            <FaStar key={i} color={i < rating ? "#20c997" : "#ccc"} className="fa-star" />
          ))}
          <span>({reviews})</span>
        </div>
        <FaHeart
          className={`wishlist-icon ${inWishlist ? 'red' : ''}`}
          onClick={toggleWishlist}
        />
      </div>
    </div>
  );
};

export default BookCard;
