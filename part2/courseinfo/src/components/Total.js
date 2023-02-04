const Total = ({ parts }) => {
  const total = parts.reduce((acc, part) => acc + part.exercises, 0);

  return (
    <p>
      <strong>total of {total} exercises</strong>
    </p>
  );
};

export default Total;
