import { useEffect, useState } from "react";
import { getBatchRoadMap } from "../../pages/InternshipBatchDetails/components/BatchRoadmap/services/BatchRoadmap.service";

const useBatchRoadmap = () => {
  const [data, setData] = useState([]);
  const getBatchRoadmapDetails = async () => {
    await getBatchRoadMap().then((res) => {
      setData(res.data);
    });
  };
  useEffect(() => {
    getBatchRoadmapDetails();
  }, []);
  return data;
};

export default useBatchRoadmap;
