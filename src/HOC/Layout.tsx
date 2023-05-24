import { Box, Container } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Layout = () => {
    return (
        <Box>
            <Navbar />

            <Container>
                <Outlet />
            </Container>
        </Box>
    );
};

export default Layout;
