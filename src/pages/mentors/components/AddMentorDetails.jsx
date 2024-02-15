import React, { useEffect } from 'react'
import { TextInput, Select, Button, Group, Flex, Grid } from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import { addMentor, getMentorById, updateMentor } from '../utility/services/mentors.service';
import { useNavigate, useParams } from 'react-router-dom';
import useDomain from '../hooks/useDomain';
import { ValidationSchema } from '../utility/validations/Validation';
const AddMentorDetails = () => {
  // get all domains
  const domains = useDomain();
  // get id of selected mentor
  const { id } = useParams();
  const navigate = useNavigate();
  // set title for update/add mentor details
  const title = id ? "Update Mentor Detail" : "Add Mentor Detail";
  // set button title according to update/add mentor details
  const btnText = id ? "Update" : "Add";
  const form = useForm({
    initialValues: {
      firstName: '',
      lastName: "",
      emailId: "",
      domain: "",
    },
    validate: yupResolver(ValidationSchema)
  });
  const isFormValidate = form.isValid();
  /**
   * Add/update mentors details
   * @param {object} values - form values
   */
  const handleFormSubmit = (values) => {
    if (id) {
      // If ID is present, update the existing mentor
      updateMentor(id, values);
    } else {
      // If no ID is present, add a new mentor
      addMentor(values);
    }

    // Navigate back to the mentor details page after submitting the form
    navigate('/mentors');
  };
  useEffect(() => {
    const fetchMentorDetails = async () => {
      if (id) {
        try {
          // Fetch mentor details by ID
          const mentorDetails = await getMentorById(id);
          // Populate the form with fetched details
          form.setValues(mentorDetails.data);
        } catch (error) {
          console.error('Error fetching mentor details:', error);
        }
      }
    };
    fetchMentorDetails();
  }, [id]);
  return (
    <Flex direction="column" className="content-wrapper">
      <Flex justify="space-between" align="center" className="sub-header">
        {/* Set title of add/update mentor details page */}
        <div>
          <h4 className="content-title">{title}</h4>
        </div>
      </Flex>
      <Grid className="form-wrapper" columns={24}>
        <Grid.Col style={{ height: "100%" }} span={12}>
          {/* Start: Form to enter mentor details */}
          <form onSubmit={form.onSubmit((values) => handleFormSubmit(values))}>
            {/* Input field to add first name */}
            <TextInput
              withAsterisk
              label="First Name"
              placeholder="Enter First Name"
              {...form.getInputProps('firstName')}
            />
            {/* Input field to add last name */}
            <TextInput
              withAsterisk
              label="Last Name"
              placeholder="Enter Last Name"
              {...form.getInputProps('lastName')}
            />
            {/* Input field to add email Id*/}
            <TextInput
              withAsterisk
              label="Email ID"
              placeholder="Enter Email ID"
              {...form.getInputProps('emailId')}
            />
            {/* Dropdown menu to select domain */}
            <Select
            withAsterisk
              label="Domain"
              placeholder="Select Domain"
              data={domains}
              {...form.getInputProps('domain')}
              onChange={(value) => form.setFieldValue('domain', value)}
            />
            {/* Submit button to add/update details */}
            <Group justify="flex-end" mt="md">
              <Button disabled={!isFormValidate} type="submit">{btnText}</Button>
            </Group>
          </form>
          {/* End: Form to enter mentor details */}
        </Grid.Col>
      </Grid>
    </Flex>
  )
}

export default AddMentorDetails