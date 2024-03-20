import { Flex, Menu, Table, UnstyledButton, rem } from "@mantine/core";
import {
  IconChevronDown,
  IconChevronUp,
  IconDotsVertical,
  IconSelector,
} from "@tabler/icons-react";
import MenuDropdown from "./MenuDropdown";
import useSort from "../../../shared/hooks/useSort";

const MentorList = ({ mentors, handleDelete }) => {
  const { sortedData, sortColumn, sortDirection, handleSortColumn } = useSort(
    mentors,
    "firstName",
    "asc"
  );
  

  const sortIconFirstName =
    sortColumn === "firstName" ? (
      sortDirection === "asc" ? (
        <IconChevronUp size={14} />
      ) : (
        <IconChevronDown size={14} />
      )
    ) : (
      <IconSelector size={14} />
    );

  const sortIconDomain =
    sortColumn === "domain" ? (
      sortDirection === "asc" ? (
        <IconChevronUp size={14} />
      ) : (
        <IconChevronDown size={14} />
      )
    ) : (
      <IconSelector size={14} />
    );

  // Display mentor details in table
  const rows = sortedData.map((data) => (
    <Table.Tr key={data.id}>
      <Table.Td>
        {data.firstName} {data.lastName}
      </Table.Td>
      <Table.Td>{data.emailId}</Table.Td>
      <Table.Td>{data.domain}</Table.Td>
      <Table.Td>
        <Menu shadow="md" width={120} position="bottom-end">
          <Menu.Target>
            <IconDotsVertical style={{ width: rem(18), height: rem(18) }} />
          </Menu.Target>
          {/* Dropdown menu to edit/delete details */}
          <MenuDropdown id={data.id} onDelete={handleDelete} />
        </Menu>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    // Start: table for displaying mentor details
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
            <Table.Th>
              <UnstyledButton
                w="100%"
                onClick={() => handleSortColumn("firstName")}
              >
                <Flex align="center" justify="space-between">
                  <span>NAME</span>
                  {sortIconFirstName}
                </Flex>
              </UnstyledButton>
            </Table.Th>
            <Table.Th>EMAIL ID</Table.Th>
            <Table.Th>
              <UnstyledButton
                w="100%"
                onClick={() => handleSortColumn("domain")}
              >
                <Flex align="center" justify="space-between">
                  <span>DOMAIN</span>
                  {sortIconDomain}
                </Flex>
              </UnstyledButton>
            </Table.Th>
            <Table.Th></Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </div>
    // End: table for displaying mentor details
  );
};

export default MentorList;
