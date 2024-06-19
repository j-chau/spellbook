import React, { ChangeEvent, useEffect, useState } from 'react';
import { useDebounce } from '../../../../hooks/useDebounce';
import TextField from '@mui/material/TextField';
import { CardType } from '../../../../types';
import { BASE_URL } from '../../../../constants';
import styles from './Search.module.css';

type PropsType = {
  setCardData: React.Dispatch<React.SetStateAction<Array<CardType>>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const Search = ({ setCardData, setIsLoading }: PropsType) => {
  const [searchValue, setSearchValue] = useState('');
  const searchTerm = useDebounce(searchValue);

  useEffect(() => {
    const getData = async () => {
      const data = await fetch(`${BASE_URL}?search=${searchTerm}`).then((res) =>
        res.json(),
      );
      setCardData(data.results);
      setIsLoading(false);
    };
    if (searchTerm) {
      setIsLoading(true);
      getData();
    }
  }, [searchTerm, setCardData, setIsLoading]);

  const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className={styles.main}>
      <TextField
        id="outlined-basic"
        label="Search"
        variant="outlined"
        size="small"
        value={searchValue}
        onChange={handleSearchInput}
      />
    </div>
  );
};

export default Search;
