import React from 'react'
import { Box, Button, Flex, Group, Text } from '@mantine/core';
import { Link } from 'react-router-dom';
import MentorList from './components/MentorList';
const MentorDetails = () => {

    return (
        <Flex p="lg" direction='column'>
            <Flex justify="space-between">
                {/* Title for mentor details page */}
                <Text>Mentor's Detail</Text>
                {/* Button for adding mentor details */}
                <Link to="/mentor/add/new">
                    <Button>Add Mentor</Button>
                </Link>
            </Flex>
            {/* Component to display mentor details */}
            <MentorList />
        </Flex>
    )
}

export default MentorDetails