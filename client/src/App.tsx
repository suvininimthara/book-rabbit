import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SignUpModal from './components/SignUpModal';
import LoginModal from './components/LoginModal';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';
import { User } from './models/userModel';
import Header from './components/header/HeaderComponent';
import Footer from './components/FooterComponent';


const App: React.FC = () => {
  return (
    <Router>
      <Header loggedInUser={null} onSignUpClicked={function (): void {
      } } onLoginClicked={function (): void {
      } } onLogoutSuccessful={function (): void {
      } } />
        

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpModal onDismiss={function (): void {
          throw new Error('Function not implemented.');
        } } onSignUpSuccessful={function (user: User): void {
          throw new Error('Function not implemented.');
        } } />} />
        <Route path="/login" element={<LoginModal onDismiss={function (): void {
          throw new Error('Function not implemented.');
        } } onLoginSuccessful={function (user: User): void {
          throw new Error('Function not implemented.');
        } } />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
