const Part = ({ name, exercises }) => (
  <div>
    {name} {exercises}
  </div>
);

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part) => {
        return (
          <Part key={part.id} name={part.name} exercises={part.exercises} />
        );
      })}
    </>
  );
};

export default Content;
