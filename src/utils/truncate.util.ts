export const truncate = (str: string, length: number) => (str.length > length ? `${str.substring(0, length)}...` : str.substring(0, length));
