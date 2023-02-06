import Languages from "./Languages";
import Flag from "./Flag";

const CountryDetails = ({ country }) => {
  //parse the api
  const name = country.name.common;

  return (
    <>
      <h2>{name}</h2>
      <p>capital: {country.capital[0]}</p>
      <p>area: {country.area}</p>
      <h3>languages</h3>
      <Languages languages={country.languages} />
      <h3>flag</h3>
      <Flag flag={country.flags} />
    </>
  );
};

export default CountryDetails;
