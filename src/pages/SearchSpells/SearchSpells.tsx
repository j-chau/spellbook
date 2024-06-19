import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import Search from './components/Search';
import ClassFilter from './components/ClassFilter';
import SchoolFilter from './components/SchoolFilter';
import SpellList from '../../components/SpellList';
import {
  CardType,
  PlayableClassesType,
  SchoolsOfMagicType,
  isValidPlayerClass,
  isValidSchoolOfMagic,
} from '../../types';
import { useDebounce } from '../../hooks/useDebounce';
import { BASE_URL } from '../../constants';
import { useSearchParams } from 'react-router-dom';

const SearchSpells = () => {
  const [cardData, setCardData] = useState<Array<CardType>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [playerClass, setPlayerClass] = useState<PlayableClassesType | ''>('');
  const [schoolOfMagic, setSchoolOfMagic] = useState<SchoolsOfMagicType | ''>(
    '',
  );

  const searchTerm = useDebounce(searchValue);
  const [searchParams, setSearchParams] = useSearchParams();

  const areFiltersActive = useMemo(
    () => searchTerm || playerClass || schoolOfMagic,
    [searchTerm, playerClass, schoolOfMagic],
  );

  const handleClearAllFilters = useCallback(() => {
    setSearchValue('');
    setPlayerClass('');
    setSchoolOfMagic('');
  }, [setSearchValue, setPlayerClass, setSchoolOfMagic]);

  useEffect(() => {
    searchParams.forEach((value, key) => {
      if (key === 'spell_lists' && isValidPlayerClass(value))
        setPlayerClass(value);
      if (key === 'school' && isValidSchoolOfMagic(value))
        setSchoolOfMagic(value);
      if (key === 'search') setSearchValue(value);
    });
    // optimizing to only run on first render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const newSearchParams = {
      ...(searchTerm && { search: searchTerm }),
      ...(playerClass && {
        spell_lists: playerClass,
      }),
      ...(schoolOfMagic && { school: schoolOfMagic }),
    };

    const newParams = new URLSearchParams([
      ...Object.entries(newSearchParams),
    ]).toString();

    const getData = async () => {
      const data = await fetch(`${BASE_URL}?${newParams}`).then((res) =>
        res.json(),
      );
      setCardData(data.results || []);
      setIsLoading(false);
    };
    if (areFiltersActive) {
      setIsLoading(true);
      getData();
      setSearchParams(newSearchParams);
    } else if (!searchTerm && !playerClass && !schoolOfMagic) {
      setCardData([]);
    }
  }, [
    searchTerm,
    playerClass,
    schoolOfMagic,
    areFiltersActive,
    setCardData,
    setIsLoading,
    setSearchParams,
  ]);

  return (
    <div>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1 },
          marginBottom: 'var(--gutter-20)',
        }}
      >
        <Search searchValue={searchValue} setSearchValue={setSearchValue} />
        <ClassFilter
          playerClass={playerClass}
          setPlayerClass={setPlayerClass}
        />
        <SchoolFilter school={schoolOfMagic} setSchool={setSchoolOfMagic} />
        {areFiltersActive ? (
          <Button
            startIcon={<CloseIcon />}
            size="small"
            onClick={handleClearAllFilters}
          >
            Clear filters
          </Button>
        ) : null}
      </Box>
      <SpellList cards={cardData} isLoading={isLoading} />
    </div>
  );
};

export default SearchSpells;
