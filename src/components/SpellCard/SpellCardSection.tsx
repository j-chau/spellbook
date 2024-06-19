import React from 'react';
import Tooltip from '../Tooltip';
import styles from './SpellCard.module.css';

type PropsType = {
  title: string;
  value: string;
  tooltipContent?: string;
  fullWidth?: boolean;
};

const SpellCardSection = ({
  title,
  value,
  tooltipContent,
  fullWidth = false,
}: PropsType) => {
  const getClasses = [
    styles.section,
    tooltipContent ? '' : styles.noHover,
    fullWidth ? styles.fullWidth : '',
  ].join(' ');

  return (
    <Tooltip content={tooltipContent}>
      <div className={getClasses}>
        <span className={styles.sectionTitle}>{title}: </span>
        <span>{value}</span>
      </div>
    </Tooltip>
  );
};

export default SpellCardSection;
