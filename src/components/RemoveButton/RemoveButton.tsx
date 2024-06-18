import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import styles from './RemoveButton.module.css';

type PropsType = {
  onClick: () => void;
  hidden: boolean;
};

const RemoveButton = ({ onClick, hidden }: PropsType) => {
  const handleButtonClick = () => {
    onClick();
  };

  return hidden ? null : (
    <button onClick={handleButtonClick} className={styles.main}>
      <CloseIcon fontSize="small" />
    </button>
  );
};

export default RemoveButton;
