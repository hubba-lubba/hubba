// clientside secrets
export const sm = 560;
export const md = 768;
export const lg = 976;

// set dev to import.meta.env.DEV when local server issues are fixed
const dev = import.meta.env.DEV;

export const USER_API_URL = dev
    ? 'http://localhost:8000'
    : 'https://user-api.eddisonso.com';
export const EVENTS_API_URL = dev
    ? 'http://localhost:8001'
    : 'https://events-api.eddisonso.com';
export const ORGS_API_URL = dev
    ? 'http://localhost:8002'
    : 'https://orgs-api.eddisonso.com';

export const DOMAIN = dev
    ? 'localhost'
    : 'hubba.eddisonso.com';
