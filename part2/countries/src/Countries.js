const Countries = ({ countries, showCountry }) => {
  return (
    <>
      {countries.slice(0, 10).map((c) => {
        return (
          <div key={c.key}>
            {c.name} <button onClick={() => showCountry(c.name)}>show</button>
          </div>
        );
      })}
    </>
  );
};

export default Countries;
