import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './BookPage.css';
import BookCard from '../components/BookCardComponent';

interface Book {
    _id: string;
    title: string;
    author: string;
    genre: string;
    rating: number;
    description: string;
    imageUrl: string;
    reviews: number;  // Add a reviews field if it’s not in your Book model.
}

const BookPage = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchBooks() {
            try {
                const response = await axios.get('/api/books');
                if (response.data) {
                    setBooks(response.data);
                } else {
                    setError('No books found.');
                }
            } catch (error: any) {
                console.error('Error fetching books:', error.message);
                setError('Failed to fetch books. Please try again.');
            } finally {
                setLoading(false);
            }
        }
        fetchBooks();
    }, []);

    if (loading) {
        return <p>Loading book details...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="book-page">
            <h2>Books</h2>
            <div className="book-list">
            {books.map(book => (
            <BookCard
                key={book._id}
                title={book.title}
                imageUrl={book.imageUrl}
                rating={book.rating}
                reviews={book.reviews || 0}
                author={book.author}  // Pass author to BookCard
            />
        ))}
            </div>
        </div>
    );
};

export default BookPage;
