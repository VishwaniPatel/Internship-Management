import { ActionIcon, rem } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import React from "react";

function Header() {
  return (
    <header className="header">
      <ActionIcon
        size={34}
        radius="md"
        variant="default"
        aria-label="ActionIcon with size as a number"
      >
        <IconSearch style={{ width: rem(18), height: rem(18) }} />
      </ActionIcon>
    </header>
  );
}

export default Header;
