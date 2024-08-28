import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookCard from '../BookCardComponent';
import { Book } from '../../models/bookModel';
import './RecentBook.css';

const RecentBooks = () => {
    const [books, setBooks] = useState<Book[]>([]);

    useEffect(() => {
        async function fetchRecentBooks() {
            try {
                const response = await axios.get('/api/books/recent');
                setBooks(response.data);
            } catch (error) {
                console.error('Failed to fetch recent books:', error);
            }
        }
        fetchRecentBooks();
    }, []);

    return (
        <section className="recent-books">
            <h2>Recent Books</h2>
            <h6>Recently added books to our library</h6>
            <div className="book-list">
                {books.map(book => (
                    <BookCard
                        key={book._id}
                        title={book.title}
                        imageUrl={book.imageUrl}
                        _id={book._id}
                        author={book.author}
                        genre={book.genre}
                        description={book.description}
                        date={book.date}
                        createdAt={book.createdAt}
                        year={book.year}
                    />
                ))}
            </div>
        </section>
    );
};

export default RecentBooks;
