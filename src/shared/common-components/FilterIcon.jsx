import React, { useState } from 'react';
import { ActionIcon } from '@mantine/core';
import { IconFilter } from '@tabler/icons-react';
import FilterPopover from '../common-components/SelectDomain';
// Import the FilterPopover component

const FilterIcon = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleFilterClick = () => {
        setIsOpen(!isOpen); // Toggle the visibility of the popover
    };

    return (
        <>
            <ActionIcon size={36} mr={12} variant="default" aria-label="Filter mentor's data" onClick={handleFilterClick}>
                <IconFilter />
                {/* Pass isOpen state and toggle function to the FilterPopover component */}
            </ActionIcon>
            <FilterPopover isOpen={isOpen} togglePopover={handleFilterClick} />
        </>
    );
};

export default FilterIcon;
