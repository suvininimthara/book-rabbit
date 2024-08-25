import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SignUpModal from './components/SignUpModal';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';
import { User } from './models/userModel';


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpModal onDismiss={function (): void {
          throw new Error('Function not implemented.');
        } } onSignUpSuccessful={function (user: User): void {
          throw new Error('Function not implemented.');
        } } />} />
      </Routes>
    </Router>
  );
};

export default App;
