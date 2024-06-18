import React from 'react';
import { CardType } from '../types';
import styles from './SpellCard.module.css';
import SpellCardSection from './SpellCardSection';
import { capitalize } from '../../utils/utils';

type PropsType = {
  card: CardType;
};

const SpellCard = ({ card }: PropsType) => {
  const {
    name,
    spell_level,
    school,
    duration,
    range,
    casting_time,
    components,
    requires_material_components,
    material,
    can_be_cast_as_ritual,
    requires_concentration,
  } = card;

  const materialList: string[] | undefined =
    requires_material_components && material.length > 0
      ? material.split(/, |and/)
      : undefined;

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <span className={styles.title}>{name}</span>
        <span className={styles.subTitle}>
          Level {spell_level} - {capitalize(school)}
        </span>
      </div>

      <div className={styles.info}>
        <SpellCardSection title="Duration" value={duration} />
        <SpellCardSection title="Range" value={range} />
        <SpellCardSection title="Casting Time" value={casting_time} />
        <SpellCardSection
          title="Components"
          value={components}
          tooltipList={materialList}
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
