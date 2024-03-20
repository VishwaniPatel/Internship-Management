import { useEffect, useState } from "react";
import { getInternData } from "../utility/service/BatchIntern.service";

export const useBatchIntern = () => {
  const [batchIntern, setBatchIntern] = useState([]);

  //** get intern of selected batch */
  const getAllBatchIntern = () => {
    getInternData().then((response) => {
      if (response) {
        setBatchIntern(response.data);
      }
    });
  };
  useEffect(() => {
    getAllBatchIntern();
  }, []);
  return batchIntern;
};
