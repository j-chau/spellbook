import React, { useEffect, useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import Search from './components/Search';
import ClassFilter from './components/ClassFilter';
import SchoolFilter from './components/SchoolFilter';
import SpellList from '../../components/SpellList';
import { CardType, PlayableClassesType, SchoolsOfMagicType } from '../../types';
import { useDebounce } from '../../hooks/useDebounce';
import { BASE_URL } from '../../constants';

const SearchSpells = () => {
  const [cardData, setCardData] = useState<Array<CardType>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [playerClass, setPlayerClass] = useState<PlayableClassesType | ''>('');
  const [schoolOfMagic, setSchoolOfMagic] = useState<SchoolsOfMagicType | ''>(
    '',
  );

  const searchTerm = useDebounce(searchValue);

  const areFiltersActive = useMemo(
    () => searchTerm || playerClass || schoolOfMagic,
    [searchTerm, playerClass, schoolOfMagic],
  );

  const handleClearAllFilters = () => {
    setSearchValue('');
    setPlayerClass('');
    setSchoolOfMagic('');
  };

  useEffect(() => {
    const searchParams = {
      ...(searchTerm && { search: searchTerm }),
      ...(playerClass && {
        spell_lists: playerClass.toLowerCase(),
      }),
      ...(schoolOfMagic && { school: schoolOfMagic }),
    };

    const newParams = new URLSearchParams([
      ...Object.entries(searchParams),
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
