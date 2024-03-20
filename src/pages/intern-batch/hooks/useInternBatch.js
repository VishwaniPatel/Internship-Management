import { useEffect, useState } from "react";
import { getInternsBatchData } from "../utility/service/InternBatch.service";

export const useInternBatch = () => {
    const [batch, setBatch] = useState([]);

    //** get intern of selected batch */
    const getAllBatch = () => {
        getInternsBatchData().then((response) => {
        if (response) {
          setBatch(response.data);
        }
      });
    };
    useEffect(() => {
        getAllBatch();
    }, []);
    return batch;
}
