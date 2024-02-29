import { Box, Breadcrumbs, Button, Group, Menu, Table } from "@mantine/core";
import { useEffect, useState } from "react";
import {
  getByIdInternData,
  putInternData,
} from "../utility/service/intern.service";
import { IconPlus } from "@tabler/icons-react";
import { Link, useParams } from "react-router-dom";
// import { getByIdInternBatchData } from "../../intern-batch/utility/service/intern-batch.service";
import { DropdownMenu } from "./DropDownMenu";
import { getByIdInternBatchData } from "../../Intern-batch/utility/service/intern-batch.service";

const InternList = () => {
  let { batchId } = useParams();

  const [internList, setInternList] = useState([]);

  const getInternList = () => {
    getByIdInternBatchData(batchId).then((response) => {
      setInternList(response.data);
    });
  };

  const items = [
    { title: "Intern-Batch", href: "/intern-batch" },
    { title: `${internList.batchname}`, href: "#" },
  ].map((item, index) => (
    <Link to={item.href} key={index}>
      {item.title}
    </Link>
  ));

  useEffect(() => {
    getInternList();
  }, []);

  /** Remove the intern data  */
  const removeItem = (id) => {
    const deleteId = internList.intern.filter((res) => res.internId !== id);
    const updateBatchDetails = {
      ...internList,
      intern: deleteId,
    };
    putInternData(batchId, updateBatchDetails).then((res) => {
      if (res) {
        getByIdInternData(batchId).then((response) => {
          setInternList(response.data);
        });
      }
    });
  };

  const rows =
    internList.intern &&
    internList.intern.map((row) => (
      <Table.Tr key={row.firstName}>
        <Table.Td>
          <Link
            className="profile-link"
            to={`/intern-batch/${batchId}/profile/${row.internId}`}
          >
            {row.firstName} {row.lastName}
          </Link>
        </Table.Td>
        <Table.Td>{row.email}</Table.Td>
        <Table.Td>{row.contact}</Table.Td>
        <Table.Td>{row.domain}</Table.Td>
        <Table.Td align="center">
          <Menu shadow="md" position="bottom-end" width={200}>
            <DropdownMenu removeItem={removeItem} id={row.internId} />
          </Menu>
        </Table.Td>
      </Table.Tr>
    ));

  return (
    <div className="content-wrapper">
      <Box
        style={{ flexGrow: 1 }}
        p="lg"
        justify="space-between"
        align="center"
        className="sub-header"
      >
        <Group justify="space-between">
          <div>
            <Breadcrumbs>{items}</Breadcrumbs>
            <h4 className="content-title" style={{ textAlign: "left" }}>
              Interns
            </h4>
          </div>
          <Link to={"intern/add/new"}>
            <Button leftSection={<IconPlus size={14} />}>Add New Intern</Button>
          </Link>
        </Group>
      </Box>
      <div className="table-container">
        <Table highlightOnHover withTableBorder withColumnBorders mt="md">
          <Table.Thead bg="#f1f3f5">
            <Table.Tr>
              <Table.Th>FULL-NAME</Table.Th>
              <Table.Th>EMAIL</Table.Th>
              <Table.Th>CONTACT</Table.Th>
              <Table.Th>DOMAIN</Table.Th>
              <Table.Th></Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </div>
    </div>
  );
};
export default InternList;
