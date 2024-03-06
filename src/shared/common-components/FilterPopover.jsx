// FilterPopover.jsx
import React, { useState } from 'react';
import { Button, Checkbox, Popover, PopoverTarget } from '@mantine/core';
import { IconFilter } from '@tabler/icons-react';
import useDomain from '../../pages/mentors/hooks/useDomain';

const FilterPopover = ({ selectedDomains, onDomainChange }) => {
  const domains = useDomain();
  const [tempValue, setTempValue] = useState(selectedDomains);

  const handleCheckboxChange = (values) => {
    setTempValue(values);
  };

  const handleApply = () => {
    onDomainChange(tempValue);
    // applyFilters(); // Apply filters in the parent component
  };

  const handleCancel = () => {
    setTempValue(selectedDomains); // Reset to the previous value
  };

  return (
    <Popover position="bottom" withArrow>
      <PopoverTarget>
        <Button variant="outline" mr={12}>
          <IconFilter />
        </Button>
      </PopoverTarget>
      <Popover.Dropdown>
        {/* Content of the popover */}
        <Checkbox.Group value={tempValue} onChange={handleCheckboxChange}>
          {domains &&
            domains.map((domain) => (
              <Checkbox
                key={domain.id}
                label={domain.value}
                mb={8}
                value={domain.value}
              />
            ))}
        </Checkbox.Group>
        <div style={{ marginTop: '16px' }}>
          <Button onClick={handleApply} mr={8}>
            Apply
          </Button>
          <Button onClick={handleCancel} variant="light">
            Cancel
          </Button>
        </div>
      </Popover.Dropdown>
    </Popover>
  );
};

export default FilterPopover;
