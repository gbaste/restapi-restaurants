export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const extractToken = (token) => {
  const tokenArray = token.split(" ");
  return tokenArray[1];
};

export const getPagination = (page, size) => {
  const limit = size ? +size : 1;
  const offset = page ? page * limit : 0;
  return { limit, offset };
};
