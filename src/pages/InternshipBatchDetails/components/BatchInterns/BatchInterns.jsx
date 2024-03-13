import { Flex, Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import InternsList from "./components/InternList";
import { useState } from "react";

export const BatchInterns = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  //** set value of drawer */
  const closeDrawer = () => {
    setDrawerOpen(false);
  };
  return (
    <Flex direction="column">
      <Flex justify="end" align="center" >
        <Button
          variant="light"
          ml="auto"
          className="btn-sm"
          onClick={() => setDrawerOpen(true)}
          leftSection={<IconPlus size={14} />}
        >
          Add 
        </Button>
      </Flex>
      <InternsList openDrawer={drawerOpen} closeDrawer={closeDrawer} />
    </Flex>
  );
};
