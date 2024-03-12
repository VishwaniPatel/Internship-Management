import { Badge, Table, Flex, Button, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { getRoadmapById, updateRoadmap } from "../../service/Roadmap.service";
import { DropdownMenu } from "./DropdownMenu";
import { useParams } from "react-router-dom";
import { Breadcrumb } from "../../../../shared/common-components/Breadcrumb";
import { IconPlus } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { getRoadMapDetails } from "../utility/service/RoadmapDetails.service";

function RoadmapDetailsTable() {
  const { roadmapId } = useParams();
  const [records, setRecords] = useState([]);

  useEffect(() => {
    getRoadMapDetails().then((res) => {
      // Filter Records based on roadmapId.
      setRecords(res.data.filter((record) => record.roadmapId == roadmapId));
    });
  }, []);

  const handleDeleteRecord = (roadmapId) => {
    setRecords(records.filter((record) => record.id !== roadmapId));
  };
  const Breadcrumbitems = [
    { title: "Internship", href: "#" },
    { title: "Roadmap", href: "/roadmap" },
    { title: "Roadmap Details", href: "#" },
  ];
  const rows = records.map((tabData) => (
    <Table.Tr key={tabData.topic}>
      <Table.Td>{tabData.topic}</Table.Td>
      <Table.Td>{tabData.subtopic}</Table.Td>
      <Table.Td>{tabData.duration}</Table.Td>
      {/* <Table.Td style={{ textWrap: "nowrap" }}>{tabData.presenter}</Table.Td>
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
      </Table.Td> */}
      <Table.Td>
        <DropdownMenu
          id={tabData.id}
          onDelete={handleDeleteRecord}
          duration={tabData.duration}
        />
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Flex direction="column" className="content-wrapper">
      <Flex justify="space-between" align="center" className="sub-header">
        <div>
          <Breadcrumb data={Breadcrumbitems} />
          <h4 className="content-title">Roadmap Details</h4>
        </div>
        <Link to="add/new-details">
          <Button leftSection={<IconPlus size={14} />}>
            Add Roadmap Details
          </Button>
        </Link>
      </Flex>
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
              {/* <Table.Th>PRESENTER</Table.Th>
              <Table.Th>STATUS</Table.Th> */}
              <Table.Th></Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
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
      </div>
    </Flex>
  );
}

export default RoadmapDetailsTable;
