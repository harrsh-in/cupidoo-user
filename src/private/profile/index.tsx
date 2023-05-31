import { Paper, Step, StepLabel, Stepper } from '@mui/material';
import { ReactNode, useState } from 'react';
import OtherDetails from './BasicDetails/OtherDetails';

const steps = ['', '', '', ''];

const Profile = () => {
    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

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
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label, index) => {
                    const stepProps: { completed?: boolean } = {};
                    const labelProps: {
                        optional?: ReactNode;
                    } = {};

                    return (
                        <Step key={index} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>

            {activeStep === 0 ? <OtherDetails handleNext={handleNext} /> : null}
        </Paper>
    );
};

export default Profile;
