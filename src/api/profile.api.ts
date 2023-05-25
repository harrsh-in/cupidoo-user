import endpoints from '../constants/apiEndpoints';
import axiosInstance from '../utils/interceptor';

export const GetUserProfileAPI = async () => {
    return await axiosInstance.get(endpoints.profile.get);
};
