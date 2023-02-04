import { useState, useEffect } from "react";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import axios from "axios";

const App = () => {
  //json server -p3001 --watch db.json
  useEffect(() => {
    console.log("Fetching...");
    axios.get("http://localhost:3001/persons").then((response) => {
      console.log("Data received");
      setPersons(response.data);
    });
  }, []); //[] only once with the first render (default is with each render !)

  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };
  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const addPerson = (e) => {
    e.preventDefault();
    if (hasPerson(newName)) {
      alert(`${newName} is already added to phonebook`);
      return null;
    }
    setPersons([...persons, { name: newName, number: newNumber }]);
    setNewName("");
    setNewNumber("");
  };

  const hasPerson = (person) => persons.some((e) => e.name === person);

  const filterPersons = (filter) => {
    if (filter === "") return persons;
    return persons.filter((el) =>
      el.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const filteredPersons = filterPersons(filter);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />

      <h3>Add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>
      <Persons persons={filteredPersons} />
    </div>
  );
};

export default App;
