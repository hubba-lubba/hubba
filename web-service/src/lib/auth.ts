// clientside api functions here
// auth
import { logout, getidtoken } from '@/features/auth/api';
import { getAuth } from 'firebase/auth';

export const signout = async () => {
    try {
        await logout();
    } catch (error) {
        console.log(`Error: ${(error as Error).message}`);
    }
}

export const logUserDevInfo = async () => {
    const idToken = await getidtoken();
    const auth = getAuth();

    console.log(`idToken: ${idToken}`);
    console.log(`uid: ${auth.currentUser?.uid}`);
}