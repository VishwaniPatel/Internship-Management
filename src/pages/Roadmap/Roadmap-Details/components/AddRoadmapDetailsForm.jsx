import {
  Button,
  TextInput,
  Textarea,
  Group,
  Flex,
  Select,
  rem,
  em,
  Grid,
  Box,
} from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";
import { getRoadmapById, updateRoadmap } from "../../service/Roadmap.service";
import { isNotEmpty, useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMediaQuery } from "@mantine/hooks";
import useMentors from "../../../Mentors/hooks/useMentors";
import { Breadcrumb } from "../../../../shared/common-components/Breadcrumb";
import {
  addRoadMapDetails,
  getRoadmapDetailsById,
  updateRoadmapDetails,
} from "../service/RoadmapDetails.service";

export default function AddRoadmapDetailsForm() {
  const navigate = useNavigate();
  const { roadmapId, id } = useParams();
  const title = id ? "Update Roadmap Detail" : "Add Roadmap Detail";
  const btnText = id ? "Update" : "Add";
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);
  // get all mentor details
  const mentorData = useMentors();
  const mentorDropdownData = [];
  const [roadmapDetails, setRoadmapDetails] = useState(null);

  // Form Values
  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      roadmapId: roadmapId,
      topic: "",
      subtopic: "",
      duration: "",
    },
    transformValues: (values) => ({
      roadmapId: roadmapId,
      topic: `${values.topic}`,
      subtopic: `${values.subtopic}`,
      duration: `${values.duration}`,
    }),
    validate: {
      // Empty strings are considered to be invalid
      topic: isNotEmpty("Topic cannot be empty"),
      subtopic: isNotEmpty("Subtopic cannot be empty"),
      duration: isNotEmpty("Duration cannot be empty"),
    },
  });
  const selectedValues = form.getTransformedValues();
  const isFormValidate = form.isValid();

  useEffect(() => {
    getRoadmapById(roadmapId).then((res) => {
      console.log(res.data);
      setRoadmapDetails(res.data);
    });
  }, []);

  // For updating total duration
  useEffect(() => {
    // const trydata = roadmapDetails;
    // console.log("Try", trydata.totalDuration);
  }, [roadmapDetails]);

  // Parse hours and minutes
  const parseTime = (timeString) => {
    let hours = 0;
    let minutes = 0;

    const hourIndex = timeString.indexOf("hr");
    const minuteIndex = timeString.indexOf("m");

    if (hourIndex !== -1) {
      hours = parseInt(timeString.slice(0, hourIndex));
    }
    if (minuteIndex !== -1) {
      if (hourIndex !== -1) {
        minutes = parseInt(timeString.slice(hourIndex + 2, minuteIndex));
      } else {
        minutes = parseInt(timeString.slice(0, minuteIndex));
      }
    }
    return { hours, minutes };
  };

  // Add two time strings
  const addDuration = (time1, time2) => {
    const { hours: hours1, minutes: minutes1 } = parseTime(time1);
    const { hours: hours2, minutes: minutes2 } = parseTime(time2);

    let totalHours = hours1 + hours2;
    let totalMinutes = minutes1 + minutes2;

    if (totalMinutes >= 60) {
      totalHours += Math.floor(totalMinutes / 60);
      totalMinutes %= 60;
    }

    console.log("Hours:", totalHours + "  " + "Min:", totalMinutes);
    return totalHours + "hr " + totalMinutes + "m";
  };
  // Form Submit button
  function handleFormSubmit(values) {
    let trydata = roadmapDetails.totalDuration;
    console.log("Old dur:", trydata);
    console.log("New timeto add:", values.duration);

    if (id) {
      // If ID is present, update the existing roadmap
      updateRoadmapDetails(id, values);
      const upDatedDuration = addDuration(trydata, values.duration);
      console.log("Checking here update:", upDatedDuration, values);
      console.log(selectedValues.duration);
      updateRoadmap(roadmapId, {
        ...roadmapDetails,
        totalDuration: upDatedDuration,
      });
    } else {
      // If no ID is present, add a new roadmap
      addRoadMapDetails(values);
      const data = getRoadmapById(roadmapId).then;

      const upDatedDuration = addDuration(trydata, values.duration);
      console.log("Checking here add:", upDatedDuration);
      updateRoadmap(roadmapId, {
        ...roadmapDetails,
        totalDuration: upDatedDuration,
      });
    }

    navigate("/roadmap-details/" + roadmapId);
  }

  useEffect(() => {
    const fetchRoadmapDetails = async () => {
      if (id) {
        try {
          // Fetch mentor details by ID
          const roadmapDetails = await getRoadmapDetailsById(id);

          // Populate the form with fetched details
          form.setValues(roadmapDetails.data);
        } catch (error) {
          console.error("Error fetching roadmap details:", error);
        }
      }
    };

    fetchRoadmapDetails();
  }, [id]);

  // Breadcrumbs Data
  const Breadcrumbitems = [
    { title: "Internship", href: "#" },
    { title: "Roadmap", href: "/roadmap" },
    { title: "Roadmap Details", href: "/roadmap" },
    { title: `${btnText} Roadmap Details` },
  ];

  function handleCancel() {
    navigate("/roadmap-details/" + roadmapId);
  }

  mentorData.map((mentor) => {
    mentorDropdownData.push(mentor.firstName + " " + mentor.lastName);
  });
  return (
    <>
      <Flex direction="column" className="content-wrapper">
        <Flex justify="space-between" align="center" className="sub-header">
          <div>
            <Breadcrumb data={Breadcrumbitems} />
            <h4 className="content-title">{title}</h4>
          </div>
        </Flex>
        <Box className="form-wrapper">
          <Grid w="100%" columns={24}>
            <Grid.Col style={{ height: "100%" }} span={isMobile ? "24" : "12"}>
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
                {/* <Select
                  mt="md"
                  label="Select Presenter"
                  placeholder="Pick value"
                  checkIconPosition="right"
                  data={mentorDropdownData}
                  maxDropdownHeight={200}
                  rightSection={
                    <IconChevronDown
                      style={{ width: rem(16), height: rem(16) }}
                    />
                  }
                  {...form.getInputProps("presenter")}
                />

                <Select
                  mt="md"
                  label="Select Status"
                  placeholder="Pick value"
                  checkIconPosition="right"
                  data={["Not-Started", "In Progress", "Completed"]}
                  maxDropdownHeight={200}
                  defaultValue="Not Started"
                  rightSection={
                    <IconChevronDown
                      style={{ width: rem(16), height: rem(16) }}
                    />
                  }
                  {...form.getInputProps("status")}
                /> */}

                <Group justify="flex-end" mt="lg">
                  <Button
                    variant="default"
                    onClick={handleCancel}
                    type="submit"
                  >
                    Cancle
                  </Button>
                  <Button disabled={!isFormValidate} type="submit">
                    {btnText}
                  </Button>
                </Group>
              </form>
            </Grid.Col>
          </Grid>
        </Box>
      </Flex>
    </>
  );
}
