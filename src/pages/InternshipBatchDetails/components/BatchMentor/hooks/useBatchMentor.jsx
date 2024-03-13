import { useEffect, useState } from 'react'
import { getBatchMentor } from '../utility/services/BatchMentor.service';

const useBatchMentor = () => {
    const [batchMentor, setBatchMentor] = useState([]);
// get mentors of selected batch
const getAllBatchMentor = async () => {
    await getBatchMentor().then((res)=>{
        const response = res.data;
        setBatchMentor(response);
    })
}
useEffect(()=>{
    getAllBatchMentor();
},[])
  return batchMentor;
}

export default useBatchMentor