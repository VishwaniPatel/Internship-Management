import React, {useState } from 'react'
import BatchMentorList from './components/BatchMentorList'
import { Button, Flex } from '@mantine/core'
import { IconPlus } from '@tabler/icons-react'
import { useParams } from 'react-router'
import DrawerElement from './components/DrawerElement'

const BatchMentor = () => {
    
    // get param value from URL
    const { id } = useParams();
    // Manage drawer open/close
    const [drawerOpen, setDrawerOpen] = useState(false);

    // toggle drawer
    const toggleDrawer = () => {
        setDrawerOpen((prevState) => !prevState);
    };

    //   set title of form
    const title = id ? "Update Mentor Detail" : "Add Mentor Detail";

    return (
        <Flex direction="column">
            <Flex>
                {/* Button to open drawer to add mentor into batch */}
                <Button
                    onClick={toggleDrawer}
                    className="btn-sm"
                    variant="light"
                    ml="auto"
                    leftSection={<IconPlus size={14} />}
                >
                    Add
                </Button>
            </Flex>
            <div>
                {/* Component to list Mentorlist of selected batch */}
                <BatchMentorList toggleDrawer={toggleDrawer} />
            </div>
            {/* Drawer component */}
            <DrawerElement title={title} drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
        </Flex>
    )
}

export default BatchMentor