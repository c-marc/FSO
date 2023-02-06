const Filter = ({ value, onChange }) => {
  return (
    <div>
      find country
      <input value={value} onChange={onChange} />
    </div>
  );
};

export default Filter;
