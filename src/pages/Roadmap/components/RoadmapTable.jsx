import { Table } from "@mantine/core";
import { useEffect, useState } from "react";
import { getRoadMapData } from "../service/Roadmap.service";
import { DropdownMenu } from "./DropdownMenu";

export function RoadMapTables() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    getRoadMapData().then((res) => {
      setRecords(res.data);
    });
  }, [records]);

  const rows = records.map((tabData) => (
    <Table.Tr key={tabData.topic}>
      <Table.Td>{tabData.topic}</Table.Td>
      <Table.Td>{tabData.subtopic}</Table.Td>
      <Table.Td>{tabData.duration}</Table.Td>
      <Table.Td>
        <DropdownMenu id={tabData.id} />
      </Table.Td>
    </Table.Tr>
  ));
  return (
    <div className="table-container">
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
            <Table.Th>TOPIC</Table.Th>
            <Table.Th>SUB-TOPIC</Table.Th>
            <Table.Th>DURATION</Table.Th>
            <Table.Th></Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </div>
  );
}
