/* eslint-disable react/prop-types */
import {
  Button,
  TextInput,
  Select,
  Flex,
  Breadcrumbs,
  Anchor,
  Grid,
  Group,
  rem,
} from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import {
  getByIdInternData,
  postInternData,
  putInternData,
} from "../utility/service/intern.service";
import { useEffect } from "react";
import { ValidationSchema } from "../utility/constants/constant";
import { useNavigate, useParams } from "react-router-dom";
import { IconChevronDown } from "@tabler/icons-react";

// eslint-disable-next-line react/prop-types
const InternForm = () => {
  const navigate = useNavigate();
  let { id } = useParams();

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
    { title: "Intern", href: "/intern" },
    { title: id ? "Update Intern Detail" : "Add Intern Detail", href: "#" },
  ].map((item, index) => (
    <Anchor href={item.href} key={index}>
      {item.title}
    </Anchor>
  ));

  useEffect(() => {
    if (id) {
      getByIdInternData(id).then((response) => {
        if (response) {
          form.setValues(response.data);
        }
      });
    }
  }, [id]);

  /** navigate back */
  const handleCancel = () => {
    navigate("/intern");
  };

  /** add and update API call */
  const handleFormSubmit = (values) => {
    if (id) {
      putInternData(values.id, values).then((response) => {
        if (response) {
          form.reset();
          navigate("/intern");
        }
      });
    } else {
      postInternData(values).then((response) => {
        if (response) {
          form.reset();
          navigate("/intern");
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
        <Grid className="form-wrapper" columns={24}>
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
              <Select
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

              <Group justify="flex-end" mt="lg">
                <Button variant="default" onClick={handleCancel}>
                  Cancle
                </Button>
                <Button type="submit">{id ? "Update" : "Add"}</Button>
              </Group>
            </form>
          </Grid.Col>
        </Grid>
      </Flex>
    </>
  );
};
export default InternForm;
