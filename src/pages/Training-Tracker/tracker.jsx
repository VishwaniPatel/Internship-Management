import React from "react";
import { Flex, Button, Text } from "@mantine/core";
import { Link } from "react-router-dom";
import { IconPlus } from "@tabler/icons-react";
import { Breadcrumb } from "../../shared/common-components/Breadcrumb";

const Breadcrumbitems = [
  { title: "Internship", href: "#" },
  { title: "Training Tracker", href: "#" },
];
export default function TrainingTracker() {
  return (
    <Flex direction="column" className="content-wrapper">
      <Flex justify="space-between" align="center" className="sub-header">
        <div>
          <Breadcrumb data={Breadcrumbitems} />
          <h4 className="content-title">Training Tracker</h4>
        </div>
      </Flex>
      <Text p="md">Training Tracker Goes Here</Text>
    </Flex>
  );
}
