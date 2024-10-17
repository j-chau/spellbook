import { CardType } from '../types/types';

type resHandlerType = {
  onSuccess?: (data?: CardType[]) => void;
  onError?: () => void;
};

const handleError = (err: unknown) => {
  console.error(err instanceof Error ? err.message : 'Something went wrong');
};

const getAllSpells = async ({ onSuccess, onError }: resHandlerType) => {
  try {
    const response = await fetch('my_spells');
    const data = await response.json();
    onSuccess?.(data);
    return data;
  } catch (err) {
    handleError(err);
    onError?.();
  }
};

const addSpell = async ({
  card,
  onSuccess,
  onError,
}: { card: CardType } & resHandlerType) => {
  console.log('card', card);
  try {
    await fetch('/my_spells', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...card }),
    });
    onSuccess?.();
  } catch (err) {
    console.log('err', err);
    handleError(err);
    onError?.();
  }
};

const removeSpell = async ({
  id,
  onSuccess,
  onError,
}: { id: string } & resHandlerType) => {
  try {
    await fetch(`/my_spells/${id}`, {
      method: 'DELETE',
    });
    onSuccess?.();
  } catch (err) {
    handleError(err);
    onError?.();
  }
};

const removeAllSpells = async ({ onSuccess, onError }: resHandlerType) => {
  try {
    await fetch('/my_spells', {
      method: 'DELETE',
    });
    onSuccess?.();
  } catch (err) {
    handleError(err);
    onError?.();
  }
};

export { addSpell, removeSpell, getAllSpells, removeAllSpells };
