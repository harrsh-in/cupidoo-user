import env from './env';

export const getUserToken = () => {
    return localStorage.getItem(env.userTokenKey);
};

export const setUserToken = (value: string) => {
    localStorage.setItem(env.userTokenKey, value);
};

export const removeUserToken = () => {
    localStorage.removeItem(env.userTokenKey);
};
