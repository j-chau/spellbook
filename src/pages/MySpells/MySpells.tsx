import React, { useEffect, useState } from 'react';
import SpellList from '../../components/SpellList';
import {
  overwrite as overwriteLS,
  read as readLS,
} from '../../utils/LocalStorage';
import { BASE_URL, MY_SPELLS_LS_KEY } from '../../constants';
import { CardType } from '../../types';
import styles from './MySpells.module.css';

const MySpells = () => {
  const cardData = readLS(MY_SPELLS_LS_KEY);

  const [myCards, setMyCards] = useState<CardType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getSavedData = async (cardList: string[]) => {
      try {
        const newCardList: string[] = [];
        const res = await Promise.all<CardType>(
          cardList.map((card) =>
            fetch(BASE_URL + card).then((response) => {
              if (response.status === 200) {
                newCardList.push(card);
              }
              return response.json();
            }),
          ),
        );
        if (cardData && cardData.length !== newCardList.length) {
          overwriteLS(MY_SPELLS_LS_KEY, newCardList);
        }

        setMyCards(res.filter((card) => card.slug));
        setIsLoading(false);
      } catch (err) {
        console.error('Error: ', err);
      }
    };

    if (cardData) {
      getSavedData(cardData);
    }
  }, [cardData]);

  return (
    <div className={styles.main}>
      <h2>My Spells</h2>
      <SpellList cards={myCards} isLoading={isLoading} hideCardOnRemove />
    </div>
  );
};

export default MySpells;
