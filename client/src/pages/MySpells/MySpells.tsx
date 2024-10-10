import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import SpellList from '../../components/SpellList';
import { CardType } from '../../types/types';
import styles from './MySpells.module.css';
import * as SavedSpellsAPI from '../../utils/SavedSpellsAPI';

const MySpells = () => {
  const [myCards, setMyCards] = useState<CardType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    const getSavedData = async () => {
      const data = await SavedSpellsAPI.getAllSpells({});
      setMyCards(data);
      setIsLoading(false);
    };
    getSavedData();
  }, []);

  const handleOpenWarning = () => setShowWarning(true);
  const handleCloseWarning = () => setShowWarning(false);

  const handleClearAll = async () => {
    await SavedSpellsAPI.removeAllSpells({
      onSuccess: () => {
        setShowWarning(false);
        setMyCards([]);
      },
    });
  };

  return (
    <div className={styles.main}>
      <h2 className={styles.title}>My Spells</h2>
      <SpellList
        cards={myCards}
        addedCards={myCards}
        isLoading={isLoading}
        hideCardOnRemove
      />
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
