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
} from "../utility/service/RoadmapDetails.service";
import {
  addDuration,
  subtractDurations,
} from "../utility/helper/timeConvertion";

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
  const [selectedValue, setSelectedValue] = useState("");
  const [perviousDuratation, setPerviousDuratation] = useState("");

  // Form Values
  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      roadmapId: roadmapId,
      topic: "",
      subtopic: "",
      duration: "",
    },
    validate: {
      // Empty strings are considered to be invalid
      topic: isNotEmpty("Topic cannot be empty"),
      subtopic: isNotEmpty("Subtopic cannot be empty"),
      duration: isNotEmpty("Duration cannot be empty"),
    },
  });

  const isFormValidate = form.isValid();

  useEffect(() => {
    getRoadmapById(roadmapId).then((res) => {
      console.log(res.data);
      setRoadmapDetails(res.data);
    });
  }, []);

  // Form Submit button
  function handleFormSubmit(values) {
    let totalDur = roadmapDetails.totalDuration;

    if (id) {
      // If ID is present, update the existing roadmap
      updateRoadmapDetails(id, values);

      // Remove the old duration from total duaration
      const tempData = subtractDurations(totalDur, perviousDuratation);

      // Add new duration to total duration
      const upDatedDuration = addDuration(tempData, values.duration);

      // Update totalDuration in roadmap
      updateRoadmap(roadmapId, {
        ...roadmapDetails,
        totalDuration: upDatedDuration,
      });
    } else {
      // If no ID is present, add a new roadmap
      addRoadMapDetails(values);

      // Add new duration to total duration
      const upDatedDuration = addDuration(totalDur, values.duration);

      // Update totalDuration in roadmap
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
          setPerviousDuratation(roadmapDetails.data.duration);
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
                  value={selectedValue}
                  data={["15m", "30m", "1hr", "1hr 30m"]}
                  rightSection={
                    <IconChevronDown
                      style={{ width: rem(16), height: rem(16) }}
                    />
                  }
                  {...form.getInputProps("duration")}
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
