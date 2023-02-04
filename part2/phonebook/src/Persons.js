import Person from "./Person";

const Persons = ({ persons, removePerson }) => {
  return (
    <div>
      {persons.map((person) => {
        return (
          <Person
            key={person.id}
            person={person}
            remove={() => removePerson(person.id)}
          />
        );
      })}
    </div>
  );
};

export default Persons;
