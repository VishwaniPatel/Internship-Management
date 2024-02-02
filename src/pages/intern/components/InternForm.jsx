/* eslint-disable react/prop-types */
import { Modal, Button, TextInput, Select, Flex } from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  getByIdInternData,
  postInternData,
  putInternData,
} from "../utility/service/intern.service";
import { useEffect } from "react";

// eslint-disable-next-line react/prop-types
const InternForm = ({ getInternList, getId, setId, opened, open, close }) => {
  const form = useForm({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      contact: "",
      mentor: "",
      domain: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });
  useEffect(() => {
    if (getId) {
      getByIdInternData(getId).then((response) => {
        if (response) {
          form.setValues(response.data);
        }
      });
    }
  }, [getId]);

  const closeModel = () => {
    close();
    form.reset();
    setId(null);
  };

  const addIntern = (values) => {
    if (getId) {
      putInternData(values.id, values).then((response) => {
        if (response) {
          close();
          form.reset();
          setId(null);
          getInternList();
        }
      });
    } else {
      postInternData(values).then((response) => {
        if (response) {
          close();
          form.reset();
          getInternList();
        }
      });
    }
  };
  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title={!getId ? "Add Intern Details" : "Update Intern Detail"}
        centered
      >
        <form onSubmit={form.onSubmit((values) => addIntern(values))}>
          <Flex gap={"lg"} mt={"lg"}>
            <TextInput
              placeholder="Enter firstName "
              {...form.getInputProps("firstName")}
            />
            <TextInput
              placeholder="Enter lastName "
              {...form.getInputProps("lastName")}
            />
          </Flex>
          <Flex gap={"lg"} mt={"lg"}>
            <TextInput
              placeholder="Enter Email "
              {...form.getInputProps("email")}
            />
            <TextInput
              placeholder="Enter Contact"
              {...form.getInputProps("contact")}
            />
          </Flex>
          <Select
            placeholder="Select Mentor"
            data={["Vishwani", "Vinay", "Bhavik"]}
            mt={"lg"}
            {...form.getInputProps("mentor")}
          />
          <Select
            placeholder="Select Domain"
            data={["React", "Angular", "Vue"]}
            mt={"lg"}
            {...form.getInputProps("domain")}
          />
          <Flex gap={"lg"} justify={"end"} mt={"lg"}>
            <Button onClick={closeModel}>Cancel</Button>
            {!getId && <Button type="submit">Add</Button>}
            {getId && <Button type="submit">Update</Button>}
          </Flex>
        </form>
      </Modal>
      <Button onClick={open}>+ Add New</Button>
    </>
  );
};
export default InternForm;
