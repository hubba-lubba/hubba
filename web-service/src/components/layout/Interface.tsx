import { Navbar, Sidebar } from '@/components/layout';
import {
    UploadModal,
    StreamModal,
    CreateOrgModal,
} from '@/components/elements/modals';
import { CreateEventModal } from '../elements/modals/CreateEventModal';

interface InterfaceProps {
    children: React.ReactNode;
}

export const Interface = ({ children }: InterfaceProps) => {
    return (
        <>
            <UploadModal />
            <StreamModal />
            <CreateOrgModal />
            <CreateEventModal />
            <div className="flex h-screen flex-col">
                <Navbar />
                {/* margin spacing for sidebar and nav */}
                <div className="ml-sidebar mt-32 flex flex-1 overflow-hidden">
                    <Sidebar />
                    <main className="scroll-gutter flex-1 overflow-y-auto p-8">
                        {children}
                    </main>
                </div>
            </div>
        </>
    );
};
