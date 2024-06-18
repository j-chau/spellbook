import React, { ChangeEvent, useEffect, useState } from 'react';
import { useDebounce } from '../../../../hooks/useDebounce';
import TextField from '@mui/material/TextField';
import { CardType } from '../../../../types';
import { BASE_URL } from '../../../../constants';

type PropsType = {
  setCardData: React.Dispatch<React.SetStateAction<Array<CardType>>>;
};

const Search = ({ setCardData }: PropsType) => {
  const [searchValue, setSearchValue] = useState('');
  const searchTerm = useDebounce(searchValue);

  useEffect(() => {
    const getData = async () => {
      const data = await fetch(`${BASE_URL}?search=${searchTerm}`).then((res) =>
        res.json(),
      );
      setCardData(data.results);
    };
    if (searchTerm) {
      getData();
    }
  }, [searchTerm, setCardData]);

  const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <div>
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
