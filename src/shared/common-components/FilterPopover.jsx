// FilterPopover.jsx
import React, { useContext, useState } from "react";
import {
  Button,
  Checkbox,
  Divider,
  Popover,
  PopoverTarget,
  Stack,
} from "@mantine/core";
import { IconFilter } from "@tabler/icons-react";
import useDomain from "../../pages/mentors/hooks/useDomain";
import InternshipContext from "../store/Context";

const FilterPopover = ({  onDomainChange }) => {
  const [opened, setOpened] = useState(false);
  const domains = useDomain();
  const {selectedDomains, setSelectedDomains} = useContext(InternshipContext);
  const [tempValue, setTempValue] = useState(selectedDomains);

  const handleCheckboxChange = (values) => {
    setTempValue(values);
  };

  const handleApply = () => {
    onDomainChange(tempValue);
    // applyFilters(); // Apply filters in the parent component
    setOpened((o) => !o);
  };

  const handleCancel = () => {
     setTempValue([]); // Reset to an empty array to remove checked data
    setSelectedDomains([]);
    setOpened((o) => !o);
  };

  return (
    <Popover position="bottom-end" opened={opened} onChange={setOpened}>
      <PopoverTarget>
        <Button className="filter-box" variant="outline" mr={12} onClick={() => setOpened((o) => !o)}>
          <IconFilter size={20} />
        </Button>
      </PopoverTarget>
      <Popover.Dropdown w={300} className="popover-dropdown">
        <div className="popover-header">
          <h5 className="popover-title">Domains</h5>
        </div>
        <Divider />
        {/* Content of the popover */}

        <Checkbox.Group value={tempValue} onChange={handleCheckboxChange}>
          <Stack className="checkbox-stack" h={260} mb="0">
            {domains &&
              domains.map((domain) => (
                <Checkbox
                  className="filter-checkbox"
                  key={domain.id}
                  label={domain.value}
                  mb={8}
                  value={domain.value}
                />
              ))}
          </Stack>
        </Checkbox.Group>
        <Divider />
        <div className="popover-footer">
          <Button onClick={handleCancel} mr={8} color="gray" variant="outline">
            Cancel
          </Button>
          <Button onClick={handleApply}>Apply</Button>
        </div>
      </Popover.Dropdown>
    </Popover>
  );
};

export default FilterPopover;
