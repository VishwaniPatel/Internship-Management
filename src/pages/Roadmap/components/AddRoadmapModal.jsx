import {
  Button,
  TextInput,
  Textarea,
  Group,
  Flex,
  Select,
  rem,
  em,
  Breadcrumbs,
  Anchor,
  Grid,
  Box,
} from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";
import {
  addRoadMap,
  updateRoadmap,
  getRoadmapById,
} from "../service/Roadmap.service";
import { isNotEmpty, useForm } from "@mantine/form";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMediaQuery } from "@mantine/hooks";
import useMentors from "../../mentors/hooks/useMentors";
import { Breadcrumb } from "../../../shared/common-components/Breadcrumb";

export default function FormModal() {
  const navigate = useNavigate();
  const { id } = useParams();
  const title = id ? "Update Roadmap Detail" : "Add Roadmap Detail";
  const btnText = id ? "Update" : "Add";
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);
  // get all mentor details
  const mentorData = useMentors();
  const mentorDropdownData = [];

  // Form Values
  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      topic: "",
      subtopic: "",
      duration: "",
      presenter: "",
      status: "Not-Started",
    },
    validate: {
      // Empty strings are considered to be invalid
      topic: isNotEmpty("Topic cannot be empty"),
      subtopic: isNotEmpty("Subtopic cannot be empty"),
      duration: isNotEmpty("Duration cannot be empty"),
    },
  });
  const isFormValidate = form.isValid();

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
    { title: `${btnText} Roadmap Details` },
  ];

  function handleCancel() {
    navigate("/roadmap");
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
                <Select
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
                />

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
