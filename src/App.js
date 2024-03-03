import React from 'react';
import { BrowserRouter, Routes, Route}
    from 'react-router-dom';
import Home from './pages/Home';

import Watch from './pages/Watch';

import "./styles/variables.css";
import "./AppStyle.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route exact path='/' element={<Home />} />
        <Route exact path='watch' element={<Watch />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
