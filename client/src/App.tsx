import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button } from 'react-bootstrap';

function App() {
  const [clickcount, setCount] = useState(0);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          subscribe to <code>src/App.tsx</code> and save to reload.
        </p>
          <Button onClick={() => setCount(clickcount + 1)}>
            Click {clickcount} me
          </Button> 
      </header>
    </div>
  );
}

export default App;
