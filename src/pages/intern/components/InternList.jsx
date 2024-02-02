import cx from "clsx";
import {
  Box,
  // Button,
  Group,
  Menu,
  ScrollArea,
  Table,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { useEffect, useState } from "react";
import {
  deleteInternData,
  getInternData,
} from "../utility/service/intern.service";
import { IconDotsVertical } from "@tabler/icons-react";
import InternForm from "./InternForm";
import { useDisclosure } from "@mantine/hooks";

const InternList = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [scrolled, setScrolled] = useState(false);
  const [internList, setInternList] = useState([]);
  const [id, setGetId] = useState(null);

  const getInternList = () => {
    getInternData().then((response) => {
      setInternList(response.data);
    });
  };

  useEffect(() => {
    getInternList();
  }, []);

  const getIdByCall = (id) => {
    setGetId(id);
    open();
  };

  const removeItem = (id) => {
    deleteInternData(id);
    getInternData().then((response) => {
      setInternList(response.data);
    });
  };

  const rows =
    internList &&
    internList.map((row) => (
      <Table.Tr key={row.firstName}>
        <Table.Td>{row.firstName}</Table.Td>
        <Table.Td>{row.lastName}</Table.Td>
        <Table.Td>{row.email}</Table.Td>
        <Table.Td>{row.contact}</Table.Td>
        <Table.Td>{row.domain}</Table.Td>
        <Table.Td align="center">
          <Menu>
            <Menu.Target>
              <UnstyledButton>
                <IconDotsVertical></IconDotsVertical>
              </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item onClick={() => getIdByCall(row.id)}>Edit</Menu.Item>
              <Menu.Item onClick={() => removeItem(row.id)}>Delete</Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Table.Td>
      </Table.Tr>
    ));

  return (
    <Box style={{ flexGrow: 1 }} p="lg">
      <Group justify="space-between">
        <Text>Internship Batch &gt; July-2023</Text>
        <InternForm
          opened={opened}
          open={open}
          close={close}
          getInternList={getInternList}
          getId={id}
          setId={setGetId}
        >
          +Add New
        </InternForm>
      </Group>

      <ScrollArea
        h={300}
        mt="lg"
        onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
      >
        <Table stickyHeader withTableBorder withColumnBorders>
          <Table.Thead
            
          >
            <Table.Tr>
              <Table.Th>FirstName</Table.Th>
              <Table.Th>LastName</Table.Th>
              <Table.Th>Email</Table.Th>
              <Table.Th>Contact</Table.Th>
              <Table.Th>Domain</Table.Th>
              <Table.Th></Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </ScrollArea>
    </Box>
  );
};
export default InternList;
