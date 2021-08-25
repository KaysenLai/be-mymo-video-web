export const validateNumber = (input, defaultNumber) => {
  if (!!Number(input) && Number.isInteger(+input) && +input > 0) {
    return +input;
  }
  return defaultNumber;
};

export const initialPagination = (page, pageSize) => {
  const newPage = validateNumber(page, 1);
  const newPageSize = validateNumber(pageSize, 10);
  const skip = (newPage - 1) * newPageSize;
  return { page: newPage, pageSize: newPageSize, skip };
};
