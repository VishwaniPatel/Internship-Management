import React, { useContext, useState, useEffect } from "react";
import { Button, Flex } from "@mantine/core";
import { Link } from "react-router-dom";
import MentorList from "./components/MentorList";
import SearchBox from "../../shared/common-components/SearchBox";
import useMentors from "./hooks/useMentors";
import InternshipContext from "../../shared/store/Context";
import useSearch from "../../shared/hooks/useSearch";
import FilterPopover from "../../shared/common-components/FilterPopover";
import useFilterData from "../../shared/hooks/useFilterData";
import { Breadcrumb } from "../../shared/common-components/Breadcrumb";
import { IconPlus } from "@tabler/icons-react";
const MentorDetails = () => {
  const mentorData = useMentors();
  const [mentors, setMentors] = useState(mentorData);
  const { searchTerm } = useContext(InternshipContext);
  const [selectedDomains, setSelectedDomains] = useState([]);

  const Breadcrumbitems = [
    { title: "Internship", href: "#" },
    { title: "Mentors", href: "#" },
  ];

  useEffect(() => {
    const filteredMentors = useSearch(mentorData, searchTerm, "firstName");
    setMentors(filteredMentors);
  }, [mentorData, searchTerm]);

  const handleDomainChange = (selected) => {
    setSelectedDomains(selected);
  };
  // Apply filtering based on selected domains
  const filteredMentors = useFilterData(mentors, selectedDomains);
  
 // filter deleted data
 const handleDelete = (id) =>
 setMentors(mentors.filter((data) => data.id !== id)); 
  return (
    <Flex direction="column" className="content-wrapper">
      <Flex justify="space-between" align="center" className="sub-header">
        <div>
          <Breadcrumb data={Breadcrumbitems} />
          <h4 className="content-title">Mentors</h4>
        </div>
        <Flex>
          <SearchBox />
          <FilterPopover
            selectedDomains={selectedDomains}
            onDomainChange={handleDomainChange}
          />
          <Link to="/mentor/add/new">
            <Button leftSection={<IconPlus size={14} />}>Add New Mentor</Button>
          </Link>
        </Flex>
      </Flex>
      {/* Component to display mentor details */}
      <MentorList mentors={filteredMentors} handleDelete={handleDelete}/>
    </Flex>

    // <Flex p="lg" direction="column">
    //   <Flex justify="space-between">
    //     {/* Title for mentor details page */}
    //     <Text>Mentor's Detail</Text>
    //     <Flex>
    //       <SearchBox />
    //       <FilterPopover
    //         selectedDomains={selectedDomains}
    //         onDomainChange={handleDomainChange}
    //       />
    //       {/* Button for adding mentor details */}
    //       <Link to="/mentor/add/new">
    //         <Button>Add Mentor</Button>
    //       </Link>
    //     </Flex>
    //   </Flex>
    //   {/* Component to display mentor details */}
    //   <MentorList mentors={filteredMentors} />
    // </Flex>
  );
};

export default MentorDetails;
