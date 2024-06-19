import React, { useState } from 'react';
import Search from './components/Search';
import SpellList from '../../components/SpellList';
import { CardType } from '../../types';

const SearchSpells = () => {
  const [cardData, setCardData] = useState<Array<CardType>>([]);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div>
      <Search setCardData={setCardData} setIsLoading={setIsLoading} />
      <SpellList cards={cardData} isLoading={isLoading} />
    </div>
  );
};

export default SearchSpells;
