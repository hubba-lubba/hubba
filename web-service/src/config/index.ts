// clientside secrets
export const sm = 560;
export const md = 768;
export const lg = 976;

export const USER_API_URL = import.meta.env.DEV
    ? 'http://localhost:8000'
    : 'https://user-api.eddisonso.com';
export const EVENTS_API_URL = import.meta.env.DEV
    ? 'http://localhost:8001'
    : 'https://events-api.eddisonso.com';
export const ORGS_API_URL = import.meta.env.DEV
    ? 'http://localhost:8002'
    : 'https://orgs-api.eddisonso.com';
