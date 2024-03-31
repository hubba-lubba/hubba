import React, { createContext, useState } from 'react';

interface ModalContextType {
    showUploadModal: boolean;
    setShowUploadModal: (showUploadModal: boolean) => void;
}

export const ModalContext = createContext<ModalContextType>(null!);

export const ModalProvider = ({
    children,
}: React.PropsWithChildren<object>) => {
    const [showUploadModal, setShowUploadModal] = useState<boolean>(false);

    return (
        <ModalContext.Provider
            value={{
                showUploadModal,
                setShowUploadModal,
            }}
        >
            {children}
        </ModalContext.Provider>
    );
};
