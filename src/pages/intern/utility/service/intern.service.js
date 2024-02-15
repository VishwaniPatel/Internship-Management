import axios from "axios";

const url = "http://localhost:3000/internshipBatch";

/** getById internData Call */
export const getByIdInternData = (id) => {
  return axios.get(url + "/" + id);
};

/** update internData Call */
export const putInternData = (id, data) => {
  return axios.put(url + "/" + id, data);
};
