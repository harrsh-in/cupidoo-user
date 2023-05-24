import { Box, Typography } from '@mui/material';
import { Fragment } from 'react';

const Navbar = () => {
    return (
        <Fragment>
            <Box className="navbar-container">
                <Typography>Navbar</Typography>
            </Box>

            <Box className="navbar-pad" />
        </Fragment>
    );
};

export default Navbar;
