import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate  } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BooksPage from './pages/BooksPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';
import SignUpModal from './components/SignUpModal';
import LoginModal from './components/LoginModal';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';
import { User } from './models/userModel';
import Header from './components/header/HeaderComponent';
import Footer from './components/FooterComponent';
import * as UsersApi from "./network/users_api";
import { Container } from 'react-bootstrap';

function App() {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);


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
      <div>
        <Header
          loggedInUser={loggedInUser}
          onLoginClicked={() => setShowLoginModal(true)}
          onSignUpClicked={() => setShowSignUpModal(true)}
          onLogoutSuccessful={() => setLoggedInUser(null)}
        />
        <Container>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/books' element={<BooksPage />} />
            <Route path='/profile/:userId' element={<ProfilePage />} />
            <Route path='/*' element={<NotFoundPage />} />
          </Routes>
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
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
