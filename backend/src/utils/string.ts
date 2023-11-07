export const getAccountId = (): string => {
  const ts = new Date().getTime();
  return ts.toString();
};
