import React from 'react';
import { BrowserRouter, Routes, Route}
    from 'react-router-dom';
import Home from './pages/Home';
import "./styles/variables.css";
import "./AppStyle.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route exact path='/' element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
