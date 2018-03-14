import confByEnv from './config.json';

const env =
    process.env.NODE_ENV === 'development'
        ? 'staging'
        : process.env.REACT_APP_ENV;

export default confByEnv[env];
