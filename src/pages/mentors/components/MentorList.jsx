import { Menu, Table } from '@mantine/core';
import { IconDotsVertical } from '@tabler/icons-react';
import React, { useEffect, useState } from 'react'
import MenuDropdown from './MenuDropdown';
import { deleteMentorData } from '../utility/services/mentors.service';
import useMentors from '../hooks/useMentors';

const MentorList = () => {
// get all mentor details
const mentorData = useMentors();
const [mentors, setMentors] = useState(mentorData)

/**
 * delete selected mentor data and filter mentor details
 * @param {number} id receives id of selected item
 */
   const handleDataReceived = async (id) => {
    await deleteMentorData(id);
    // Update the mentorData state if necessary
    setMentors((prevMentorData) =>
      prevMentorData.filter((data) => data.id !== id)
    );
  };
  // Display mentor details in table
    const rows = mentors.map((data) => (
        <Table.Tr key={data.id}>
          <Table.Td>{data.firstName}</Table.Td>
          <Table.Td>{data.lastName}</Table.Td>
          <Table.Td>{data.emailId}</Table.Td>
          <Table.Td>{data.domain}</Table.Td>
          <Table.Td>
          <Menu shadow="md" width={120} position="bottom-end">
          <Menu.Target>
            <IconDotsVertical />
          </Menu.Target>
          {/* Dropdown menu to edit/delete details */}
          <MenuDropdown data={data} onDataReceived={handleDataReceived} />
          </Menu>
          </Table.Td>

        </Table.Tr>
      ));
      useEffect(()=>{
        setMentors(mentorData)
      },[mentorData])
    
      return (
        // Start: table for displaying mentor details
        <Table >
          <Table.Thead>
            <Table.Tr>
              <Table.Th>First Name</Table.Th>
              <Table.Th>Last Name</Table.Th>
              <Table.Th>Email Id</Table.Th>
              <Table.Th>Domain</Table.Th>
              <Table.Th></Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
         // End: table for displaying mentor details
        )
}

export default MentorList