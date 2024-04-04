import React, { createContext, useState } from 'react';

interface ModalContextType {
    showUploadModal: boolean;
    setShowUploadModal: (showUploadModal: boolean) => void;
    showStreamModal: boolean;
    setShowStreamModal: (showStreamModal: boolean) => void;
}

export const ModalContext = createContext<ModalContextType>(null!);

export const ModalProvider = ({
    children,
}: React.PropsWithChildren<object>) => {
    const [showUploadModal, setShowUploadModal] = useState<boolean>(false);
    const [showStreamModal, setShowStreamModal] = useState<boolean>(false);

    return (
        <ModalContext.Provider
            value={{
                showUploadModal,
                setShowUploadModal,
                showStreamModal,
                setShowStreamModal,
            }}
        >
            {children}
        </ModalContext.Provider>
    );
};
