import { Box, Typography } from '@mui/material';
import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.png';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { resetUserDetails } from '../redux/slice/user.slice';
import { removeUserToken } from '../utils/handleUserToken';

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { details } = useAppSelector((state) => state.user);

    const handleSignOut = () => {
        removeUserToken();
        dispatch(resetUserDetails());
        navigate('/signin');
    };

    return (
        <Fragment>
            <Box className="navbar-container" component="nav">
                <img src={Logo} alt="Cupidoo" className="logo" />

                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                    }}
                >
                    {details ? (
                        <Fragment>
                            <Typography
                                className="navbar-links"
                                onClick={handleSignOut}
                            >
                                Sign Out
                            </Typography>

                            <Typography
                                className="navbar-links"
                                onClick={() => navigate('/profile')}
                            >
                                Profile
                            </Typography>
                        </Fragment>
                    ) : (
                        <Fragment>
                            <Typography
                                className="navbar-links"
                                onClick={() => navigate('/signin')}
                            >
                                Sign In
                            </Typography>

                            <Typography
                                className="navbar-links"
                                onClick={() => navigate('/signup')}
                            >
                                Sign Up
                            </Typography>
                        </Fragment>
                    )}
                </Box>
            </Box>

            <Box className="navbar-pad" />
        </Fragment>
    );
};

export default Navbar;
