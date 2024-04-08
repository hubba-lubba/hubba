import React, { createContext, useState } from 'react';

interface ModalContextType {
    showUploadModal: boolean;
    setShowUploadModal: (showUploadModal: boolean) => void;
    showStreamModal: boolean;
    setShowStreamModal: (showStreamModal: boolean) => void;
    showCreateOrgModal: boolean;
    setShowCreateOrgModal: (showCreateOrgModal: boolean) => void;
    showCreateEventModal: boolean;
    setShowCreateEventModal: (showCreateEventModal: boolean) => void;
}

export const ModalContext = createContext<ModalContextType>(null!);

export const ModalProvider = ({
    children,
}: React.PropsWithChildren<object>) => {
    const [showUploadModal, setShowUploadModal] = useState<boolean>(false);
    const [showStreamModal, setShowStreamModal] = useState<boolean>(false);
    const [showCreateOrgModal, setShowCreateOrgModal] =
        useState<boolean>(false);
    const [showCreateEventModal, setShowCreateEventModal] =
        useState<boolean>(false);

    return (
        <ModalContext.Provider
            value={{
                showUploadModal,
                setShowUploadModal,
                showStreamModal,
                setShowStreamModal,
                showCreateOrgModal,
                setShowCreateOrgModal,
                showCreateEventModal,
                setShowCreateEventModal,
            }}
        >
            {children}
        </ModalContext.Provider>
    );
};
