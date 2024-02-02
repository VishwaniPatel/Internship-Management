import {
  Modal,
  Button,
  TextInput,
  Textarea,
  Group,
  Flex,
  Select,
  rem,
  Breadcrumbs,
  Anchor,
  Grid,
} from "@mantine/core";
import { IconPlus, IconChevronDown } from "@tabler/icons-react";
import {
  addRoadMap,
  updateRoadmap,
  getRoadmapById,
} from "../service/Roadmap.service";
import { useForm } from "@mantine/form";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function FormModal() {
  const navigate = useNavigate();
  const { id } = useParams();
  let isId = true;
  // Form Values
  const form = useForm({
    initialValues: {
      topic: "",
      subtopic: "",
      duration: "",
    },
  });
  if (id) {
    isId = true;
  } else {
    isId = false;
  }
  // Form Submit button
  function handleFormSubmit(values) {
    if (id) {
      // If ID is present, update the existing roadmap
      updateRoadmap(id, values);
    } else {
      // If no ID is present, add a new roadmap
      addRoadMap(values);
    }
    navigate("/roadmap");
  }

  useEffect(() => {
    const fetchRoadmapDetails = async () => {
      if (id) {
        try {
          // Fetch mentor details by ID
          const roadmapDetails = await getRoadmapById(id);

          // Populate the form with fetched details
          form.setValues(roadmapDetails.data);
        } catch (error) {
          console.error("Error fetching mentor details:", error);
        }
      }
    };

    fetchRoadmapDetails();
  }, [id]);

  // Breadcrumbs Details
  const items = [
    { title: "Internship", href: "#" },
    { title: "Roadmap", href: "/roadmap" },
    { title: "Add Roadmap Details", href: "#" },
  ].map((item, index) => (
    <Anchor href={item.href} key={index}>
      {item.title}
    </Anchor>
  ));

  function handleCancel() {
    navigate("/roadmap");
  }
  let title = isId ? "Update Roadmap Detail" : "Add Roadmap Detail";
  let btnText = isId ? "Update" : "Add";
  return (
    <>
      <Flex direction="column" className="content-wrapper">
        <Flex justify="space-between" align="center" className="sub-header">
          <div>
            <Breadcrumbs>{items}</Breadcrumbs>
            <h4 className="content-title">{title}</h4>
          </div>
        </Flex>
        <Grid className="form-wrapper" columns={24}>
          <Grid.Col style={{ height: "100%" }} span={12}>
            <form
              className="add-form"
              style={{ backgroundColor: "white" }}
              onSubmit={form.onSubmit((values) => handleFormSubmit(values))}
            >
              <TextInput
                withAsterisk
                label="Topic"
                placeholder="Enter Topic"
                {...form.getInputProps("topic")}
              />
              <Textarea
                mt="md"
                label="SubTopic"
                withAsterisk
                placeholder="Enter Description about topic"
                {...form.getInputProps("subtopic")}
              />

              <Select
                mt="md"
                label="Duration"
                checkIconPosition="right"
                placeholder="Select Duration"
                data={["15m", "30m", "1hr", "1hr 30m"]}
                rightSection={
                  <IconChevronDown
                    style={{ width: rem(16), height: rem(16) }}
                  />
                }
                {...form.getInputProps("duration")}
              />

              <Group justify="flex-end" mt="lg">
                <Button variant="default" onClick={handleCancel} type="submit">
                  Cancle
                </Button>
                <Button type="submit">{btnText}</Button>
              </Group>
            </form>
          </Grid.Col>
        </Grid>
      </Flex>
    </>
  );
}
