import { useState, useEffect } from "react";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import personService from "./services/persons";
import Notification from "./Notification";

const App = () => {
  //json server -p3001 --watch db.json
  useEffect(() => {
    console.log("Fetching...");
    personService.getAll().then((response) => {
      console.log("Data received");
      setPersons(response.data);
    });
  }, []); //[] only once with the first render (default is with each render !)

  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState(null);

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };
  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const showNotification = (message) => {
    setMessage(message);
    setTimeout(() => setMessage(null), 3000);
  };

  const updatePerson = () => {
    const confirmMessage = `${newName} is already added to phonebook, replace the old number with a new one?`;
    if (!window.confirm(confirmMessage)) return;
    //else update
    const changedPerson = persons.find((p) => p.name === newName); //still ref!
    personService
      .update(changedPerson.id, { ...changedPerson, number: newNumber })
      .then((response) => {
        setPersons(
          persons.map((p) => (p.id !== changedPerson.id ? p : response.data))
        );
        showNotification({
          text: `Updated ${changedPerson.name}`,
          type: "success",
        });
      })
      .catch((error) => {
        console.log(error.response.data.error);
        // TODO: but might also fail due to validation error...
        showNotification({
          text: `Information of ${changedPerson.name} was already removed from server`,
          type: "error",
        });
      });
  };

  const addPerson = (e) => {
    e.preventDefault();
    if (hasPerson(newName)) {
      return updatePerson();
    }

    const personObject = { name: newName, number: newNumber };

    personService
      .create(personObject)
      .then((response) => {
        setPersons([...persons, response.data]);
        setNewName("");
        setNewNumber("");
        showNotification({
          text: `Added ${response.data.name}`,
          type: "success",
        });
      })
      .catch((error) => {
        // this is the way to access the error message
        console.log(error.response.data.error);
      });
  };

  const removePerson = (id) => {
    const currentPerson = persons.find((p) => p.id === id);
    if (!window.confirm(`Delete ${currentPerson.name}?`)) return;

    personService.remove(id).then(() => {
      const newPersons = persons.filter((p) => p.id !== id);
      setPersons(newPersons);
      showNotification({
        text: `Removed ${currentPerson.name}`,
        type: "success",
      });
    });
  };

  const hasPerson = (name) => persons.some((p) => p.name === name);

  const filterPersons = (filter) => {
    if (filter === "") return persons;
    return persons.filter((p) =>
      p.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const filteredPersons = filterPersons(filter);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
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
      <Persons persons={filteredPersons} removePerson={removePerson} />
    </div>
  );
};

export default App;
