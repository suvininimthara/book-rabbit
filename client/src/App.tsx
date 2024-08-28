import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BooksPage from './pages/BooksPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';
import SignUpModal from './components/SignUpModal';
import LoginModal from './components/LoginModal';
import AddBook from './components/AddBook';
import BlogListPage from './pages/BlogList'; 
import AddBlogPage from './components/AddBlog';
import ContactPage from './pages/ContactPage';
import RecentBooks from './components/home/RecentBookSection';
import { BookDetail } from './components/BookComponent';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';
import { User } from './models/userModel';
import Header from './components/header/HeaderComponent';
import Footer from './components/FooterComponent';
import * as UsersApi from "./network/users_api";
import { Container } from 'react-bootstrap';
import axios from 'axios';

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

function App() {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [books, setBooks] = useState<Book[]>([]);
  const [wishlist, setWishlist] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true); // Add loading state

  const addToWishlist = (book: Book) => {
    setWishlist([...wishlist, book]);
  };

  const removeFromWishlist = (bookId: string) => {
    setWishlist(wishlist.filter(book => book.id !== bookId));
  };

  const toggleWishlistView = () => {
    // Logic for toggling wishlist view (if needed)
  };

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('/api/book/:id');
        console.log('Fetched Books:', response.data);
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  useEffect(() => {
    async function fetchLoggedInUser() {
      try {
        const user = await UsersApi.getLoggedInUser();
        console.log('Logged in user:', user);
        setLoggedInUser(user);
      } catch (error) {
        console.error(error);
      }
    }
    fetchLoggedInUser();
  }, []);

  const handleSignUpClick = () => setShowSignUpModal(true);
  const handleLoginClick = () => setShowLoginModal(true);

  return (
    <BrowserRouter>
      <div id="root">
        <Header
          loggedInUser={loggedInUser}
          onLoginClicked={() => setShowLoginModal(true)}
          onSignUpClicked={() => setShowSignUpModal(true)}
          onLogoutSuccessful={() => setLoggedInUser(null)}
        />
        <main>
          <Container>
            {loading ? (
              <p>Loading...</p> // Show loading state if true
            ) : (
              <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/book' element={<BooksPage />} />
                <Route path='/profile/:userId' element={<ProfilePage />} />
                <Route path="/add-book" element={<AddBook />} />
                <Route path="/blogs" element={<BlogListPage />} />
                <Route path="/add-blog" element={<AddBlogPage />} />
                <Route path='/contact' element={<ContactPage />} />
                <Route path="/recent-books" element={<RecentBooks />} />
                <Route path='/book/:id' element={<BookDetail 
                    books={books}
                    wishlist={wishlist}
                    addToWishlist={addToWishlist}
                    removeFromWishlist={removeFromWishlist}
                    toggleWishlistView={toggleWishlistView} />} />
                <Route path='/*' element={<NotFoundPage />} />
              </Routes>
            )}
          </Container>
          {showSignUpModal &&
            <SignUpModal
              onDismiss={() => setShowSignUpModal(false)}
              onSignUpSuccessful={(user) => {
                setLoggedInUser(user);
                setShowSignUpModal(false);
              }}
              onLoginClick={() => {
                setShowSignUpModal(false);
                setShowLoginModal(true);
              }}
            />
          }
          {showLoginModal &&
            <LoginModal
              onDismiss={() => setShowLoginModal(false)}
              onLoginSuccessful={(user) => {
                setLoggedInUser(user);
                setShowLoginModal(false);
              }}
              onSignUpClick={() => {
                setShowLoginModal(false);
                setShowSignUpModal(true);
              }}
            />
          }
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
