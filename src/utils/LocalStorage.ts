export const read = (key: string): string[] | undefined => {
  const arr = localStorage.getItem(key);
  return arr ? JSON.parse(arr) : undefined;
};

export const clear = (key: string) => {
  localStorage.removeItem(key);
};

export const update = (key: string, value: any) => {
  const arr = new Set(read(key));

  if (!arr.has(value)) {
    arr.add(value);
    const updatedArr = Array.from(arr);
    localStorage.setItem(key, JSON.stringify(updatedArr));
  } else if (arr.size === 0) {
    localStorage.setItem(key, JSON.stringify([value]));
  }
};

export const remove = (key: string, value: any) => {
  const arr = new Set(read(key));
  arr.delete(value);

  const updatedArr = Array.from(arr);
  localStorage.setItem(key, JSON.stringify(updatedArr));
};

export const overwrite = (key: string, value: any[]) => {
  localStorage.setItem(key, JSON.stringify(value));
};
