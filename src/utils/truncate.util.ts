export const truncate = (str: string, length: number) => (str.length > length ? `${str}...` : str);
