import React from 'react';
import { playableClasses } from '../../../../constants';
import { PlayableClassesType } from '../../../../types';
import Filter from '../../../../components/Filter';

type PropsType = {
  playerClass: PlayableClassesType | '';
  setPlayerClass: React.Dispatch<
    React.SetStateAction<PlayableClassesType | ''>
  >;
};

const ClassFilter = ({ playerClass, setPlayerClass }: PropsType) => {
  return (
    <Filter<PlayableClassesType | ''>
      currentValue={playerClass}
      setValue={setPlayerClass}
      items={[...playableClasses]}
      id="class-selector"
      labelName="Class"
    />
  );
};

export default ClassFilter;
