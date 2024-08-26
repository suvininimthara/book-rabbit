import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
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
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const fetchBooks = async (query: string) => {
    try {
      const response = await axios.get<GoogleBooksResponse>(`https://www.googleapis.com/books/v1/volumes?q=${query}&AIzaSyDOOdwKy8sLapVZNo8LSPOPoPrxK-MEDd4`);
      setBooks(response.data.items || []);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  useEffect(() => {
    if (isSearching) {
      fetchBooks(searchTerm);
    } else {
      fetchBooks('subject:fiction');
    }
  }, [searchTerm, isSearching]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSearching(true);
    setSearchTerm((e.target as HTMLFormElement).search.value);
  };

  const LocationDisplay: React.FC = () => {
    const location = useLocation();
    const isBookList = location.pathname === '/';
    const isWishlist = location.pathname === '/wishlist';

    if (isBookList) {
      return (
        <div className="search-container">
          <form className="search-bar" onSubmit={handleSearch}>
            <input type="text" name="search" placeholder="Search books..." />
            <button type="submit">Search</button>
          </form>
        </div>
      );
    } else if (isWishlist) {
      return null; 
    } else {
      return null; 
      }
  };

  return (
    <Router>
      <div className="App">
        <div className="main-content">
          <LocationDisplay />
          <Routes>
            <Route path="/" element={<div>Book List Component Here</div>} />
            <Route path="/book/:id" element={<div>Book Detail Component Here</div>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
