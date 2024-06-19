import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import SpellList from '../../components/SpellList';
import {
  clear as clearLS,
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
  const [showWarning, setShowWarning] = useState(false);

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
    } else {
      setIsLoading(false);
    }
  }, [cardData]);

  const handleOpenWarning = () => setShowWarning(true);
  const handleCloseWarning = () => setShowWarning(false);

  const handleClearAll = () => {
    clearLS(MY_SPELLS_LS_KEY);
    setShowWarning(false);
    setMyCards([]);
  };

  return (
    <div className={styles.main}>
      <h2 className={styles.title}>My Spells</h2>
      <SpellList cards={myCards} isLoading={isLoading} hideCardOnRemove />
      {myCards.length > 0 ? (
        <Button
          color="secondary"
          startIcon={<CloseIcon />}
          onClick={handleOpenWarning}
        >
          Clear all
        </Button>
      ) : null}

      <Dialog open={showWarning} onClose={handleCloseWarning}>
        <DialogTitle>
          Are you sure you want to clear all your spells?
        </DialogTitle>
        <DialogContent>
          You are about to remove all your saved spells. This action cannot be
          undone.
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseWarning}>Cancel</Button>
          <Button color="error" variant="outlined" onClick={handleClearAll}>
            Continue
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MySpells;
