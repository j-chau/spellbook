import React, { useMemo } from 'react';
import styles from './SpellCard.module.css';
import Tooltip from '../Tooltip';

type PropsType = {
  title: string;
  value: string;
  tooltipList?: string[];
};

const SpellCardSection = ({ title, value, tooltipList }: PropsType) => {
  const tooltipContent = useMemo(
    () =>
      tooltipList ? (
        <>
          {tooltipList.map((item, idx) => (
            <span key={idx} className={styles.tooltipItem}>
              {item}
            </span>
          ))}
        </>
      ) : null,
    [tooltipList],
  );

  return (
    <Tooltip content={tooltipContent}>
      <div className={`${styles.section} ${tooltipList ? '' : styles.noHover}`}>
        <span className={styles.sectionTitle}>{title}: </span>
        <span>{value}</span>
      </div>
    </Tooltip>
  );
};

export default SpellCardSection;
