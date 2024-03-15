// clientside api functions here
// auth
import  { logout } from '@/features/auth/api';

export const signout = async () => {
    try {
        await logout();
    } catch (error: any) {
        console.log(`Error: ${error.message}`);
    }
}