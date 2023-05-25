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
import { useMutation, useQuery } from '@tanstack/react-query';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { SignInAPI } from '../../api/auth.api';
import { GetUserProfileAPI } from '../../api/profile.api';
import notify from '../../utils/toast';
import schema, { SignInFormSchemaType } from './schema';

const SignIn = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [userSignInSuccess, setUserSignInSuccess] = useState(false);

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

    const {
        refetch: getUserProfileRefetch,
        status,
        isSuccess,
        isFetched,
    } = useQuery({
        queryKey: [],
        queryFn: GetUserProfileAPI,
        enabled: false,
    });

    const signInMutation = useMutation({
        mutationFn: SignInAPI,
        onSuccess: () => {
            getUserProfileRefetch();
            setUserSignInSuccess(true);
        },
        onError(error) {
            notify(_.get(error, 'message', ''));
        },
    });

    const onSubmit: SubmitHandler<SignInFormSchemaType> = (data) => {
        signInMutation.mutate(data);
    };

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault();
    };

    console.log({
        status,
        isSuccess,
        isFetched,
    });

    useEffect(() => {
        if (status === 'success' && userSignInSuccess) {
            navigate('/dashboard');
        }
    }, [status, userSignInSuccess]);

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
                            autoFocus
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
