import { Flex, Box, Group } from "@mantine/core";
import { Breadcrumb } from "../../shared/common-components/Breadcrumb";
import { Tabs } from "@mantine/core";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BatchInterns } from "./components/BatchInterns/BatchInterns";
import { getByIdInternBatchData } from "../intern-batch/utility/service/InternBatch.service";
import { BatchRoadmapList } from "./components/BatchRoadmap/components/BatchRoadmapList";
import BatchMentor from "./components/BatchMentor/BatchMentor";
import SearchBox from "../../shared/common-components/SearchBox";
import FilterPopover from "../../shared/common-components/FilterPopover";
import InternshipContext from "../../shared/store/Context";
export function InternshipBatchDetails() {
  let { batchId } = useParams();

  const [activeTab, setActiveTab] = useState("interns");
  const [batchName, setBatchName] = useState();
  const {selectedDomains, setSelectedDomains} = useContext(InternshipContext);

  const items = [
    { title: "Internship", href: "#" },
    { title: "Intern-Batch", href: "/intern-batch" },
    { title: `${batchName}`, href: "#" },
  ];

  const handleDomainChange = (selected) => {
    setSelectedDomains(selected);
  };

  useEffect(() => {
    getByIdInternBatchData(batchId).then((response) => {
      if (response) {
        setBatchName(response.data.batchname);
        localStorage.setItem("batch_name",`${batchName}`);
      }
    });
  });
  return (
    <Flex direction="column" className="content-wrapper">
      <Flex justify="space-between" align="center" className="sub-header">
        <div>
          <Breadcrumb data={items} />
          <h4 className="content-title">{batchName}</h4>
        </div>
        <Flex>
        <SearchBox/>
        <FilterPopover selectedDomains={selectedDomains}
            onDomainChange={handleDomainChange}/>
        </Flex>
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
            <BatchInterns/>
          </Tabs.Panel>
          <Tabs.Panel className="tab-panel" value="mentors">
            <BatchMentor />
          </Tabs.Panel>
          <Tabs.Panel className="tab-panel" value="roadmaps">
            <BatchRoadmapList />
          </Tabs.Panel>
        </Tabs>
      </Box>
    </Flex>
  );
}
