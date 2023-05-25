import endpoints from '../constants/apiEndpoints';
import { SignInFormSchemaType } from '../public/signin/schema';
import axiosInstance from '../utils/interceptor';

export const SignInAPI = async (body: SignInFormSchemaType) => {
    return await axiosInstance.post(endpoints.auth.signin, body);
};
