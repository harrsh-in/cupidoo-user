import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Box, InputAdornment, TextField } from '@mui/material';
import _ from 'lodash';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import schema, { SignInFormSchemaType } from './schema';

const OtherDetails = () => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: '',
        },
        resolver: zodResolver(schema),
    });

    const onSubmit: SubmitHandler<SignInFormSchemaType> = (data) => {
        console.log(data);
    };

    return (
        <Box
            noValidate
            component="form"
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
                width: '50%',
            }}
        >
            <TextField
                required
                fullWidth
                disabled
                margin="dense"
                autoComplete="username"
                label="Username"
                variant="outlined"
                InputProps={{
                    endAdornment: <Button variant="text">Update</Button>,
                }}
            />

            <Controller
                name="name"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        required
                        fullWidth
                        autoComplete="name"
                        label="Name"
                        variant="outlined"
                        error={Boolean(_.get(errors, 'name', ''))}
                        helperText={_.get(errors, 'name.message', '')}
                        margin="dense"
                    />
                )}
            />

            <TextField
                required
                fullWidth
                disabled
                margin="dense"
                autoComplete="email"
                label="Email"
                variant="outlined"
                InputProps={{
                    endAdornment: <Button variant="text">Update</Button>,
                }}
            />

            <TextField
                required
                fullWidth
                disabled
                margin="dense"
                autoComplete="contactNumber"
                label="Contact Number"
                variant="outlined"
                InputProps={{
                    startAdornment: (
                        <InputAdornment
                            position="start"
                            disableTypography
                            disablePointerEvents
                        >
                            +91
                        </InputAdornment>
                    ),
                    endAdornment: <Button variant="text">Update</Button>,
                }}
            />

            <Button
                type="submit"
                variant="outlined"
                fullWidth
                sx={{
                    marginTop: '8px',
                }}
            >
                Save
            </Button>
        </Box>
    );
};

export default OtherDetails;
