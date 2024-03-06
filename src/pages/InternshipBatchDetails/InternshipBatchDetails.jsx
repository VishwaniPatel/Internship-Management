import { Flex, Box } from "@mantine/core";
import { Breadcrumb } from "../../shared/common-components/Breadcrumb";
import { Tabs, rem } from "@mantine/core";
import { useState } from "react";
import { BatchRoadmapList } from "./components/BatchRoadmap/components/BatchRoadmapList";

const items = [
  { title: "Internship", href: "#" },
  { title: "Intern-Batch", href: "/intern-batch" },
];

export function InternshipBatchDetails() {
  const [activeTab, setActiveTab] = useState("interns");
  return (
    <Flex direction="column" className="content-wrapper">
      <Flex justify="space-between" align="center" className="sub-header">
        <div>
          <Breadcrumb data={items} />
          <h4 className="content-title">InternBatch</h4>
        </div>
      </Flex>
      {/* Tab Container */}

      <Box className="tab-container">
        <Tabs
          m="md"
          className="tab-list-wrapper"
          value={activeTab}
          onChange={setActiveTab}
        >
          <Tabs.List>
            <Tabs.Tab className="tab-btn" value="interns">
              Interns
            </Tabs.Tab>
            <Tabs.Tab className="tab-btn" value="mentors">
              Mentors
            </Tabs.Tab>
            <Tabs.Tab className="tab-btn" value="roadmaps">
              Roadmaps
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel className="tab-panel" value="interns">
            Intern panel
          </Tabs.Panel>
          <Tabs.Panel className="tab-panel" value="mentors">
            Mentor panel
          </Tabs.Panel>
          <Tabs.Panel className="tab-panel" value="roadmaps">
            <BatchRoadmapList />
          </Tabs.Panel>
        </Tabs>
      </Box>
    </Flex>
  );
}
