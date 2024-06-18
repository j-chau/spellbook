import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import styles from './AddButton.module.css';

type PropsType = {
  onClick: () => void;
  hidden: boolean;
};

const AddButton = ({ onClick, hidden }: PropsType) => {
  const handleButtonClick = () => {
    onClick();
  };

  return hidden ? null : (
    <button onClick={handleButtonClick} className={styles.main}>
      <AddIcon fontSize="small" />
    </button>
  );
};

export default AddButton;
