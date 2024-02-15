import {
  Button,
  TextInput,
  Group,
  Flex,
  rem,
  Breadcrumbs,
  Grid,
} from "@mantine/core";
import { IconCalendar } from "@tabler/icons-react";
import { useForm, yupResolver } from "@mantine/form";
import { DateInput } from "@mantine/dates";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  addInternsBatch,
  getByIdInternBatchData,
  updateInternsBatch,
} from "../utility/service/intern-batch.service";
import { ValidationSchema } from "../utility/constants/constant";

export default function BatchForm() {
  let { batchId } = useParams();
  const navigate = useNavigate();
  const [batchDetails, setBatchDetails] = useState(null);

  const icon = (
    <IconCalendar style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
  );
  const form = useForm({
    initialValues: {
      batchname: "",
      startdate: "",
      enddate: "",
    },
    validate: yupResolver(ValidationSchema),
  });

  /** Breadcrumbs Details */
  const items = [
    { title: "InternBatch", href: "/intern-batch" },
    {
      title: batchId ? "Update Intern-Batch Detail" : "Add Intern-Batch Detail",
      href: "#",
    },
  ].map((item, index) => (
    <Link to={item.href} key={index}>
      {item.title}
    </Link>
  ));

  useEffect(() => {
    if (batchId) {
      getByIdInternBatchData(batchId).then((response) => {
        if (response) {
          setBatchDetails(response.data);
          form.setValues({
            batchname: response.data.batchname,
            startdate: new Date(response.data.startdate),
            enddate: new Date(response.data.enddate),
          });
        }
      });
    }
  }, [batchId]);

  /** navigate back */
  const handleCancel = () => {
    navigate(`/intern-batch`);
  };

  const handleFormSubmit = (values) => {
    if (batchId) {
      const batchDetailObj = {
        ...values,
        intern: [...batchDetails.intern],
      };
      updateInternsBatch(batchId, batchDetailObj).then((response) => {
        if (response) {
          form.reset();
          navigate(`/intern-batch`);
        }
      });
    } else {
      const internBatchObj = {
        ...values,
        intern: [],
      };
      addInternsBatch(internBatchObj).then((response) => {
        if (response) {
          form.reset();
          navigate(`/intern-batch`);
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
              {batchId
                ? "Update Intern-Batch Detail"
                : "Add Intern-Batch Detail"}
            </h4>
          </div>
        </Flex>
        <Grid className="form-wrapper" columns={24}>
          <Grid.Col style={{ height: "100%" }} span={12}>
            <form
              className="add-form"
              onSubmit={form.onSubmit((values) => handleFormSubmit(values))}
            >
              <TextInput
                withAsterisk
                label="Batch Name"
                placeholder="Enter Batch Name"
                {...form.getInputProps("batchname")}
              />

              <DateInput
                withAsterisk
                mt="md"
                rightSection={icon}
                valueFormat="YYYY MMM DD"
                label="Start Date"
                placeholder="Select Start Date"
                {...form.getInputProps("startdate")}
              />
              <DateInput
                withAsterisk
                mt="md"
                rightSection={icon}
                valueFormat="YYYY MMM DD"
                label="End Date"
                placeholder="Select End Date"
                {...form.getInputProps("enddate")}
              />

              <Group justify="flex-end" mt="lg">
                <Button variant="default" onClick={handleCancel}>
                  Cancle
                </Button>
                <Button type="submit">{batchId ? "Update" : "Add"}</Button>
              </Group>
            </form>
          </Grid.Col>
        </Grid>
      </Flex>
    </>
  );
}
