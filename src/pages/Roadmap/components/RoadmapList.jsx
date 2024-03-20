import {
  Grid,
  Card,
  Group,
  Table,
  Text,
  Box,
  Flex,
  Stack,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { getRoadMapData, updateRoadmap } from "../service/Roadmap.service";
import { DropdownMenu } from "./DropdownMenu";
import { Link, useParams } from "react-router-dom";
import { IconFolderCode } from "@tabler/icons-react";
import useRoadmap from "../../../shared/hooks/useRoadmap";

export function RoadMapList() {
  const { roadmapId } = useParams();
  const roadmapData = useRoadmap();
  const [records, setRecords] = useState([]);

  useEffect(() => {
    setRecords(roadmapData);
  }, [roadmapData]);
  const handleDeleteRecord = (id) => {
    setRecords(records.filter((record) => record.id !== id));
  };

  const rows = records.map((tabData) => (
    <Grid.Col span={3} key={tabData.id}>
      <Card
        className="roadmap-folder"
        shadow="sm"
        padding="md"
        radius="md"
        withBorder
      >
        <Flex align="center">
          <Box className="folder-icon">
            <IconFolderCode color="#00488A"></IconFolderCode>
          </Box>
          <Stack w="100%" gap="xs" ml="md">
            <Link to={"/roadmap-details/" + tabData.id} className="text-link">
              {tabData.name}
            </Link>
            <Text className="roadmap-domain"> {tabData.domain}</Text>
          </Stack>
          <DropdownMenu id={tabData.id} onDelete={handleDeleteRecord} />
        </Flex>
      </Card>
    </Grid.Col>
  ));
  return <Grid p="lg">{rows}</Grid>;
}
