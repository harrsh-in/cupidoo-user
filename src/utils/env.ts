const getOsEnv = (key: string) => {
    const value = import.meta.env[key];

    if (!value) {
        throw new Error('Key not found!');
    }

    return value;
};

const env = {
    userTokenKey: getOsEnv('VITE_USER_TOKEN_KEY'),
    serverUrl: getOsEnv('VITE_SERVER_URL'),
};

export default env;
