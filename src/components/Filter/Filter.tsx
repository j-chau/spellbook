import React from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

type PropsType<T> = {
  currentValue: T;
  setValue: React.Dispatch<React.SetStateAction<T>>;
  items: T[];
  id: string;
  labelName: string;
  minWidth?: number;
};

const Filter = <T extends string>({
  currentValue,
  setValue,
  items,
  id,
  labelName,
  minWidth = 120,
}: PropsType<T>) => {
  const handleChange = (e: SelectChangeEvent) => {
    setValue(e.target.value as T);
  };

  return (
    <FormControl size="small" sx={{ minWidth }}>
      <InputLabel id={`${id}-label`}>{labelName}</InputLabel>
      <Select
        labelId={`${id}-label`}
        id={id}
        value={currentValue}
        label={labelName}
        onChange={handleChange}
      >
        <MenuItem value="" divider>
          <em>Clear</em>
        </MenuItem>
        {items.map((item) => (
          <MenuItem value={item} key={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Filter;
