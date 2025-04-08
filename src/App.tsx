import React from 'react';
import { Routes, Route } from 'react-router-dom';
import JokePage from './pages/JokePage';
import InsultPage from './pages/InsultPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<JokePage />} />
      <Route path="/insult" element={<InsultPage />} />
    </Routes>
  );
}

export default App;
