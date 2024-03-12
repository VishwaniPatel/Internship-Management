import { Button, Group, Select, rem, Box } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";
import { isNotEmpty, useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useMentors from "../../../../Mentors/hooks/useMentors";
import {
  addBatchRoadMap,
  getBatchRoadmapById,
  updateBatchRoadmap,
} from "../services/BatchRoadmap.service";
import useRoadmap from "../../../../../shared/hooks/useRoadmap";
import useDomain from "../../../../mentors/hooks/useDomain";

export default function AddBatchRoadmapForm({ closeDrawer }) {
  const navigate = useNavigate();
  const { batchId, id } = useParams();
  const btnText = id ? "Update" : "Add";
  // Get all Roadmap topics for topic dropdown
  const roadmapData = useRoadmap();
  const roadmapDropdownData = [];
  // Get all Mentor details for mentor dropdown
  const mentorData = useMentors();
  const mentorDropdownData = [];
  //   Get Domain Data for doamin Dropdown
  const domainData = useDomain();

  // Form Values
  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      batchId: batchId,
      topic: "",
      domain: "",
      duration: "",
      mentor: "",
    },
    transformValues: (values) => ({
      batchId: batchId,
      topic: `${values.topic}`,
      domain: `${values.domain}`,
      duration: `${values.duration}`,
      mentor: `${values.mentor}`,
    }),
    // validate: {
    //   // Empty strings are considered to be invalid
    //   topic: isNotEmpty("Topic cannot be empty"),
    //   domain: isNotEmpty("Subtopic cannot be empty"),
    //   mentor: isNotEmpty("Duration cannot be empty"),
    // },
  });
  const isFormValidate = form.isValid();
  //   To Get All selected Values
  const selectedValues = form.getTransformedValues();
  // Form Submit button
  function handleFormSubmit(values) {
    //  Find the duration based on selected value
    const selectedOption = roadmapData.find(
      (option) => option.name === selectedValues.topic
    );
    // Set duration field
    const newValues = { ...values, duration: selectedOption.totalDuration };
    if (id) {
      // If ID is present, update the existing roadmap
      updateBatchRoadmap(id, newValues);
    } else {
      // If no ID is present, add a new roadmap
      addBatchRoadMap(newValues);
    }
    closeDrawer();
    navigate("/intern-batch/details/" + batchId);
  }

  useEffect(() => {
    const fetchRoadmapDetails = async () => {
      if (id) {
        try {
          // Fetch Roadmap details by ID
          const roadmapDetails = await getBatchRoadmapById(id);
          // Populate the form with fetched details
          form.setValues(roadmapDetails.data);
        } catch (error) {
          console.error("Error fetching roadmap details:", error);
        }
      }
    };
    fetchRoadmapDetails();
  }, [id]);

  function handleCancel() {
    closeDrawer();
    navigate("/intern-batch/details/" + batchId);
  }

  // Add Data for Mentor Dropddown
  mentorData
    .filter((record) => record.domain == selectedValues.domain)
    .map((mentor) => {
      mentorDropdownData.push(mentor.firstName + " " + mentor.lastName);
    });

  // Add Data for Topic Dropddown
  roadmapData
    .filter((record) => record.domain == selectedValues.domain)
    .map((data) => {
      roadmapDropdownData.push(data.name);
    });
  return (
    <>
      <Box>
        <form
          style={{ backgroundColor: "white" }}
          onSubmit={form.onSubmit((values) => handleFormSubmit(values))}
        >
          {/* Domain Dropdown */}
          <Select
            mt="md"
            label="Select Domain"
            placeholder="Select Domain"
            checkIconPosition="right"
            data={domainData}
            maxDropdownHeight={180}
            rightSection={
              <IconChevronDown style={{ width: rem(16), height: rem(16) }} />
            }
            {...form.getInputProps("domain")}
          />
          {/* Conditionnal based rendering, If we select Domain then only other dropdowns are visible */}
          {selectedValues.domain && (
            <>
              {/* Topic Dropdown */}
              <Select
                mt="md"
                disabled={!selectedValues.domain}
                label="Select Topic"
                placeholder="Select Topic"
                checkIconPosition="right"
                data={roadmapDropdownData}
                // data={roadmapDropdownData.map((entry) => entry.name)}
                maxDropdownHeight={200}
                rightSection={
                  <IconChevronDown
                    style={{ width: rem(16), height: rem(16) }}
                  />
                }
                {...form.getInputProps("topic")}
              />
              {/* Mentor Dropdown */}
              <Select
                mt="md"
                disabled={!selectedValues.domain}
                label="Select Mentor"
                placeholder="Select Mentor"
                checkIconPosition="right"
                data={mentorDropdownData}
                maxDropdownHeight={200}
                rightSection={
                  <IconChevronDown
                    style={{ width: rem(16), height: rem(16) }}
                  />
                }
                {...form.getInputProps("mentor")}
              />
              {/* Drawer footer with action Buttons */}
              <Group className="drawer-form-footer" justify="flex-end" mt="xl">
                <Button variant="default" onClick={handleCancel}>
                  Cancle
                </Button>
                <Button disabled={!isFormValidate} type="submit">
                  {btnText}
                </Button>
              </Group>
            </>
          )}
        </form>
      </Box>
    </>
  );
}
