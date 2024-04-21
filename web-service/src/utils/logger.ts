import { LOG_LEVEL } from '@/config';

export const logger = (text: string) => {
    if (LOG_LEVEL === 'debug') {
        console.log(text);
    }
};
