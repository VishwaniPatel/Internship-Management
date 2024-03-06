import { Button, Group, Select, rem, Box } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";
import { isNotEmpty, useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useMentors from "../../../../Mentors/hooks/useMentors";
import useDomain from "../../../../Mentors/hooks/useDomain";
import {
  addBatchRoadMap,
  getBatchRoadmapById,
  updateBatchRoadmap,
} from "../services/BatchRoadmap.service";
import { getRoadMapData } from "../../../../Roadmap/service/Roadmap.service";

export default function AddBatchRoadmapForm({ closeDrawer }) {
  const navigate = useNavigate();
  const { batchId, id } = useParams();
  const btnText = id ? "Update" : "Add";
  const [roadmapData, setRoadmapData] = useState([]);
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
    validate: {
      // Empty strings are considered to be invalid
      topic: isNotEmpty("Topic cannot be empty"),
      domain: isNotEmpty("Subtopic cannot be empty"),
      mentor: isNotEmpty("Duration cannot be empty"),
    },
  });
  const isFormValidate = form.isValid();

  // Form Submit button
  function handleFormSubmit(values) {
    if (id) {
      // If ID is present, update the existing roadmap
      updateBatchRoadmap(id, values);
    } else {
      // If no ID is present, add a new roadmap
      addBatchRoadMap(values);
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
    // To get Roadmap Data for Title dropdown
    fetchRoadmapDetails();
    getRoadMapData().then((res) => {
      setRoadmapData(res.data);
    });
  }, [id]);

  function handleCancel() {
    closeDrawer();
  }
  // Add Data for Mentor Dropddown
  mentorData.map((mentor) => {
    mentorDropdownData.push(mentor.firstName + " " + mentor.lastName);
  });
  // Add Data for Topic Dropddown
  roadmapData.map((data) => {
    roadmapDropdownData.push(data.name);
  });

  // Handle change in domain dropdown
  const [selectedDomain, setSelectedDomain] = useState(null);

  const handleSelectChange = (value) => {
    setSelectedDomain(value);
  };
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
            value={selectedDomain}
            onChange={handleSelectChange}
            rightSection={
              <IconChevronDown style={{ width: rem(16), height: rem(16) }} />
            }
            {...form.getInputProps("domain")}
          />
          {/* Topic Dropdown */}
          <Select
            mt="md"
            label="Select Topic"
            placeholder="Select Topic"
            checkIconPosition="right"
            data={roadmapDropdownData}
            maxDropdownHeight={200}
            rightSection={
              <IconChevronDown style={{ width: rem(16), height: rem(16) }} />
            }
            {...form.getInputProps("topic")}
          />
          {/* Mentor Dropdown */}
          <Select
            mt="md"
            label="Select Mentor"
            placeholder="Select Mentor"
            checkIconPosition="right"
            data={mentorDropdownData}
            maxDropdownHeight={200}
            rightSection={
              <IconChevronDown style={{ width: rem(16), height: rem(16) }} />
            }
            {...form.getInputProps("mentor")}
          />

          <Select
            mt="md"
            label="Duration"
            checkIconPosition="right"
            placeholder="Select Duration"
            data={["15m", "30m", "1hr", "1hr 30m"]}
            rightSection={
              <IconChevronDown style={{ width: rem(16), height: rem(16) }} />
            }
            {...form.getInputProps("duration")}
          />

          <Group justify="flex-end" mt="lg">
            <Button variant="default" onClick={handleCancel} type="cancle">
              Cancle
            </Button>
            <Button disabled={!isFormValidate} type="submit">
              {btnText}{" "}
            </Button>
          </Group>
        </form>
      </Box>
    </>
  );
}
