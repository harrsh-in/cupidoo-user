import { Box, Container } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { Outlet } from 'react-router-dom';
import { GetUserProfileAPI } from '../api/profile.api';
import Navbar from '../components/Navbar';
import PageLoader from '../components/PageLoader';
import env from '../utils/env';

const Layout = () => {
    const { isLoading } = useQuery({
        queryKey: [],
        queryFn: GetUserProfileAPI,
        enabled: Boolean(localStorage.getItem(env.userTokenKey)),
    });

    return (
        <Box>
            <Navbar />

            {isLoading && localStorage.getItem(env.userTokenKey) ? (
                <PageLoader />
            ) : (
                <Container>
                    <Outlet />
                </Container>
            )}
        </Box>
    );
};

export default Layout;
