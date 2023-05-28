import endpoints from '../constants/apiEndpoints';
import { delay } from '../utils';
import axiosInstance from '../utils/interceptor';

export const GetUserProfileAPI = async () => {
    return await axiosInstance.get(endpoints.profile.get);
};

export const CompleteStepOneProfileAPI = async (body: {
    address: string;
    pinCode: string;
    countryId: string;
    stateId: string;
    cityId: string;
}) => {
    console.log(body);
    await delay(1000);

    return true;
};
