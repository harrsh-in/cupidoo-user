import endpoints from '../constants/apiEndpoints';
import axiosInstance from '../utils/interceptor';

export const GetCountriesAPI = async () => {
    return await axiosInstance.get(endpoints.common.getCountries);
};

export const GetStatesAPI = async (countryId: string) => {
    return await axiosInstance.get(
        endpoints.common.getStates + '/' + countryId
    );
};

export const GetCitiesAPI = async (stateId: string) => {
    return await axiosInstance.get(endpoints.common.getCities + '/' + stateId);
};
