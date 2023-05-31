import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, InputAdornment, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useAppSelector } from '../../../redux/hooks';
import ProfilePhoto from './ProfilePhoto';
import schema, { SignInFormSchemaType } from './schema';

const OtherDetails = ({ handleNext }: IProps) => {
    const { details } = useAppSelector((state) => state.user);

    const maximumDate = dayjs().subtract(18, 'years');

    const [dob, setDob] = useState<{
        value: Dayjs | null;
        error: string;
    }>({
        value: maximumDate,
        error: '',
    });

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
        if (!dayjs(dob.value).isValid()) {
            setDob((prev) => {
                return {
                    ...prev,
                    error: 'Invalid date',
                };
            });
            return;
        }
        console.log(data);
        handleNext();
    };

    useEffect(() => {
        if (details) {
            setValue('name', details.name);
            setValue('username', details.username);
            setValue('email', details.email);
            setValue('contactNumber', details.contactNumber);
            setValue('dob', dayjs(dob.value).format('DD-MM-YYYY'));
        }
    }, [details]);

    return (
        <Box>
            <ProfilePhoto />

            <Box
                noValidate
                component="form"
                autoComplete="off"
                onSubmit={handleSubmit(onSubmit)}
                sx={{
                    maxWidth: '330px',
                    marginX: 'auto',
                    marginTop: '3rem',
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
                    closeOnSelect
                    displayWeekNumber
                    showDaysOutsideCurrentMonth
                    format="DD/MM/YYYY"
                    label="Date of birth"
                    value={dob.value}
                    defaultValue={dob.value}
                    maxDate={maximumDate}
                    onChange={(newValue) => {
                        setDob((prev) => {
                            return {
                                ...prev,
                                error: '',
                                value:
                                    dayjs(newValue).diff(maximumDate, 'days') >
                                    0
                                        ? maximumDate
                                        : newValue,
                            };
                        });
                        setValue(
                            'dob',
                            dayjs(
                                dayjs(newValue).diff(maximumDate, 'days') > 0
                                    ? maximumDate
                                    : newValue
                            ).format('DD-MM-YYYY')
                        );
                    }}
                    slotProps={{
                        textField: {
                            helperText: dob.error,
                            error: Boolean(dob.error),
                        },
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
                    Save and Next
                </Button>
            </Box>
        </Box>
    );
};

export default OtherDetails;

interface IProps {
    handleNext: () => void;
}
