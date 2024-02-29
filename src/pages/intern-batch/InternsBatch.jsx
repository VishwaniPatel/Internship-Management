import { Flex, Button } from "@mantine/core";
import { Breadcrumb } from "../../shared/common-components/Breadcrumb";
import { Link } from "react-router-dom";
import { IconPlus } from "@tabler/icons-react";
import InternsBatchTable from "./components/InternsBatchTable";

const items = [
  { title: "Internship", href: "#" },
  { title: "Intern-Batch", href: "/intern-batch" },
];

export const InternsBatch = () => {
  return (
    <Flex direction="column" className="content-wrapper">
      <Flex justify="space-between" align="center" className="sub-header">
        <div>
          <Breadcrumb data={items} />
          <h4 className="content-title">InternBatch</h4>
        </div>
        <Link to="batch/add/new">
          <Button leftSection={<IconPlus size={14} />}>Add New Batch</Button>
        </Link>
      </Flex>
      <InternsBatchTable />
    </Flex>
  );
};
