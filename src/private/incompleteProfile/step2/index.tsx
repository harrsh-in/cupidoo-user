import { Box, Typography } from '@mui/material';
import ProfilePicture from './ProfilePicture';

const Step2 = () => {
    return (
        <Box
            sx={{
                marginY: '4rem',
            }}
        >
            <Typography
                variant="h4"
                sx={{
                    textAlign: 'center',
                    marginBottom: '4rem',
                }}
            >
                Profile Setup
            </Typography>

            <Box
                sx={{
                    maxWidth: '35rem',
                    marginX: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '1rem',
                }}
            >
                <Typography variant="h6">Profile picture</Typography>
                <ProfilePicture />
            </Box>
        </Box>
    );
};

export default Step2;
