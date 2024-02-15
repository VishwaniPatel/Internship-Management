import { Menu, Table } from '@mantine/core';
import { IconDotsVertical } from '@tabler/icons-react';
import { useEffect, useState } from 'react'
import MenuDropdown from './MenuDropdown';
import useMentors from '../hooks/useMentors';

const MentorList = () => {
// get all mentor details
const mentorData = useMentors();
const [mentors, setMentors] = useState(mentorData)
useEffect(()=>{
  setMentors(mentorData)
},[mentorData])

// filter deleted data
   const handleDelete = (id) => (
     setMentors(mentors.filter(data => data.id !== id) )
   )
  
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
          <MenuDropdown id={data.id} onDelete={handleDelete}/>
          </Menu>
          </Table.Td>

        </Table.Tr>
      ));
  
    
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