import { useEffect, useState } from 'react'
import { getDomain } from '../utility/services/mentors.service'
const useDomain = () => {
    const [domain, setDomain] = useState([]);
    /**
     * get all domain details
     * @returns - all domains with transformed values for displaying in dropdownmenu
     */
    const getDomains = async () =>{
        await getDomain().then((res)=> {
            const response = res.data;
            const transformedValues = response?.map((item) => ({
                id: item.id,
                value: item.name,
              
              }));
            setDomain(transformedValues);
        })
    }
    useEffect(()=>{
        getDomains();
    },[])
  return domain;
}

export default useDomain