import { Drawer, Menu, Table, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import {
  deleteInternDetails,
} from "../utility/service/BatchIntern.service";
import { Link, useParams } from "react-router-dom";
import { DropdownMenu } from "./DropDownMenu";
import { useDisclosure } from "@mantine/hooks";
import AddBatchInternForm from "./AddBatchInternForm";
import { useBatchIntern } from "../hooks/useBatchIntern";

// eslint-disable-next-line react/prop-types
const BatchInternList = ({ openDrawer, closeDrawer }) => {
  let { batchId } = useParams();
  const batchInternData = useBatchIntern();

  const [internList, setInternList] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [opened, { open, close }] = useDisclosure(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editFormId, setEditFormId] = useState();

  let title = editFormId ? "Update Intern Details" : "Add Intern Details";
  const toggleDrawer = () => {
    setDrawerOpen((prevState) => !prevState);
  };

  //** getIntern List */
  const getInternList = () => {
    if (batchId) {
      setInternList(
        batchInternData.filter((record) => record.batchId == batchId)
      );
      setEditFormId(null);
    }
  };

  useEffect(() => {
    getInternList();
  }, [batchId,batchInternData]);

  //** set Drawer for open/close  */
  useEffect(() => {
    setDrawerOpen(openDrawer);
  }, [openDrawer]);

  /** Remove the intern data  */
  const removeItem = (id) => {
    deleteInternDetails(id).then((res) => {
      if (res) {
        getInternList();
      }
    });
  };

  //** set editId for updated state  */
  const editId = (id) => {
    setEditFormId(id);
  };

  //** Drawer close for and field value */
  const setDrawerClose = () => {
    setDrawerOpen(false);
    setEditFormId(null);
    closeDrawer(false);
  };
  const rows =
    internList &&
    internList.map((row) => (
      <Table.Tr key={row.firstName}>
        <Table.Td>
          <Link
            className="profile-link"
            to={`/intern-batch/details/${batchId}/profile/${row.id}`}
          >
            {row.firstName} {row.lastName}
          </Link>
        </Table.Td>
        <Table.Td>{row.email}</Table.Td>
        <Table.Td>{row.contact}</Table.Td>
        <Table.Td>{row.domain}</Table.Td>
        <Table.Td align="center">
          <Menu shadow="md" position="bottom-end" width={200}>
            <DropdownMenu
              removeItem={removeItem}
              id={row.id}
              openDrawer={toggleDrawer}
              editId={editId}
            />
          </Menu>
        </Table.Td>
      </Table.Tr>
    ));

  return (
    <>
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
              <Table.Th>FULL-NAME</Table.Th>
              <Table.Th>EMAIL</Table.Th>
              <Table.Th>CONTACT</Table.Th>
              <Table.Th>DOMAIN</Table.Th>
              <Table.Th></Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {internList.length == 0 ? (
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
        title={title}
        onClose={() => setDrawerClose()}
        overlayProps={{ backgroundOpacity: 0.6, blur: 5 }}
        size={500}
        transitionProps={{
          transition: "scale",
          duration: 250,
          timingFunction: "ease",
          transformOrigin: "center center",
        }}
      >
        <AddBatchInternForm
          editFormId={editFormId}
          getInternList={getInternList}
          closeDrawer={() => setDrawerClose()}
        />
      </Drawer>
    </>
  );
};
export default BatchInternList;
