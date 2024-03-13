import React, { useEffect, useState } from 'react'
import useBatchMentor from '../hooks/useBatchMentor';
import { Table, Text } from '@mantine/core';
import { useParams } from 'react-router';
import { DropdownMenu } from './DropDownMenu';

const BatchMentorList = ({ toggleDrawer }) => {
  // get param value from URL
  const { batchId } = useParams();
  // get mentor data for selected batch
  const batchMentorData = useBatchMentor();
  // set mentors details for selected batch
  const [records, setRecords] = useState([]);
  useEffect(() => {
    // Filter Records based on batchId
    const filteredRecords = batchId
      ? batchMentorData.filter((record) => record.batchId == batchId)
      : batchMentorData;
    setRecords(filteredRecords);
  }, [batchId, batchMentorData]);

  // delete mentor details
  const handleDeleteRecord = (batchId) => {
    setRecords(records.filter((record) => record.id !== batchId));
  };

  //   table data for displaying mentor details
  const rows = records.length > 0 && records.map((tabData) => (
    <Table.Tr key={tabData.id}>
      <Table.Td>{tabData.mentor} {tabData.domainOwner && "(Owner)"}</Table.Td>
      <Table.Td>{tabData.email}</Table.Td>
      <Table.Td>{tabData.domain}</Table.Td>
      <Table.Td>
        {/* Dropdown menu to perform edit/delete */}
        <DropdownMenu
          id={tabData.id}
          onDelete={handleDeleteRecord}
          toggleDrawer={toggleDrawer}
        />
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      {/* Start: Table to display mentor details */}
      <Table
        stickyHeader
        stickyHeaderOffset={-16}
        highlightOnHover
        withTableBorder
        withColumnBorders
        mt="md"
      >
        <Table.Thead bg="#f1f3f5">
          <Table.Tr>
            <Table.Th>NAME</Table.Th>
            <Table.Th>EMAIL ID</Table.Th>
            <Table.Th>DOMAIN</Table.Th>
            <Table.Th></Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {/* Display message if no record found for mentors */}
          {records.length == 0 ? (
            <Table.Tr>
              <Table.Td colSpan="4">
                <Text ta="center"> No Records Found</Text>
              </Table.Td>
            </Table.Tr>
          ) : (
            <>{rows}</>
          )}
        </Table.Tbody>
      </Table>
      {/* Start: Table to display mentor details */}
    </>
  )
}

export default BatchMentorList