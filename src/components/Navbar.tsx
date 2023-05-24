import { Box, Typography } from '@mui/material';
import { Fragment } from 'react';
import Logo from '../assets/logo.png';
import { removeUserToken } from '../utils/handleUserToken';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    const handleSignOut = () => {
        removeUserToken();
        navigate('/signin');
    };

    return (
        <Fragment>
            <Box className="navbar-container">
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
