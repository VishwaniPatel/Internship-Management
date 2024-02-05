import { useEffect, useState } from 'react'
import { getMentorData } from '../utility/services/mentors.service';

const useMentors = () => {
    const [mentors, setMentors] = useState([]);
    // get all mentor's details
    const getMentors = async () =>{
        await getMentorData().then((res)=> {
            const response = res.data;
            setMentors(response);
        })
    }
    useEffect(()=>{
        getMentors();
    },[])
  return mentors;
}

export default useMentors