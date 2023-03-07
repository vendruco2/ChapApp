import React, { useEffect } from 'react'
import {
    Container,
    Box,
    Text,
    Tabs,
    TabList,
    TabPanel,
    TabPanels,
    Tab,
} from '@chakra-ui/react'
import { useHistory } from 'react-router-dom'
import Login from '../components/Authentication/Login'
import Signup from '../components/Authentication/Signup'


const Homepage = () => {
    const history = useHistory();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('userInfo'))

        if (user) history.push("/chats");
    }, [history]);

    return (
        <Container maxW='xl' centerContent>
            <Box
                d='flex'
                justifyContent="center"
                p={3}
                bg={"white"}
                w='100%'
                m="40px 0 15px 0"
                borderRadius="10px"
                borderWidth="1px"
            >
                <Text align="center" fontSize="4xl" fontFamily="Poppins" color="black">
                    Chat Room</Text>
            </Box>
            <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
                <Tabs isFitted variant="soft-rounded">
                    <TabList>
                        <Tab>Login</Tab>
                        <Tab>SignUp</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <Login />
                        </TabPanel>
                        <TabPanel>
                            <Signup />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </Container>
    );
};

export default Homepage;
