import React, { useState } from 'react';
import { CardType, ToastActionType } from '../../types';
import styles from './SpellCard.module.css';
import SpellCardSection from './SpellCardSection';
import AddButton from '../AddButton';
import { capitalize } from '../../utils/utils';
import {
  read as readLS,
  remove as removeLS,
  update as updateLS,
} from '../../utils/LocalStorage';
import { MY_SPELLS_LS_KEY } from '../../constants';
import RemoveButton from '../RemoveButton';

type PropsType = {
  card: CardType;
  setShowToast: ({
    id,
    name,
    action,
  }: {
    id: string;
    name: string;
    action: ToastActionType;
  }) => void;
};

const SpellCard = ({ card, setShowToast }: PropsType) => {
  const prevAddedCards = readLS(MY_SPELLS_LS_KEY) || [];

  const [hideCardButton, setHideCardButton] = useState(true);
  const [addedCards, setAddedCards] = useState(prevAddedCards);

  const {
    name,
    slug: id,
    spell_level,
    school,
    duration,
    range,
    casting_time,
    components,
    material,
    can_be_cast_as_ritual,
    requires_concentration,
  } = card;

  const isCardAdded = addedCards.some((cardId) => cardId === id);

  const [castingTime, castingConditions] = casting_time.split(', ');

  const handleAddCard = () => {
    const updatedCards = [...addedCards, id];
    updateLS(MY_SPELLS_LS_KEY, id);
    setAddedCards(updatedCards);
    setShowToast({ name, id, action: 'Add' });
  };

  const handleRemoveCard = () => {
    const filteredCards = addedCards.filter((card) => card !== id);
    removeLS(MY_SPELLS_LS_KEY, id);
    setAddedCards(filteredCards);
    setShowToast({ name, id, action: 'Remove' });
  };

  return (
    <div
      className={styles.main}
      onMouseEnter={() => setHideCardButton(false)}
      onMouseLeave={() => setHideCardButton(true)}
    >
      <div className={styles.header}>
        {isCardAdded ? (
          <RemoveButton onClick={handleRemoveCard} hidden={hideCardButton} />
        ) : (
          <AddButton onClick={handleAddCard} hidden={hideCardButton} />
        )}
        <span className={styles.title}>{name}</span>
        <span className={styles.subTitle}>
          Level {spell_level} - {capitalize(school)}
        </span>
      </div>

      <div className={styles.info}>
        <SpellCardSection title="Duration" value={duration} />
        <SpellCardSection title="Range" value={range} />
        <SpellCardSection
          title="Casting Time"
          value={castingTime}
          tooltipContent={castingConditions}
        />
        <SpellCardSection
          title="Components"
          value={components}
          tooltipContent={material}
        />
      </div>

      <div className={styles.footer}>
        <p>{can_be_cast_as_ritual ? <>✅</> : <>❌</>} Ritual</p>
        <p>{requires_concentration ? <>✅</> : <>❌</>} Concentration</p>
      </div>
    </div>
  );
};

export default SpellCard;
