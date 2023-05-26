import RefreshIcon from '@mui/icons-material/Refresh';
import { Autocomplete, Box, TextField } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import _ from 'lodash';
import { useState } from 'react';
import {
    GetCitiesAPI,
    GetCountriesAPI,
    GetStatesAPI,
} from '../../../api/common.api';
import PageLoader from '../../../components/PageLoader';

const Step1 = () => {
    const [country, setCountry] = useState<ICountry | null>(null);
    const [state, setState] = useState<IState | null>(null);
    const [city, setCity] = useState<ICity | null>(null);

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

    return countriesStatus === 'loading' ? (
        <PageLoader />
    ) : (
        <Box
            sx={{
                maxWidth: '35rem',
                marginX: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
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
                    disabled={isCountriesFetching}
                    id="combo-box-demo"
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
                        <TextField {...params} label="Country" size="small" />
                    )}
                    sx={{
                        flex: 1,
                    }}
                />

                <Box
                    onClick={() =>
                        isCountriesFetching ? null : refetchCountries()
                    }
                    sx={{
                        cursor: isCountriesFetching ? 'not-allowed' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <RefreshIcon />
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
                    disabled={isStatesFetching}
                    id="combo-box-demo"
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
                        <TextField {...params} label="State" size="small" />
                    )}
                    sx={{
                        flex: 1,
                    }}
                />

                <Box
                    onClick={() => (isStatesFetching ? null : refetchStates())}
                    sx={{
                        cursor: isStatesFetching ? 'not-allowed' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <RefreshIcon />
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
                    disabled={isCitiesFetching}
                    id="combo-box-demo"
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
                        <TextField {...params} label="City" size="small" />
                    )}
                    sx={{
                        flex: 1,
                    }}
                />

                <Box
                    onClick={() => (isCitiesFetching ? null : refetchCities())}
                    sx={{
                        cursor: isCitiesFetching ? 'not-allowed' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <RefreshIcon />
                </Box>
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
