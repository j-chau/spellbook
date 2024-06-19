import { playableClasses, schoolsOfMagic } from './constants';

export type CardType = {
  slug: string;
  name: string;
  spell_level: number;
  school: string;
  duration: string;
  range: string;
  casting_time: string;
  components: string;
  requires_material_components: boolean;
  material: string;
  can_be_cast_as_ritual: boolean;
  requires_concentration: boolean;
};

export type ToastActionType = 'Add' | 'Remove';

export type PlayableClassesType = (typeof playableClasses)[number];
export type SchoolsOfMagicType = (typeof schoolsOfMagic)[number];
