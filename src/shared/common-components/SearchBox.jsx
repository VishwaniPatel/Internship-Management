import React, { useContext } from 'react';
import { Input } from '@mantine/core';
import InternshipContext from '../store/Context';
import { IconCross, IconSearch } from '@tabler/icons-react';

const SearchBox = () => {
  const { setSearchTerm, searchTerm } = useContext(InternshipContext); // Access setSearchTerm and searchTerm from the context

  /**
   * Handler to update search term in the context
   * @param {string} value - Search term value
   */
  const handleInputChange = (event) => {
    console.log(event.target.value);
    setSearchTerm(event.target.value);
  };
  /**
   * Handler to clear search term and reset search results
   */
  const clearSearch = () => {
    setSearchTerm(''); // Clear search term in the context
  };

  return (
    <Input
      leftSection={<IconSearch size={16} />}
      placeholder="Search"
      value={searchTerm}
      onChange={handleInputChange}
      mr={12}
    />
  )
};

export default SearchBox;
