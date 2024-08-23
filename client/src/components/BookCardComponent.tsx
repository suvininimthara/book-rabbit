import React from 'react';

interface BookCardProps {
    title: string;
    author: string;
    rating: number;
}

const BookCardComponent: React.FC<BookCardProps> = ({ title, author, rating }) => {
    return (
        <div className="card">
            <img src="placeholder.jpg" className="card-img-top" alt={title} />
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">by {author}</p>
                <p className="card-text">Rating: {rating} ⭐</p>
            </div>
        </div>
    );
};

export default BookCardComponent;
