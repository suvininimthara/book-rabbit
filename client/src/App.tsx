import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { BookList, BookDetail } from './book/Book';
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

interface GoogleBooksResponse {
  items: Book[];
}

const App: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [wishlist, setWishlist] = useState<Book[]>([]);
  const [wishlistView, setWishlistView] = useState<boolean>(false);

  const fetchBooks = async (query: string) => {
    setLoading(true);
    try {
      const response = await axios.get<GoogleBooksResponse>(`https://www.googleapis.com/books/v1/volumes?q=${query}&key=AIzaSyDOOdwKy8sLapVZNo8LSPOPoPrxK-MEDd4`);
      setBooks(response.data.items || []);
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks('subject:fiction');
  }, []);

  const handleSearch = () => {
    if (searchTerm.trim()) {
      setIsSearching(true);
      fetchBooks(searchTerm);
    }
  };

  const handleReset = () => {
    setIsSearching(false);
    fetchBooks('subject:fiction');
    setSearchTerm('');
  };

  const addToWishlist = (book: Book) => {
    setWishlist([...wishlist, book]);
  };

  const removeFromWishlist = (bookId: string) => {
    setWishlist(wishlist.filter((book) => book.id !== bookId));
  };

  const toggleWishlistView = () => {
    setWishlistView(!wishlistView);
  };

  return (
    <Router>
      <div>
        <h1>Book Store</h1>
        <div className="search-bar">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for books..."
          />
          <button onClick={handleSearch} disabled={loading}>
            {loading ? 'Searching...' : 'Search'}
          </button>
          {isSearching && (
            <button onClick={handleReset} disabled={loading}>
              Reset
            </button>
          )}
        </div>
        <Routes>
          <Route
            path="/"
            element={
              <BookList
                books={wishlistView ? wishlist : books}
                wishlist={wishlist}
              />
            }
          />
          <Route
            path="/book/:id"
            element={
              <BookDetail
                books={books}
                wishlist={wishlist}
                addToWishlist={addToWishlist}
                removeFromWishlist={removeFromWishlist}
                toggleWishlistView={toggleWishlistView}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
