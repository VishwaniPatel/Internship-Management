/* eslint-disable react/prop-types */
import {
  Button,
  TextInput,
  Select,
  Flex,
  Breadcrumbs,
  Grid,
  Group,
  rem,
  Box,
} from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import {
  getByIdInternData,
  putInternData,
} from "../utility/service/intern.service";
import { useEffect, useState } from "react";
import { ValidationSchema } from "../utility/constants/constant";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IconChevronDown } from "@tabler/icons-react";

// eslint-disable-next-line react/prop-types
const InternForm = () => {
  const navigate = useNavigate();
  let { id, batchId } = useParams();

  const [batchDetails, setBatchDetails] = useState(null);

  /** useForm Function */
  const form = useForm({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      contact: "",
      mentor: "",
      domain: "",
    },
    validate: yupResolver(ValidationSchema),
  });

  /** Breadcrumbs Details */
  const items = [
    { title: "InternBatch", href: "/intern-batch" },
    { title: "Intern", href: `/intern-batch/${batchId}` },
    { title: id ? "Update Intern Detail" : "Add Intern Detail", href: "#" },
  ].map((item, index) => (
    <Link to={item.href} key={index}>
      {item.title}
    </Link>
  ));

  useEffect(() => {
    if (batchId) {
      getByIdInternData(batchId).then((response) => {
        if (response) {
          setBatchDetails(response.data);
          const setForm = response.data.intern.filter(
            (res) => res.internId === +id
          );
          form.setValues(setForm[0]);
        }
      });
    }
  }, [batchId]);

  /** navigate back */
  const handleCancel = () => {
    navigate(`/intern-batch/${batchId}`);
  };

  /** add and update API call */
  const handleFormSubmit = (values) => {
    if (id) {
      const updateIntern = batchDetails.intern.map((res) => {
        if (res.internId === +id) {
          return {
            ...values,
            internId: +id,
          };
        }
        return res;
      });

      const batchDetailObj = {
        ...batchDetails,
        intern: updateIntern,
      };
      putInternData(batchId, batchDetailObj).then((response) => {
        if (response) {
          form.reset();
          navigate(`/intern-batch/${batchId}`);
        }
      });
    } else {
      const batchDetailObj = {
        ...batchDetails,
        intern: [
          ...batchDetails.intern,
          { ...values, internId: Math.random() },
        ],
      };
      putInternData(batchId, batchDetailObj).then((response) => {
        if (response) {
          form.reset();
          navigate(`/intern-batch/${batchId}`);
        }
      });
    }
  };
  return (
    <>
      <Flex direction="column" className="content-wrapper">
        <Flex justify="space-between" align="center" className="sub-header">
          <div>
            <Breadcrumbs>{items}</Breadcrumbs>
            <h4 className="content-title">
              {id ? "Update Intern Detail" : "Add Intern Detail"}
            </h4>
          </div>
        </Flex>
        <Box className="form-wrapper">
          <Grid w="100%" columns={24}>
            <Grid.Col style={{ height: "100%" }} span={12}>
              <form
                className="add-form"
                style={{ backgroundColor: "white" }}
                onSubmit={form.onSubmit((values) => handleFormSubmit(values))}
              >
                <Flex gap={"lg"} mt={"lg"}>
                  <TextInput
                    withAsterisk
                    label="FirstName"
                    placeholder="Enter firstName"
                    {...form.getInputProps("firstName")}
                  />
                  <TextInput
                    label="LastName"
                    withAsterisk
                    placeholder="Enter lastName"
                    {...form.getInputProps("lastName")}
                  />
                </Flex>
                <Flex gap={"lg"} mt={"lg"}>
                  <TextInput
                    withAsterisk
                    label="Email"
                    placeholder="Enter email"
                    {...form.getInputProps("email")}
                  />
                  <TextInput
                    label="Contact"
                    withAsterisk
                    placeholder="Enter contact"
                    {...form.getInputProps("contact")}
                  />
                </Flex>
                <Select
                  withAsterisk
                  mt="md"
                  label="Domain"
                  checkIconPosition="right"
                  placeholder="Select Domain"
                  data={["React", "Angular", "Vue"]}
                  rightSection={
                    <IconChevronDown
                      style={{ width: rem(16), height: rem(16) }}
                    />
                  }
                  {...form.getInputProps("domain")}
                />
                <Select
                  mt="md"
                  label="Mentor"
                  checkIconPosition="right"
                  placeholder="Select Mentor"
                  data={["Vishwani", "Vinay", "Bhavik"]}
                  rightSection={
                    <IconChevronDown
                      style={{ width: rem(16), height: rem(16) }}
                    />
                  }
                  {...form.getInputProps("mentor")}
                />

                <Group justify="flex-end" mt="lg">
                  <Button variant="default" onClick={handleCancel}>
                    Cancle
                  </Button>
                  <Button type="submit">{id ? "Update" : "Add"}</Button>
                </Group>
              </form>
            </Grid.Col>
          </Grid>
        </Box>
      </Flex>
    </>
  );
};
export default InternForm;
