// sort by name
export const sortByName = (a, b) => {
  const nameA = a.name.toUpperCase(); // ignore upper and lowercase
  const nameB = b.name.toUpperCase(); // ignore upper and lowercase
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }

  // names must be equal
  return 0;
};

// filter by name
export const filterByName = (pattern) => {
  //return a function
  return (item) => item.name.toLowerCase().includes(pattern.toLowerCase());
};
