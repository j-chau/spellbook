import React from 'react';
import Filter from '../../../../components/Filter';
import { schoolsOfMagic } from '../../../../constants';
import { SchoolsOfMagicType } from '../../../../types';

type PropsType = {
  school: SchoolsOfMagicType | '';
  setSchool: React.Dispatch<React.SetStateAction<SchoolsOfMagicType | ''>>;
};

const SchoolFilter = ({ school, setSchool }: PropsType) => {
  return (
    <Filter<SchoolsOfMagicType | ''>
      currentValue={school}
      setValue={setSchool}
      items={[...schoolsOfMagic]}
      id="school-selector"
      labelName="School of Magic"
      minWidth={180}
    />
  );
};

export default SchoolFilter;
