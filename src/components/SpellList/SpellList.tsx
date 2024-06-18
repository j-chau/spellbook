import React from 'react';
import SpellCard from '../SpellCard';
import { CardType } from '../types';
import styles from './SpellList.module.css';

type PropsType = {
  cards: Array<CardType>;
};

const SpellList = ({ cards }: PropsType) => {
  return (
    <div className={styles.main}>
      <ul className={styles.list}>
        {cards.map((card) => (
          <li key={card.slug} className={styles.item}>
            <SpellCard card={card} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SpellList;
