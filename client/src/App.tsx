import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import { BookList, BookDetail } from './book/Book';
import Header from './book/HeaderComponent';
import Footer from './book/FooterComponent';
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
      const response = await axios.get<GoogleBooksResponse>(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
      setBooks(response.data.items || []);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (isSearching) {
      fetchBooks(searchTerm);
    } else {
      fetchBooks('subject:fiction'); // Default query
    }
  }, [searchTerm, isSearching]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSearching(true);
    setSearchTerm((e.target as HTMLFormElement).search.value);
  };

  const addToWishlist = (book: Book) => {
    setWishlist((prevWishlist) => [...prevWishlist, book]);
  };

  const removeFromWishlist = (bookId: string) => {
    setWishlist((prevWishlist) => prevWishlist.filter((book) => book.id !== bookId));
  };

  const toggleWishlistView = () => {
    setWishlistView((prev) => !prev);
  };

  const resetWishlistView = () => {
    setWishlistView(false); // Reset wishlist view when going back to the book list
  };

  return (
    <Router>
      <Header />
      <div className="App">
        <div className="main-content">
          <Routes>
            <Route path="/" element={
              <>
                <div className="search-wishlist-container">
                  {!wishlistView && (
                    <form className="search-bar" onSubmit={handleSearch}>
                      <input type="text" name="search" placeholder="Search books..." />
                      <button type="submit">Search</button>
                    </form>
                  )}
                  <button className="wishlist-button" onClick={toggleWishlistView}>
                    {wishlistView ? 'Back to Book List' : 'View Wishlist'}
                  </button>
                </div>
                {wishlistView ? (
                  <BookList books={wishlist} wishlist={wishlist} toggleWishlistView={toggleWishlistView} />
                ) : (
                  <BookList books={books} wishlist={wishlist} toggleWishlistView={toggleWishlistView} />
                )}
              </>
            } />
            <Route path="/book/:id" element={
              <BookDetail
                books={books}
                wishlist={wishlist}
                addToWishlist={addToWishlist}
                removeFromWishlist={removeFromWishlist}
                toggleWishlistView={toggleWishlistView}
                resetWishlistView={resetWishlistView} // Pass the reset function to the BookDetail
              />
            } />
          </Routes>
        </div>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
