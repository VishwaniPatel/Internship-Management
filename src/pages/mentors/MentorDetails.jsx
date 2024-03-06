import React, { useContext, useState , useEffect} from 'react'
import { Button, Flex, Text } from '@mantine/core';
import { Link } from 'react-router-dom';
import MentorList from './components/MentorList';
import SearchBox from '../../shared/common-components/SearchBox';
import useMentors from './hooks/useMentors';
import InternshipContext from '../../shared/store/Context';
import useSearch from '../../shared/hooks/useSearch';
const MentorDetails = () => {
    const mentorData = useMentors();
    const [mentors, setMentors] = useState(mentorData);
    const { searchTerm } = useContext(InternshipContext);
    useEffect(() => {
        const filteredMentors = useSearch(mentorData, searchTerm, "firstName");
        setMentors(filteredMentors);
    }, [mentorData, searchTerm]);
    return (
        <Flex p="lg" direction='column'>
            <Flex justify="space-between">
                {/* Title for mentor details page */}
                <Text>Mentor's Detail</Text>
                <Flex>
                <SearchBox/>
                {/* Button for adding mentor details */}
                <Link to="/mentor/add/new">
                    <Button>Add Mentor</Button>
                </Link>
                </Flex>
            </Flex>
            {/* Component to display mentor details */}
            <MentorList mentors={mentors} />
        </Flex>
    )
}

export default MentorDetails