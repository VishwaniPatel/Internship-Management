import { Button, Flex, Table, Text, Drawer } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getBatchRoadMap } from "../services/BatchRoadmap.service";
import { DropdownMenu } from "./DropdownMenu";
import { useDisclosure } from "@mantine/hooks";
import AddBatchRoadmapForm from "./AddBatchRoadmapForm";
import useBatchRoadmap from "../../../../../shared/hooks/useBatchRoadmap";
import InternshipContext from "../../../../../shared/store/Context";
import useSearch from "../../../../../shared/hooks/useSearch";
import useFilterData from "../../../../../shared/hooks/useFilterData";

export function BatchRoadmapList() {
  const { batchId, id } = useParams();
  const batchRoadmapData = useBatchRoadmap();
  const [records, setRecords] = useState([]);
  const [opened, { open, close }] = useDisclosure(false);
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = () => {
    setDrawerOpen((prevState) => !prevState);
  };
  const {searchTerm, selectedDomains} = useContext(InternshipContext);
 
  const title = id ? "Update Roadmap Detail" : "Add Roadmap Detail";
  // Filter Records based on roadmapId.
  const filteredRecords = batchId
  ? batchRoadmapData.filter((record) => record.batchId == batchId)
  : batchRoadmapData;
  useEffect(() => {
    setRecords(filteredRecords);
  }, [batchId, batchRoadmapData]);

  useEffect(()=>{
      // Define the keys for searching
    const searchKeys = ['topic','domain','mentor','duration']
     // Use the useSearch hook with the modified data and searchKeys
    const filterRoadmaps = useSearch(filteredRecords, searchTerm, searchKeys);
    setRecords(filterRoadmaps)
  },[searchTerm])

  const handleDeleteRecord = (batchId) => {
    setRecords(records.filter((record) => record.id !== batchId));
  };

  useEffect(() => {
    const filteredData = useFilterData(filteredRecords, selectedDomains)
    setRecords(filteredData);
  }, [selectedDomains])

  const rows = records.length > 0 &&  records.map((tabData) => (
    <Table.Tr key={tabData.id}>
      <Table.Td>{tabData.topic}</Table.Td>
      <Table.Td>{tabData.domain}</Table.Td>
      <Table.Td>{tabData.mentor}</Table.Td>
      <Table.Td>{tabData.duration}</Table.Td>
      <Table.Td>
        <DropdownMenu
          id={tabData.id}
          onDelete={handleDeleteRecord}
          openDrawer={toggleDrawer}
        />
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Flex direction="column">
      <Flex>
        {/* <Link style={{ marginLeft: "auto" }} to="addRoadmap/new"> */}
        <Button
          //   onClick={open}
          onClick={toggleDrawer}
          className="btn-sm"
          variant="light"
          ml="auto"
          leftSection={<IconPlus size={14} />}
        >
          Add
        </Button>
        {/* </Link> */}
      </Flex>
      <div>
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
              <Table.Th>DOMAIN</Table.Th>
              <Table.Th>MENTOR</Table.Th>
              <Table.Th>DURATION</Table.Th>
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
      <Drawer
        className="form-drawer"
        opened={drawerOpen}
        position="right"
        onClose={() => setDrawerOpen(false)}
        title={title}
        overlayProps={{ backgroundOpacity: 0.6, blur: 5 }}
        size={500}
        transitionProps={{
          transition: "scale",
          duration: 250,
          timingFunction: "ease",
          transformOrigin: "center center",
        }}
      >
        <AddBatchRoadmapForm closeDrawer={() => setDrawerOpen(false)} />
      </Drawer>
    </Flex>
  );
}
