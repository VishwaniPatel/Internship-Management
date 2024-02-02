import { Flex } from "@mantine/core";
import Roadmap from "./pages/Roadmap/roadmap";
import Sidebar from "./core/components/sidebar/Sidebar";
import Header from "./core/components/header/Header";
import Routing from "./App.routing";

function App() {
  return (
    <Flex className="main-wrapper">
      <Sidebar />
      <Flex
        style={{ width: "100%", height: "100%", overflow: "hidden" }}
        direction="column"
      >
        <Header />
        <Routing></Routing>
      </Flex>
    </Flex>
  );
}

export default App;
