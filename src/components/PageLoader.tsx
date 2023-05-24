import { Box, CircularProgress } from '@mui/material';

const PageLoader = () => {
    return (
        <Box
            sx={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                right: 0,
                left: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#ffffff',
            }}
        >
            <CircularProgress />
        </Box>
    );
};

export default PageLoader;
