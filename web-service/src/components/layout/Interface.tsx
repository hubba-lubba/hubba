import { Navbar, Sidebar } from '@/components/layout';

interface InterfaceProps {
    children: React.ReactNode;
}

export const Interface = ({ children }: InterfaceProps) => {
    return (
        <div className="flex h-screen flex-col">
            <Navbar />
            <div className="ml-56 mt-20 flex flex-1 overflow-hidden">
                <Sidebar />
                <main className="flex-1 overflow-y-auto">{children}</main>
            </div>
        </div>
    );
};
