/* eslint-disable react/prop-types */
import { Menu, rem, UnstyledButton } from "@mantine/core";
import { IconTrash, IconPencil, IconDotsVertical } from "@tabler/icons-react";

import { useNavigate } from "react-router-dom";
import { deleteInternsBatch } from "../utility/service/intern-batch.service";
// import axios from "axios";

export function DropdownMenu({ id, getInternBatchList }) {
  const navigate = useNavigate();

  function handleDelete(id) {
    if (window.confirm("Sure you want to delete the item?")) {
      deleteInternsBatch(id).then((res) => {
        if (res) {
          getInternBatchList();
        }
      });
    }
  }
  function handleEdit(id) {
    navigate(`edit-batch/${id}`);
  }
  return (
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
          onClick={() => handleEdit(id)}
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
          onClick={() => handleDelete(id)}
        >
          Delete
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
