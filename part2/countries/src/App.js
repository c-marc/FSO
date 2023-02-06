import { useState, useEffect } from "react";
import Filter from "./Filter";
import Countries from "./Countries";
import countryService from "./services/country";
import { filterByName, sortByName } from "./utils";
import CountryDetails from "./CountryDetails";

function App() {
  // Fetch countries only once
  useEffect(() => {
    console.log("Fetching...");
    countryService.getAll().then((response) => {
      setCountries(response.data);
      console.log("Data received: ", `${response.data.length} countries`);
    });
  }, []);

  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");

  // Compute a minimal table
  // TODO: not sure how to fetch only this from v3 of the API
  const countryNames = countries
    .map((c) => {
      return { name: c.name.common, key: c.cca3 };
    })
    .sort(sortByName);

  const matchingNames = countryNames.filter(filterByName(filter));
  const len = matchingNames.length;
  console.log(len);

  const getCountry = (name) => {
    return countries.find((c) => c.name.common === name);
  };
  //console.log(getCountry("France"));
  //

  const showCountry = (name) => {
    setFilter(name);
  };

  let display;
  if (len > 10) {
    display = <p>{`${len} results`}: please be more specific.</p>;
  } else if (len === 1) {
    display = <CountryDetails country={getCountry(matchingNames[0].name)} />;
  } else {
    display = <Countries countries={matchingNames} showCountry={showCountry} />;
  }

  return (
    <div className="App">
      <Filter value={filter} onChange={(e) => setFilter(e.target.value)} />
      {display}
    </div>
  );
}

export default App;
