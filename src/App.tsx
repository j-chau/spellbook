import React, { useState } from 'react';
import './App.css';
import Search from './components/Search';
import SpellList from './components/SpellList';
import type { CardType } from './components/types';
import { ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme({
  typography: {
    htmlFontSize: 10,
  },
});

function App() {
  const [cardData, setCardData] = useState<Array<CardType>>([]);
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <h1>SpellBook</h1>
        <Search setCardData={setCardData} />
        <SpellList cards={cardData} />
      </div>
    </ThemeProvider>
  );
}

export default App;
