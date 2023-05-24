import { zodResolver } from '@hookform/resolvers/zod';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
    Box,
    Button,
    FormControl,
    FormHelperText,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField,
    Typography,
} from '@mui/material';
import _ from 'lodash';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import schema, { schemaType } from './schema';

const SignIn = () => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
        resolver: zodResolver(schema),
    });

    const onSubmit: SubmitHandler<schemaType> = (data) => {
        console.log(data);
    };

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault();
    };

    return (
        <Box
            sx={{
                maxWidth: '25rem',
                marginX: 'auto',
                paddingTop: '5rem',
            }}
        >
            <Typography
                variant="h4"
                gutterBottom
                sx={{
                    textAlign: 'center',
                }}
            >
                Sign In
            </Typography>

            <Box
                noValidate
                component="form"
                autoComplete="off"
                onSubmit={handleSubmit(onSubmit)}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    marginTop: '3rem',
                }}
            >
                <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            required
                            autoComplete="email"
                            label="Email"
                            variant="outlined"
                            error={Boolean(_.get(errors, 'email', ''))}
                            helperText={_.get(errors, 'email.message', ' ')}
                        />
                    )}
                />

                <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                        <FormControl
                            required
                            variant="outlined"
                            error={Boolean(_.get(errors, 'password', ''))}
                        >
                            <InputLabel htmlFor="outlined-adornment-password">
                                Password
                            </InputLabel>
                            <OutlinedInput
                                {...field}
                                autoComplete="current-password"
                                id="outlined-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            edge="end"
                                            onMouseDown={
                                                handleMouseDownPassword
                                            }
                                        >
                                            {showPassword ? (
                                                <VisibilityOff />
                                            ) : (
                                                <Visibility />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                            />
                            <FormHelperText>
                                {_.get(errors, 'password.message', ' ')}
                            </FormHelperText>
                        </FormControl>
                    )}
                />

                <Button type="submit" variant="contained">
                    Sign In
                </Button>
            </Box>
        </Box>
    );
};

export default SignIn;
