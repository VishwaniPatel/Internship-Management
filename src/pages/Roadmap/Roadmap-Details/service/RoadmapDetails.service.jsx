import axios from "axios";
const baseUrl = "http://localhost:3000/";

//To Get Roadmap Data
export const getRoadMapDetails = async () => {
  return await axios.get(baseUrl + "roadmapDetails");
};

// To Post Roadmap Data
export const addRoadMapDetails = (roadmapData) => {
  const url = baseUrl + "roadmapDetails";
  return axios.post(url, roadmapData);
};

// Delete The Data
export const deleteRoadMapDetails = async (id) => {
  const url = baseUrl + "roadmapDetails";
  return await axios.delete(url + "/" + id);
};
// Get Data by Id
export const getRoadmapDetailsById = async (id) => {
  const url = baseUrl + "roadmapDetails/" + id;
  return await axios.get(url);
};
// Update the Data
export const updateRoadmapDetails = async (id, roadmap) => {
  const url = baseUrl + "roadmapDetails/" + id;
  return await axios.put(url, roadmap);
};
