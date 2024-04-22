// clientside api functions here
// auth
import { logout, changeemail, changepassword, changeusername, getidtoken } from '@/features/auth/api';
import { getAuth } from 'firebase/auth';

export const signout = async () => {
    try {
        await logout();
    } catch (error) {
        console.log(`Error: ${(error as Error).message}`);
    }
}

export const editemail = async (email: string) => {
    try {
        await changeemail(email);
    } catch (error) {
        console.log(`Error: ${(error as Error).message}`);
    }
}

export const editpassword = async (password: string, newPassword: string) => {
    try {
        await changepassword(password, newPassword);
    } catch (error) {
        console.log(`Error: ${(error as Error).message}`);
    }
}

export const editusername = async (username: string) => {
    try {
        await changeusername(username);
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