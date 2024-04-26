// clientside secrets

// set dev to import.meta.env.DEV when local server issues are fixed
const dev = import.meta.env.DEV;
// const dev = false;

export const USER_API_URL = dev
    ? 'http://localhost:8000'
    : 'https://user-api.eddisonso.com';
export const EVENTS_API_URL = dev
    ? 'http://localhost:8001'
    : 'https://events-api.eddisonso.com';
export const ORGS_API_URL = dev
    ? 'http://localhost:8002'
    : 'https://organizations-api.eddisonso.com';
export const FILES_API_URL = dev
    ? 'http://localhost:8003'
    : 'https://file-api.eddisonso.com';

export const DOMAIN = dev ? 'localhost' : 'hubba.eddisonso.com';
// export const DOMAIN = dev ? 'hubba.eddisonso.com' : 'localhost';

export const LOG_LEVEL = dev ? 'debug' : 'info';
// export const LOG_LEVEL = dev ? 'info' : 'debug';
