import { Navbar, Sidebar } from '@/components/layout';

interface InterfaceProps {
    children: React.ReactNode;
}

export const Interface = ({ children }: InterfaceProps) => {
    return (
        <div className="flex h-screen flex-col">
            <Navbar />
            {/* margin spacing for sidebar and nav */}
            <div className="ml-80 mt-32 flex flex-1 overflow-hidden">
                <Sidebar />
                <main className="flex-1 overflow-y-auto p-6">{children}</main>
            </div>
        </div>
    );
};
