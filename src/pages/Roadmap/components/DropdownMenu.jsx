import { Menu, Button, rem, UnstyledButton } from "@mantine/core";
import { IconTrash, IconPencil, IconDotsVertical } from "@tabler/icons-react";
import { deleteRoadMap } from "../service/Roadmap.service";
import { Link } from "react-router-dom";

function handleDelete(id) {
  deleteRoadMap(id).then((res) => {
    alert("Record has been deleted Successfully !");
  });
}

export function DropdownMenu({ id }) {
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
        <Link to={"/edit-roadmap/" + id}>
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
          onClick={(e) => handleDelete(id)}
        >
          Delete
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
