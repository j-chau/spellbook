import React, { useEffect, useState } from 'react';
import Slide, { SlideProps } from '@mui/material/Slide';
import Snackbar from '@mui/material/Snackbar';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SpellCard from '../SpellCard';
import { CardType, ToastActionType } from '../../types';
import styles from './SpellList.module.css';

type PropsType = {
  cards: Array<CardType>;
  hideCardOnRemove?: boolean;
};

const SpellList = ({ cards, hideCardOnRemove = false }: PropsType) => {
  const [cardsToShow, setCardsToShow] = useState<CardType[]>([]);
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [toastId, setToastId] = useState('');
  const [toastMsg, setToastMsg] = useState('');

  useEffect(() => {
    setCardsToShow([...cards]);
  }, [cards]);

  const handleCloseToast = () => {
    setIsToastOpen(false);
  };

  const handleShowToast = ({
    id,
    name,
    action,
  }: {
    id: string;
    name: string;
    action: ToastActionType;
  }) => {
    setIsToastOpen(true);
    setToastId(id);
    setToastMsg(`${name} has been ${action === 'Add' ? 'added' : 'removed'}`);

    if (hideCardOnRemove && action === 'Remove') {
      setCardsToShow((prev) => prev.filter((card) => card.slug !== id));
    }
  };

  return (
    <div className={styles.main}>
      <ul className={styles.list}>
        {cardsToShow.map((card) => (
          <li key={card.slug} className={styles.item}>
            <SpellCard card={card} setShowToast={handleShowToast} />
          </li>
        ))}
      </ul>

      <Snackbar
        key={toastId}
        open={isToastOpen}
        autoHideDuration={3000}
        onClose={handleCloseToast}
        message={toastMsg}
        TransitionComponent={(props: SlideProps) => (
          <Slide {...props} direction="up" />
        )}
        action={<CheckCircleIcon />}
      />
    </div>
  );
};

export default SpellList;
