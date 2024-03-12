import { Avatar, Box, Flex, Paper, Text } from "@mantine/core";
import { Breadcrumb } from "../../../../shared/common-components/Breadcrumb";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getInternDetailsById } from "../utility/service/intern.service";
import { useAuth0 } from "@auth0/auth0-react";
import { IconCalendar, IconMail, IconPhone } from "@tabler/icons-react";

export const InternProfile = () => {
  let { id, batchId } = useParams();
  const { user } = useAuth0();
  const [batchName, setBatchName] = useState();
  const [internProfile, setInternProfile] = useState();
  const items = [
    { title: "Internship", href: "#" },
    { title: "Intern-Batch", href: "/intern-batch" },
    { title: `${batchName}`, href: `/intern-batch/details/${batchId}` },
    {
      title: `${
        internProfile?.firstName.charAt(0).toUpperCase() +
        internProfile?.firstName.slice(1)
      }`,
      href: "#",
    },
  ];

  useEffect(() => {
    if (id) {
      let name = localStorage.getItem("batch_name");
      setBatchName(name);
      getInternDetailsById(id).then((response) => {
        if (response) {
          setInternProfile(response.data);
        }
      });
    }
  }, [id]);
  return (
    <Flex direction="column" className="content-wrapper">
      <Flex align="center" className="sub-header">
        <div>
          <Breadcrumb data={items} />
        </div>
      </Flex>
      <Paper withBorder radius="md" m="lg">
        <Flex style={{ padding: "20px" }} justify="space-between">
          <Box display="flex">
            <Avatar src={user.picture} radius="sm" size={100} />
            <Box ml="lg" align="left">
              <Text
                fw={500}
                size="sm"
                lh={1}
                style={{ textTransform: "capitalize" }}
              >
                {internProfile?.firstName + " " + internProfile?.lastName}
              </Text>
              <Text
                fw={500}
                size="xs"
                c="gray"
                lh={1}
                mt={6}
                style={{ paddingTop: "7px" }}
              >
                {internProfile?.domain}
              </Text>
              <Box mt="sm" display="flex">
                <Box display="flex" align="center">
                  <IconMail  size={14}></IconMail>
                  <Text
                    fw={500}
                    size="xs"
                    c="gray"
                    lh={1}
                   
                    style={{ paddingLeft: "7px" }}
                  >
                    {internProfile?.email}
                  </Text>
                </Box>
                <Box style={{ paddingLeft: "10px" }} display="flex" align="center">
                  <IconPhone size={14}></IconPhone>
                  <Text
                    fw={500}
                    size="xs"
                    c="gray"
                    lh={1}
               
                    style={{ paddingLeft: "7px" }}
                  >
                    {internProfile?.contact}
                  </Text>
                </Box>
                <Box style={{ paddingLeft: "10px" }} display="flex" align="center">
                  <IconCalendar size={14}/>
                  <Text
                    fw={500}
                    size="xs"
                    c="gray"
                    lh={1}
               
                    style={{ paddingLeft: "7px" }}
                  >
                    21-05-2024
                  </Text>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box align="center">
            <Text
              fw={500}
              size="sm"
              lh={1}
              style={{ textTransform: "capitalize" }}
            >
              {`Mentor's`}
            </Text>
            <Avatar mt={"sm"} src={user.picture} radius="xl" size={40} />
          </Box>
        </Flex>
      </Paper>
      <Paper withBorder radius="md" m="lg">
        <Flex style={{ padding: "20px" }}>
          <h5>Assessment Result</h5>
        </Flex>
      </Paper>
    </Flex>
  );
};
