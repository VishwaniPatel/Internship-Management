import { Menu, Button, rem, UnstyledButton } from "@mantine/core";
import { IconTrash, IconPencil, IconDotsVertical } from "@tabler/icons-react";
import { deleteRoadMapDetails } from "../service/RoadmapDetails.service";
import { Link, useParams } from "react-router-dom";
import ConfirmDelete from "./../../../../shared/common-components/confirmDelete";
import { useState } from "react";

export function DropdownMenu({ id, onDelete }) {
  const { roadmapId } = useParams();
  const [open, setOpen] = useState(false);
  // const [deleteData, setDeleteData] = useState("");

  function handleDelete() {
    // Delete Record from List
    deleteRoadMapDetails(id).then((res) => {
      setOpen(false);
      onDelete(id);
    });
  }

  // Opem Delete confirmtion box
  function openPopup() {
    setOpen(true);
  }
  return (
    <>
      <Menu shadow="md" position="bottom-end" width={200}>
        <Menu.Target>
          <UnstyledButton>
            <IconDotsVertical
              style={{ width: rem(18), height: rem(18) }}
            ></IconDotsVertical>
          </UnstyledButton>
        </Menu.Target>

        <Menu.Dropdown>
          <Link to={"/roadmap-details/" + roadmapId + "/edit-details/" + id}>
            <Menu.Item
              leftSection={
                <IconPencil style={{ width: rem(14), height: rem(14) }} />
              }
            >
              Edit
            </Menu.Item>
          </Link>
          <Menu.Item
            color="red"
            leftSection={
              <IconTrash style={{ width: rem(14), height: rem(14) }} />
            }
            onClick={(e) => openPopup()}
          >
            Delete
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
      {/* Confirmation POP-Up to delete Item */}
      <ConfirmDelete
        open={open}
        closeDialog={() => setOpen(false)}
        deleteFunction={handleDelete}
      />
    </>
  );
}
