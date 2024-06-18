import React from 'react';
import './App.css';
import { ThemeProvider, createTheme } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SearchSpells from './pages/SearchSpells';
import MySpells from './pages/MySpells';

const theme = createTheme({
  typography: {
    htmlFontSize: 10,
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <h1>SpellBook</h1>

        <BrowserRouter>
          <Routes>
            <Route path="/search" Component={SearchSpells}></Route>
            <Route path="/" Component={MySpells}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
