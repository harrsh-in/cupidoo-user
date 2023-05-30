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
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                zIndex: 1400,
            }}
        >
            <CircularProgress />
        </Box>
    );
};

export default PageLoader;
