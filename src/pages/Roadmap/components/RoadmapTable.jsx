import { Badge, Table } from "@mantine/core";
import { useEffect, useState } from "react";
import { getRoadMapData } from "../service/Roadmap.service";
import { DropdownMenu } from "./DropdownMenu";

export function RoadMapTables() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    getRoadMapData().then((res) => {
      setRecords(res.data);
    });
  }, []);
  const handleDeleteRecord = (id) => {
    setRecords(records.filter((record) => record.id !== id));
  };

  const rows = records.map((tabData) => (
    <Table.Tr key={tabData.topic}>
      <Table.Td>{tabData.topic}</Table.Td>
      <Table.Td>{tabData.subtopic}</Table.Td>
      <Table.Td>{tabData.duration}</Table.Td>
      <Table.Td style={{ textWrap: "nowrap" }}>{tabData.presenter}</Table.Td>
      <Table.Td>
        <Badge
          variant={
            tabData.status === "Not-Started"
              ? "notStarted"
              : tabData.status === "Completed"
              ? "completed"
              : "inProgress"
          }
          radius="sm"
        >
          {tabData.status}
        </Badge>
      </Table.Td>
      <Table.Td>
        <DropdownMenu id={tabData.id} onDelete={handleDeleteRecord} />
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
            <Table.Th>PRESENTER</Table.Th>
            <Table.Th>STATUS</Table.Th>
            <Table.Th></Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </div>
  );
}
