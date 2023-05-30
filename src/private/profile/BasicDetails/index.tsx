import { Box } from '@mui/material';
import ProfilePhoto from './ProfilePhoto';
import OtherDetails from './OtherDetails';

const BasicDetails = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                width: '70%',
                marginX: 'auto',
            }}
        >
            <ProfilePhoto />

            <OtherDetails />
        </Box>
    );
};

export default BasicDetails;
