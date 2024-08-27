import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Define an interface for the book data
interface Book {
  volumeInfo: {
    title: string;
    authors?: string[];
    publisher?: string;
    publishedDate?: string;
    description?: string;
  };
}

const App: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('https://www.googleapis.com/books/v1/volumes?q=subject:fiction');
        setBooks(response.data.items || []);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div>
      <h1>Book List</h1>
      <ul>
        {books.map((book, index) => (
          <li key={index} style={{ marginBottom: '20px' }}>
            <h2>{book.volumeInfo.title}</h2>
            {book.volumeInfo.authors && <p><strong>Authors:</strong> {book.volumeInfo.authors.join(', ')}</p>}
            {book.volumeInfo.publisher && <p><strong>Publisher:</strong> {book.volumeInfo.publisher}</p>}
            {book.volumeInfo.publishedDate && <p><strong>Published Date:</strong> {book.volumeInfo.publishedDate}</p>}
            {book.volumeInfo.description && <p><strong>Description:</strong> {book.volumeInfo.description}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
