import React, { useState } from "react";
import { Select } from "@mantine/core";
import { useForm } from "@mantine/form";

const MyComponent = () => {
  const [selectedOptionId, setSelectedOptionId] = useState("");
  const form = useForm();

  // Sample JSON roadmap
  const roadmap = [
    { id: 1, topic: "Topic 1", domain: "Domain 1", totalDuration: "1h 30m" },
    { id: 2, topic: "Topic 2", domain: "Domain 2", totalDuration: "2h" },
    { id: 3, topic: "Topic 3", domain: "Domain 3", totalDuration: "45m" },
  ];

  // Event handler for form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // Find the selected option in the roadmap array
    const selectedOption = roadmap.find(
      (option) => option.id === selectedOptionId
    );
    if (selectedOption) {
      // If the option is found, access its ID
      console.log("Selected option ID:", selectedOptionId);
    } else {
      // Handle error if option is not found
      console.error("Selected option not found!");
    }
  };

  // Event handler for select change
  const handleSelectChange = (value) => {
    setSelectedOptionId(value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Select
        id="select-roadmap"
        label="Select Topic"
        placeholder="Select Topic"
        value={selectedOptionId}
        onChange={(value) => handleSelectChange(value)}
        data={roadmap.map((entry) => ({ value: entry.id, label: entry.topic }))}
        {...form.getSelectProps("topic")}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default MyComponent;
