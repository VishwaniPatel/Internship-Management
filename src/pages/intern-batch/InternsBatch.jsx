import { Flex, Button, Group } from "@mantine/core";
import { Breadcrumb } from "../../shared/common-components/Breadcrumb";
import { Link } from "react-router-dom";
import { IconPlus } from "@tabler/icons-react";
import { InternsBatchTable } from "./components/InternsBatchTable";
import SearchBox from "../../shared/common-components/SearchBox";

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
        <Flex>
        <SearchBox/>
        <Link to="batch/add/new">
          <Button leftSection={<IconPlus size={14} />}>Add New Batch</Button>
        </Link>
        </Flex>
      </Flex>
      <InternsBatchTable />
    </Flex>
  );
};
