import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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

  return (
    <Router>
      <Header />
      <div className="App">
        <Routes>
          <Route path="/" element={
            <>
              <form className="search-bar" onSubmit={handleSearch}>
                <input type="text" name="search" placeholder="Search books..." />
                <button type="submit">Search</button>
              </form>
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
            />
          } />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
