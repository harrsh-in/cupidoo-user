import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, InputAdornment, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import _ from 'lodash';
import { useState, useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import schema, { SignInFormSchemaType } from './schema';
import { useAppSelector } from '../../../redux/hooks';

const OtherDetails = () => {
    const { details } = useAppSelector((state) => state.user);

    const [dob, setDob] = useState<Dayjs | null>(dayjs('2022-04-17'));

    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: {
            username: '',
            name: '',
            email: '',
            contactNumber: '',
            dob: '',
        },
        resolver: zodResolver(schema),
    });

    const onSubmit: SubmitHandler<SignInFormSchemaType> = (data) => {
        console.log(data);
    };

    useEffect(() => {
        if (details) {
            setValue('name', details.name);
            setValue('username', details.username);
            setValue('email', details.email);
            setValue('contactNumber', details.contactNumber);
            setValue('dob', dayjs(dob).format('DD-MM-YYYY'));
        }
    }, [details]);

    return (
        <Box
            noValidate
            component="form"
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
                maxWidth: '330px',
                marginX: 'auto',
            }}
        >
            <Controller
                name="username"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        required
                        fullWidth
                        disabled
                        label="Username"
                        variant="outlined"
                        error={Boolean(_.get(errors, 'username', ''))}
                        helperText={_.get(errors, 'username.message', '')}
                        margin="dense"
                        InputProps={{
                            endAdornment: (
                                <Button variant="text">Update</Button>
                            ),
                        }}
                    />
                )}
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

            <Controller
                name="email"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        required
                        fullWidth
                        disabled
                        margin="dense"
                        autoComplete="email"
                        label="Email"
                        variant="outlined"
                        InputProps={{
                            endAdornment: (
                                <Button variant="text">Update</Button>
                            ),
                        }}
                        error={Boolean(_.get(errors, 'email', ''))}
                        helperText={_.get(errors, 'email.message', '')}
                    />
                )}
            />

            <Controller
                name="contactNumber"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
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
                                    {_.get(details, 'countryPrefix', '+91')}
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <Button variant="text">Update</Button>
                            ),
                        }}
                        error={Boolean(_.get(errors, 'email', ''))}
                        helperText={_.get(errors, 'email.message', '')}
                    />
                )}
            />

            <DatePicker
                label="Date of birth"
                value={dob}
                onChange={(newValue) => {
                    setDob(newValue);
                    setValue('dob', dayjs(newValue).format('DD-MM-YYYY'));
                }}
                sx={{
                    marginTop: '8px',
                    marginBottom: '4px',
                    width: '100%',
                }}
            />

            <Button
                type="submit"
                variant="outlined"
                fullWidth
                sx={{
                    marginTop: '1.5rem',
                }}
            >
                Save
            </Button>
        </Box>
    );
};

export default OtherDetails;
