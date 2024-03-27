import {
  Avatar,
  Box,
  Flex,
  ThemeIcon,
  Paper,
  ActionIcon,
  Stack,
  Text,
  Tooltip,
  Group,
  rem,
  HoverCard,
} from "@mantine/core";
import { Breadcrumb } from "../../../../../shared/common-components/Breadcrumb";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getInternDetailsById } from "../utility/service/BatchIntern.service";
import { Dropzone, PDF_MIME_TYPE } from "@mantine/dropzone";
import {
  IconUpload,
  IconX,
  IconTrash,
  IconCalendar,
  IconMail,
  IconPhone,
  IconDownload,
  IconFilePlus,
  IconFileTypePdf,
} from "@tabler/icons-react";

export const BatchInternProfile = () => {
  let { id, batchId } = useParams();
  const [batchName, setBatchName] = useState();
  const [internProfile, setInternProfile] = useState();
  const [files, setFiles] = useState([]);
  const items = [
    { title: "Internship", href: "#" },
    { title: "Intern-Batch", href: "/intern-batch" },
    { title: `${batchName}`, href: `/intern-batch/details/${batchId}` },
    {
      title: `${
        internProfile?.firstName.charAt(0).toUpperCase() +
        internProfile?.firstName.slice(1) +
        " " +
        internProfile?.lastName.charAt(0).toUpperCase() +
        internProfile?.lastName.slice(1)
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

  const setFilesList = (file) => {
    setFiles([...files, ...file]);
  };
  const downloadFile = (file, isPreview = false) => {
    const url = URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = url;
    if (!isPreview) {
      link.download = file.name;
    } else {
      link.target = file.name;
    }
    link.click();
    URL.revokeObjectURL(url);
  };
  const previews = files.map((file, index) => {
    return (
      <Box key={index} p={"5px"}>
        <Group align={"left"} style={{ flexDirection: "column" }}>
          <Group justify="center">
            <HoverCard width={90} shadow="sm">
              <HoverCard.Target>
                <ThemeIcon
                  variant="light"
                  size={60}
                  onClick={() => downloadFile(file, true)}
                >
                  <IconFileTypePdf size={40} stroke={1.5} />
                </ThemeIcon>
              </HoverCard.Target>
              <HoverCard.Dropdown>
                <ActionIcon
                  align="center"
                  justify="center"
                  ml={"auto"}
                  onClick={() => {
                    let removeFile = files.filter(
                      (data, indexF) => indexF !== index
                    );
                    setFiles(removeFile);
                  }}
                >
                  <IconTrash />
                </ActionIcon>
                <IconDownload
                  onClick={() => downloadFile(file, false)}
                ></IconDownload>
              </HoverCard.Dropdown>
            </HoverCard>
          </Group>
          <Box>
            <Tooltip label={file.name + " " + file.size + " KB"}>
              <Group onClick={() => downloadFile(file, true)}>
                <Text fw={"bold"}>
                  {file.name.length < 10
                    ? file.name
                    : `${file.name.slice(0, 6)}...${file.name.slice(
                        file.name.length - 8
                      )}`}
                </Text>
              </Group>
            </Tooltip>
          </Box>
        </Group>
      </Box>
    );
  });

  return (
    <Flex
      direction="column"
      className="content-wrapper"
      style={{ overflowY: "auto" }}
    >
      <Flex align="center" className="sub-header">
        <div>
          <Breadcrumb data={items} />
        </div>
      </Flex>
      <Paper withBorder radius="md" m="lg">
        <Flex style={{ padding: "20px" }} justify="space-between">
          <Box display="flex">
            <Avatar radius="sm" color="cyan" size={100}>
              {internProfile?.firstName.charAt(0).toUpperCase() +
                internProfile?.lastName.charAt(0).toUpperCase()}
            </Avatar>
            <Box ml="lg" align="left" style={{ paddingTop: "5px" }}>
              <Text
                fw={500}
                size="sm"
                lh={1}
                style={{ textTransform: "capitalize" }}
              >
                {internProfile?.firstName + " " + internProfile?.lastName}
              </Text>
              <Tooltip label="Domain">
                <Text
                  fw={500}
                  size="sm"
                  c="gray"
                  lh={1}
                  mt={5}
                  style={{ paddingTop: "7px" }}
                >
                  {internProfile?.domain}
                </Text>
              </Tooltip>
              <Box mt="sm" display="flex">
                <Tooltip label="Work Email Address">
                  <Box display="flex" align="center">
                    <IconMail size={14}></IconMail>
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
                </Tooltip>
                <Tooltip label="Mobile Number">
                  <Box
                    style={{ paddingLeft: "10px" }}
                    display="flex"
                    align="center"
                  >
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
                </Tooltip>
                <Tooltip label="Date of Joining">
                  <Box
                    style={{ paddingLeft: "10px" }}
                    display="flex"
                    align="center"
                  >
                    <IconCalendar size={14} />
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
                </Tooltip>
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
            <Tooltip label={`${internProfile?.mentor}`}>
              <Avatar
                mt={"sm"}
                src={internProfile?.mentor}
                radius="xl"
                size={40}
              />
            </Tooltip>
          </Box>
        </Flex>
      </Paper>
      <Paper
        withBorder
        display={"flex"}
        radius="md"
        m="lg"
        style={{ padding: 20 }}
      >
        {previews.length > 0 ? (
          <Box style={{ overflowX: "auto" }} radius="md">
            <Flex>{previews}</Flex>
          </Box>
        ) : (
          <></>
        )}
        <Dropzone
          onDrop={(files) => setFilesList(files)}
          onReject={(files) => console.log("rejected files", files)}
          maxSize={5 * 1024 ** 2}
          accept={PDF_MIME_TYPE}
        >
          <Stack
            justify={"center"}
            align={"left"}
            style={{ minHeight: 80, pointerEvents: "none" }}
          >
            <Dropzone.Accept>
              <ThemeIcon variant="light" radius={"xl"} size={60}>
                <IconUpload
                  style={{
                    width: rem(52),
                    height: rem(52),
                    color: "var(--mantine-color-blue-6)",
                  }}
                  stroke={1.5}
                />
              </ThemeIcon>
            </Dropzone.Accept>
            <Dropzone.Reject>
              <ThemeIcon
                variant="light"
                color={"orange"}
                radius={"xl"}
                size={60}
              >
                <IconX
                  style={{
                    width: rem(52),
                    height: rem(52),
                    color: "var(--mantine-color-red-6)",
                  }}
                  stroke={1.5}
                />
              </ThemeIcon>
            </Dropzone.Reject>
            <Dropzone.Idle>
              <Group
                align="center"
                style={{ flexDirection: "column" }}
                p={"5px"}
                pl={"20px"}
              >
                <ThemeIcon variant="light" size={60}>
                  <IconFilePlus size={40} stroke={1.5}></IconFilePlus>
                </ThemeIcon>
                <Box align="center">
                  <Text fw={"bold"}>Add New</Text>
                </Box>
              </Group>
            </Dropzone.Idle>
          </Stack>
        </Dropzone>
      </Paper>
    </Flex>
  );
};
