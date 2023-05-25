import { Box, Container } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { GetUserProfileAPI } from '../api/profile.api';
import Navbar from '../components/Navbar';
import PageLoader from '../components/PageLoader';
import env from '../utils/env';
import { useAppDispatch } from '../redux/hooks';
import { setUserDetails } from '../redux/slice/user.slice';
import _ from 'lodash';

const Layout = () => {
    const dispatch = useAppDispatch();

    const {
        isLoading,
        data: userProfileData,
        status,
    } = useQuery({
        queryKey: ['layoutProfileAPI'],
        queryFn: GetUserProfileAPI,
        enabled: Boolean(localStorage.getItem(env.userTokenKey)),
    });

    useEffect(() => {
        if (status === 'success') {
            dispatch(setUserDetails(_.get(userProfileData, 'user', undefined)));
        }
    }, [status]);

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
