const Languages = ({ languages }) => {
  console.log(languages);

  const li = Object.entries(languages).map(([k, v]) => {
    console.log(k, v);
    return <li key={k}> {v} </li>;
  });

  return <ul>{li}</ul>;
};

export default Languages;
