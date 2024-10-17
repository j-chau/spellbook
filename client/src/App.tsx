import React from 'react';
import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SearchSpells from './pages/SearchSpells';
import MySpells from './pages/MySpells';
import Navigation from './components/Navigation';

const theme = createTheme({
  typography: {
    htmlFontSize: 10,
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <BrowserRouter>
          <div className="Header">
            <h1 className="Title">
              Spell<span className="Title--subheader">Book</span>
            </h1>
            <Navigation />
          </div>

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
