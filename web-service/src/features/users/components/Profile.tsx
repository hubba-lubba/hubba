import { logout } from '@/lib/auth';

export function Profile() {

    const signOut = async (): Promise<void> => {
        try {
            await logout();
        } catch (error: any) {
            console.log(`Error: ${error.message}`);
        }
    };

    return (
        <>
            <p>Profile</p>
            <p onClick={signOut} className="cursor-pointer underline">Sign out</p>
        </>
    )
}
