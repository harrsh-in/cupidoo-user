import { Box } from '@mui/material';
import { Fragment } from 'react';
import Logo from '../assets/logo.png';

const Navbar = () => {
    return (
        <Fragment>
            <Box className="navbar-container">
                <img src={Logo} alt="Cupidoo" className="logo" />
            </Box>

            <Box className="navbar-pad" />
        </Fragment>
    );
};

export default Navbar;
