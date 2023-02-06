import axios from "axios";

const baseUrl = "https://restcountries.com/v3.1/all";

const getAll = () => {
  return axios.get(baseUrl);
};

const countryService = { getAll };
export default countryService;
