import { Paper } from '@mui/material';
import OtherDetails from './OtherDetails';
import ProfilePhoto from './ProfilePhoto';

const BasicDetails = () => {
    return (
        <Paper
            elevation={1}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                marginX: 'auto',
                gap: '2rem',
                padding: '3rem 1rem',
            }}
            className="basic-details-container"
        >
            <ProfilePhoto />

            <OtherDetails />
        </Paper>
    );
};

export default BasicDetails;
