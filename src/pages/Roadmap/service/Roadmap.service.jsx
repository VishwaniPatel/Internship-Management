import axios from "axios";
const baseUrl = "http://localhost:3000/";

//To Get Roadmap Data
export const getRoadMapData = async () => {
  return await axios.get(baseUrl + "roadMap");
};

// To Post Roadmap Data
export const addRoadMap = async (roadmapData) => {
  const url = baseUrl + "roadMap";
  return await axios.post(url, roadmapData);
};

// Delete The Data
export const deleteRoadMap = async (id) => {
  const url = baseUrl + "roadMap";
  return await axios.delete(url + "/" + id);
};
// Get Data
export const getRoadmapById = async (id) => {
  const url = baseUrl + "roadMap/" + id;
  return await axios.get(url);
};
// Update the Data
export const updateRoadmap = async (id, roadmap) => {
  const url = baseUrl + "roadMap/" + id;
  return await axios.put(url, roadmap);
};
