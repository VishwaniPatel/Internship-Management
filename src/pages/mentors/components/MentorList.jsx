import { Menu, Table } from '@mantine/core';
import { IconChevronDown, IconChevronUp, IconDotsVertical, IconSelector } from '@tabler/icons-react';
import { useEffect, useState } from 'react'
import MenuDropdown from './MenuDropdown';
import useSort from '../../../shared/hooks/useSort';

const MentorList = ({mentors}) => {
  const { sortedData, sortColumn, sortDirection, handleSortColumn } = useSort(mentors, 'firstName', 'asc');
// filter deleted data
   const handleDelete = (id) => (
     setMentors(mentors.filter(data => data.id !== id) )
   )
  
   const sortIconFirstName = sortColumn === 'firstName' ? 
   (sortDirection === 'asc' ? <IconChevronUp size={14}/> : <IconChevronDown size={14}/>) : 
   <IconSelector size={14}/>;

const sortIconDomain = sortColumn === 'domain' ? 
   (sortDirection === 'asc' ? <IconChevronUp size={14}/> : <IconChevronDown size={14} />) : 
   <IconSelector size={14}/>;

  // Display mentor details in table
    const rows = sortedData.map((data) => (
        <Table.Tr key={data.id}>
           <Table.Td >
        {data.firstName} {data.lastName}
      </Table.Td>
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
              <Table.Th onClick={() => handleSortColumn('firstName')}>Name {sortIconFirstName}</Table.Th>
              <Table.Th>Email Id</Table.Th>
              <Table.Th onClick={() => handleSortColumn('domain')}>Domain {sortIconDomain}</Table.Th>
              <Table.Th></Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
         // End: table for displaying mentor details
        )
}

export default MentorList