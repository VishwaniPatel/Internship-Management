// import Tables from "./components/table";
import { RoadMapTables } from "./components/RoadmapTable";
import FormModal from "./components/AddRoadmapModal";
import { Breadcrumbs, Anchor, Flex, Button } from "@mantine/core";
import { Link } from "react-router-dom";
import { IconPlus } from "@tabler/icons-react";

const items = [
  { title: "Internship", href: "#" },
  { title: "Roadmap", href: "#" },
].map((item, index) => (
  <Anchor href={item.href} key={index}>
    {item.title}
  </Anchor>
));
function Roadmap() {
  return (
    <Flex direction="column" className="content-wrapper">
      <Flex justify="space-between" align="center" className="sub-header">
        <div>
          <Breadcrumbs>{items}</Breadcrumbs>
          <h4 className="content-title">Roadmap</h4>
        </div>
        <Link to="add/new">
          <Button leftSection={<IconPlus size={14} />}>
            Add Roadmap Details
          </Button>
        </Link>
      </Flex>
      <RoadMapTables />
    </Flex>
  );
}

export default Roadmap;
