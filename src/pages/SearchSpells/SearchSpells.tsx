import React, { useState } from 'react';
import Search from './components/Search';
import SpellList from '../../components/SpellList';
import { CardType } from '../../types';

const SearchSpells = () => {
  const [cardData, setCardData] = useState<Array<CardType>>([]);

  return (
    <div>
      <Search setCardData={setCardData} />
      <SpellList cards={cardData} />
    </div>
  );
};

export default SearchSpells;
