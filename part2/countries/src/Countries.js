const Countries = ({ countries }) => {
  return (
    <>
      {countries.slice(0, 10).map((c) => {
        return (
          <div key={c.key}>
            {c.name} <button>show</button>
          </div>
        );
      })}
    </>
  );
};

export default Countries;
