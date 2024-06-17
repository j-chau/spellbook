import React, { ChangeEvent, useEffect, useState } from 'react';
import { useDebounce } from '../../hooks/useDebounce';

const BASE_URL = 'https://api.open5e.com/v1/spells/';

const Search = () => {
  const [searchValue, setSearchValue] = useState('');
  const searchTerm = useDebounce(searchValue);
  const unused = 'ble';

  useEffect(() => {
    const getData = async () => {
      const data = await fetch(`${BASE_URL}?search=${searchTerm}`).then((res) =>
        res.json(),
      );
      console.log(data);
    };
    if (searchTerm) {
      getData();
    }
  }, [searchTerm]);

  const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <div>
      <input
        value={searchValue}
        onChange={handleSearchInput}
        placeholder="search"
      />
    </div>
  );
};

export default Search;
