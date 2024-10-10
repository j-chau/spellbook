import { useState } from 'react';
import { CardType, ToastActionType } from '../../types/types';
import styles from './SpellCard.module.css';
import SpellCardSection from './SpellCardSection';
import AddButton from '../AddButton';
import { capitalize } from '../../utils/utils';
import RemoveButton from '../RemoveButton';
import * as SavedSpellsAPI from '../../utils/SavedSpellsAPI';

type PropsType = {
  card: CardType;
  isCardAdded: boolean;
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

const SpellCard = ({ card, isCardAdded, setShowToast }: PropsType) => {
  const [hideCardButton, setHideCardButton] = useState(true);
  const [isSaved, setIsSaved] = useState(isCardAdded);

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

  const [castingTime, castingConditions] = casting_time.split(', ');

  const handleAddCard = async () => {
    await SavedSpellsAPI.addSpell({
      card,
      onSuccess: () => {
        setIsSaved(true);
        setShowToast({ name, id, action: 'Add' });
      },
    });
  };

  const handleRemoveCard = async () => {
    await SavedSpellsAPI.removeSpell({
      id,
      onSuccess: () => {
        setIsSaved(false);
        setShowToast({ name, id, action: 'Remove' });
      },
    });
  };

  return (
    <div
      className={styles.main}
      onMouseEnter={() => setHideCardButton(false)}
      onMouseLeave={() => setHideCardButton(true)}
    >
      <div className={styles.header}>
        {isSaved ? (
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
