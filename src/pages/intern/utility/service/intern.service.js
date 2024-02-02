import axios from "axios";

const url = "http://localhost:3000/intern";

export const getInternData = () => {
  return axios.get(url);
};
/** Delete Data By ID Call*/
export const deleteInternData = (id) => {
  return axios.delete(url + "/" + id);
};
/** Add new internData Call  */
export const postInternData = (data) => {
  return axios.post(url, data);
};
/** getById internData Call */
export const getByIdInternData = (id) => {
  return axios.get(url + "/" + id);
};
/** update internData Call */
export const putInternData = (id, data) => {
  return axios.put(url + "/" + id, data);
};
