import { Flex } from "@mantine/core";
import AppRouting from "./App.routing";
import { HeaderTabs } from "./core/components/Header";
import SideBarTabs from "./core/components/Sidebar";

function App() {
  return (
    <Flex  style={{ height: "100%" }}>
      <SideBarTabs></SideBarTabs>
      <Flex direction="column" w="100%">
        <HeaderTabs></HeaderTabs>
        <AppRouting></AppRouting>
      </Flex>
    </Flex>
  );
}

export default App;
