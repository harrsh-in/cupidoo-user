import { Box, Typography } from '@mui/material';
import { Fragment } from 'react';
import Logo from '../assets/logo.png';
import { removeUserToken } from '../utils/handleUserToken';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../redux/hooks';
import { resetUserDetails } from '../redux/slice/user.slice';

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleSignOut = () => {
        removeUserToken();
        dispatch(resetUserDetails());
        navigate('/signin');
    };

    return (
        <Fragment>
            <Box className="navbar-container" component="nav">
                <img src={Logo} alt="Cupidoo" className="logo" />

                <Box>
                    <Typography
                        className="navbar-links"
                        onClick={handleSignOut}
                    >
                        Sign Out
                    </Typography>
                </Box>
            </Box>

            <Box className="navbar-pad" />
        </Fragment>
    );
};

export default Navbar;
