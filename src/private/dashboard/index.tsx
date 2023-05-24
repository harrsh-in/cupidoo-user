import { Paper, Box, Typography } from '@mui/material';
import { useState } from 'react';
import PEOPLE from '../../data/people';

const Dashboard = () => {
    const [people] = useState(PEOPLE);

    return (
        <Box
            sx={{
                padding: '3rem 0',
            }}
        >
            <Box className="people-list">
                {people.map((person) => {
                    return (
                        <Paper
                            elevation={0}
                            variant="outlined"
                            key={person.id}
                            sx={{
                                display: 'flex',
                                gap: '1rem',
                                padding: '1rem 2rem',
                            }}
                        >
                            <Box
                                sx={{
                                    width: '10rem',
                                    height: '10rem',
                                }}
                            >
                                <Box
                                    component="img"
                                    src={person.profilePicture}
                                    alt={person.name}
                                    sx={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'contain',
                                    }}
                                />
                            </Box>
                            <Box>
                                <Typography>{person.name}</Typography>
                                <Typography>{person.age}</Typography>
                            </Box>
                        </Paper>
                    );
                })}
            </Box>
        </Box>
    );
};

export default Dashboard;
