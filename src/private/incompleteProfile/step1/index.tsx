import RefreshIcon from '@mui/icons-material/Refresh';
import {
    Autocomplete,
    Box,
    Button,
    TextField,
    Typography,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import {
    GetCitiesAPI,
    GetCountriesAPI,
    GetStatesAPI,
} from '../../../api/common.api';
import PageLoader from '../../../components/PageLoader';
import { verifyPinCode } from '../../../utils';

const Step1 = () => {
    const [country, setCountry] = useState<ICountry | null>(null);
    const [state, setState] = useState<IState | null>(null);
    const [city, setCity] = useState<ICity | null>(null);
    const [address, setAddress] = useState<{
        address: string;
        pinCode: string;
    }>({
        address: '',
        pinCode: '',
    });
    const [errorMessages, setErrorMessages] = useState({
        country: '',
        state: '',
        city: '',
        address: '',
        pinCode: '',
    });

    const {
        data: countries,
        refetch: refetchCountries,
        status: countriesStatus,
        isFetching: isCountriesFetching,
    } = useQuery({
        queryKey: ['getCountries'],
        queryFn: GetCountriesAPI,
        keepPreviousData: true,
    });

    const {
        data: states,
        refetch: refetchStates,
        isFetching: isStatesFetching,
    } = useQuery({
        queryKey: ['getStates', country],
        queryFn: async () => (country ? GetStatesAPI(country.id) : null),
        keepPreviousData: true,
        enabled: Boolean(country),
    });

    const {
        data: cities,
        refetch: refetchCities,
        isFetching: isCitiesFetching,
    } = useQuery({
        queryKey: ['getCities', state],
        queryFn: async () => (state ? GetCitiesAPI(state.id) : null),
        keepPreviousData: true,
        enabled: Boolean(state),
    });

    const handleAddressChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        if (e.target.value !== '\n') {
            setAddress((prev) => {
                return {
                    ...prev,
                    address: e.target.value,
                };
            });
        }
    };

    const handlePinCodeChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setAddress((prev) => {
            return {
                ...prev,
                pinCode: e.target.value,
            };
        });
    };

    const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrorMessages({
            country: '',
            state: '',
            city: '',
            address: '',
            pinCode: '',
        });
        if (!country) {
            setErrorMessages((prev) => {
                return {
                    ...prev,
                    country: 'Please select a country.',
                };
            });
            return;
        }
        if (!state) {
            setErrorMessages((prev) => {
                return {
                    ...prev,
                    state: 'Please select a state.',
                };
            });
            return;
        }
        if (!city) {
            setErrorMessages((prev) => {
                return {
                    ...prev,
                    city: 'Please select a city.',
                };
            });
            return;
        }
        if (!address.address) {
            setErrorMessages((prev) => {
                return {
                    ...prev,
                    address: 'Please enter address.',
                };
            });
            return;
        }
        if (!address.pinCode) {
            setErrorMessages((prev) => {
                return {
                    ...prev,
                    pinCode: 'Please enter pin-code.',
                };
            });
            return;
        }
        if (!verifyPinCode(address.pinCode)) {
            setErrorMessages((prev) => {
                return {
                    ...prev,
                    pinCode: 'Please enter a valid pin-code.',
                };
            });
            return;
        }

        const countryId = country.id;
        const stateId = state.id;
        const cityId = city.id;

        console.log({
            ...address,
            countryId,
            stateId,
            cityId,
        });
    };

    useEffect(() => {
        if (!isCountriesFetching && countries) {
            setCountry(_.get(countries, 'countries[0]', null));
        }
    }, [countries, isCountriesFetching]);

    // TODO: Delete later
    useEffect(() => {
        if (!isStatesFetching && states) {
            setState(_.get(states, 'states[11]', null));
        }
    }, [states, isStatesFetching]);
    useEffect(() => {
        if (!isCitiesFetching && cities) {
            setCity(_.get(cities, 'cities[4]', null));
        }
    }, [cities, isCitiesFetching]);

    return countriesStatus === 'loading' ? (
        <PageLoader />
    ) : (
        <Box
            sx={{
                marginY: '4rem',
            }}
        >
            <Typography
                variant="h4"
                sx={{
                    textAlign: 'center',
                    marginBottom: '2rem',
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
                    gap: '1rem',
                }}
                noValidate
                component="form"
                autoComplete="off"
                onSubmit={(e) => {
                    if (
                        country &&
                        state &&
                        city &&
                        address.address &&
                        address.pinCode
                    ) {
                        handleSubmitForm(e);
                    }
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <Autocomplete
                        disablePortal
                        autoHighlight
                        disabled
                        id="country-input"
                        value={country}
                        onChange={(_, newValue: ICountry | null) => {
                            setCity(null);
                            setState(null);
                            newValue ? setCountry(newValue) : null;
                        }}
                        options={_.get(countries, 'countries', [])}
                        getOptionLabel={(option) => _.get(option, 'name')}
                        renderOption={(props, option) => (
                            <Box component="li" {...props}>
                                ({_.get(option, 'phoneCode')}){' '}
                                {_.get(option, 'name')}
                            </Box>
                        )}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Country"
                                size="small"
                                error={Boolean(errorMessages.country)}
                                helperText={errorMessages.country}
                            />
                        )}
                        sx={{
                            flex: 1,
                        }}
                    />

                    <Box
                        onClick={() => {
                            if (!isCountriesFetching) {
                                setCity(null);
                                setState(null);
                                setCountry(null);
                                refetchCountries();
                            }
                        }}
                        sx={{
                            cursor: isCountriesFetching
                                ? 'not-allowed'
                                : 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <RefreshIcon
                            sx={{
                                color: 'rgba(0, 0, 0, 0.63)',
                            }}
                        />
                    </Box>
                </Box>

                <Box
                    sx={{
                        alignItems: 'center',
                        display: Boolean(country) ? 'flex' : 'none',
                    }}
                >
                    <Autocomplete
                        disablePortal
                        autoHighlight
                        // disabled={isStatesFetching}
                        disabled // TODO: Change later
                        clearIcon={false}
                        id="state-input"
                        value={state}
                        onChange={(_, newValue: IState | null) => {
                            setCity(null);
                            newValue ? setState(newValue) : null;
                        }}
                        options={_.get(states, 'states', [])}
                        getOptionLabel={(option) => _.get(option, 'name')}
                        renderOption={(props, option) => (
                            <Box component="li" {...props}>
                                {_.get(option, 'name')}
                            </Box>
                        )}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="State"
                                size="small"
                                error={Boolean(errorMessages.state)}
                                helperText={errorMessages.state}
                            />
                        )}
                        sx={{
                            flex: 1,
                        }}
                    />

                    <Box
                        onClick={() => {
                            if (!isStatesFetching) {
                                setCity(null);
                                setState(null);
                                refetchStates();
                            }
                        }}
                        sx={{
                            cursor: isStatesFetching
                                ? 'not-allowed'
                                : 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <RefreshIcon
                            sx={{
                                color: 'rgba(0, 0, 0, 0.63)',
                            }}
                        />
                    </Box>
                </Box>

                <Box
                    sx={{
                        alignItems: 'center',
                        display: Boolean(state) ? 'flex' : 'none',
                    }}
                >
                    <Autocomplete
                        disablePortal
                        autoHighlight
                        // disabled={isCitiesFetching}
                        disabled // TODO: Change later
                        clearIcon={false}
                        id="city-input"
                        value={city}
                        onChange={(_, newValue: ICity | null) => {
                            newValue ? setCity(newValue) : null;
                        }}
                        options={_.get(cities, 'cities', [])}
                        getOptionLabel={(option) => _.get(option, 'name')}
                        renderOption={(props, option) => (
                            <Box component="li" {...props}>
                                {_.get(option, 'name')}
                            </Box>
                        )}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="City"
                                size="small"
                                error={Boolean(errorMessages.city)}
                                helperText={errorMessages.city}
                            />
                        )}
                        sx={{
                            flex: 1,
                        }}
                    />

                    <Box
                        onClick={() => {
                            if (!isCitiesFetching) {
                                setCity(null);
                                refetchCities();
                            }
                        }}
                        sx={{
                            cursor: isCitiesFetching
                                ? 'not-allowed'
                                : 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <RefreshIcon
                            sx={{
                                color: 'rgba(0, 0, 0, 0.63)',
                            }}
                        />
                    </Box>
                </Box>

                <TextField
                    fullWidth
                    multiline
                    size="small"
                    label="Address"
                    value={address.address}
                    onChange={handleAddressChange}
                    sx={{
                        display: Boolean(city) ? 'block' : 'none',
                    }}
                    error={Boolean(errorMessages.address)}
                    helperText={errorMessages.address}
                />

                <TextField
                    fullWidth
                    size="small"
                    label="Pin code"
                    value={address.pinCode}
                    onChange={handlePinCodeChange}
                    sx={{
                        display: Boolean(city) ? 'block' : 'none',
                    }}
                    error={Boolean(errorMessages.pinCode)}
                    helperText={errorMessages.pinCode}
                />

                <Button
                    variant="outlined"
                    type="submit"
                    sx={{
                        display:
                            country &&
                            state &&
                            city &&
                            address.address &&
                            address.pinCode
                                ? 'block'
                                : 'none',
                    }}
                >
                    Submit
                </Button>
            </Box>
        </Box>
    );
};

export default Step1;

interface ICountry {
    id: string;
    name: string;
    phoneCode: string;
    shortName: string;
}

interface IState {
    id: string;
    name: string;
    countryId: string;
}

interface ICity {
    id: string;
    name: string;
    stateId: string;
}
