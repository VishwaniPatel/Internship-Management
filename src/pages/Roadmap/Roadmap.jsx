// import Tables from "./components/table";
import { RoadMapTables } from "./components/RoadmapTable";
import { Flex, Button } from "@mantine/core";
import { Link } from "react-router-dom";
import { IconPlus } from "@tabler/icons-react";
import { Breadcrumb } from "../../shared/common-components/Breadcrumb";
import RoadmapDetailsTable from "./Roadmap-Details/components/RoadmapDetailsTable";

const Breadcrumbitems = [
  { title: "Internship", href: "#" },
  { title: "Roadmap", href: "#" },
];
function Roadmap() {
  return (
    <Flex direction="column" className="content-wrapper">
      <Flex justify="space-between" align="center" className="sub-header">
        <div>
          <Breadcrumb data={Breadcrumbitems} />
          <h4 className="content-title">Roadmap</h4>
        </div>
        <Link to="add/new">
          <Button leftSection={<IconPlus size={14} />}>Add New Folder</Button>
        </Link>
      </Flex>
      <RoadMapTables />
    </Flex>
  );
}

export default Roadmap;
