import {
  Box,
  Breadcrumbs,
  Button,
  Group,
  Menu,
  Table,
  UnstyledButton,
  rem,
} from "@mantine/core";
import { useEffect, useState } from "react";
import {
  getByIdInternData, putInternData,
} from "../utility/service/intern.service";
import {
  IconDotsVertical,
  IconPencil,
  IconPlus,
  IconTrash,
} from "@tabler/icons-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getByIdInternBatchData } from "../../intern-batch/utility/service/intern-batch.service";



const InternList = () => {
  let { batchId } = useParams();
  const navigate = useNavigate();
  const [internList, setInternList] = useState([]);

  const getInternList = () => {
    getByIdInternBatchData(batchId).then((response) => {
      setInternList(response.data);
    });
  };
 
  const items = [{ title: "Intern-Batch", href: "/intern-batch" },{ title: `${internList.batchname}`, href: "#" }].map(
    (item, index) => (
      <Link to={item.href} key={index}>
        {item.title}
      </Link>
    )
  );

  useEffect(() => {
    getInternList();
  }, []);

  /** edit the intern data */
  function handleEdit(id) {
    navigate(`edit-intern/${id}`);
  }

  /** Remove the intern data  */
  const removeItem = (id) => {
    if (window.confirm("Sure you want to delete the item?")) {
       const deleteId = internList.intern.filter((res)=> res.internId!==id)
       const updateBatchDetails={
        ...internList,
        intern:deleteId
       }
       putInternData(batchId,updateBatchDetails).then((res) => {
        if (res) {
          getByIdInternData(batchId).then((response) => {
            setInternList(response.data);
          });
        }
      });
    }
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
            <Menu.Target>
              <UnstyledButton>
                <IconDotsVertical
                  style={{ width: rem(18), height: rem(18) }}
                ></IconDotsVertical>
              </UnstyledButton>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item
                onClick={() => handleEdit(row.internId)}
                leftSection={
                  <IconPencil style={{ width: rem(14), height: rem(14) }} />
                }
              >
                Edit
              </Menu.Item>
              <Menu.Item
                color="red"
                leftSection={
                  <IconTrash style={{ width: rem(14), height: rem(14) }} />
                }
                onClick={() => removeItem(row.internId)}
              >
                Delete
              </Menu.Item>
            </Menu.Dropdown>
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
          <Breadcrumbs>
            {items}
          </Breadcrumbs>

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
