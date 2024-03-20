import React from "react";
import { Flex, Table, Box } from "@mantine/core";
import { Breadcrumb } from "../../shared/common-components/Breadcrumb";
import useDomain from "../mentors/hooks/useDomain";
import useBatchRoadmap from "../../shared/hooks/useBatchRoadmap";

const Breadcrumbitems = [
  { title: "Internship", href: "#" },
  { title: "Training Tracker", href: "#" },
];

// Sample domain array
const domainArray = [
  "Domain 1",
  "Domain 2",
  "Domain 3",
  "Domain 4",
  "Domain 5",
];

// Sample start and end dates
const startDate = new Date("2024-01-01");
const endDate = new Date("2024-02-07");

// Function to generate an array of dates between start and end dates
const generateDateRange = (start, end) => {
  const dates = [];
  for (
    let date = new Date(start);
    date <= end;
    date.setDate(date.getDate() + 1)
  ) {
    dates.push(new Date(date));
  }
  return dates;
};

// Array of dates between start and end dates
const dateRange = generateDateRange(startDate, endDate);
const days = dateRange.map((date) => {
  const day = String(date.getDate()).padStart(2, "0");
  return `day ${day}`;
});
export default function TrainingTracker() {
  const domains = useDomain();
  // console.log(domains);
  const batchRoadmapData = useBatchRoadmap();
  console.log("Data is :", batchRoadmapData);

  const row = domains.map((domain) => (
    <Table.Tr key={domain.id}>
      <Table.Td className="sticky-cell">{domain.value}</Table.Td>
      {dateRange.map((date, index) => (
        <Table.Td key={index}>
          Data for {domain.value} on {date.toLocaleDateString()}
        </Table.Td>
      ))}
    </Table.Tr>
  ));
  return (
    <Flex direction="column" className="content-wrapper">
      <Flex justify="space-between" align="center" className="sub-header">
        <div>
          <Breadcrumb data={Breadcrumbitems} />
          <h4 className="content-title">Training Tracker</h4>
        </div>
      </Flex>
      <Box className="timeline-wrapper">
        <Table className="timeline-table" stickyHeader stickyHeaderOffset={6}>
          <Table.Thead>
            <Table.Tr>
              <Table.Th></Table.Th>
              {dateRange.map((date, index) => (
                <Table.Th key={index}>
                  {date.toLocaleDateString()} {days[index]}
                </Table.Th>
              ))}
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{row}</Table.Tbody>
        </Table>
      </Box>
    </Flex>
  );
}
