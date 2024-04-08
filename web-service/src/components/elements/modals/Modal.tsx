import React from 'react';
import { CgClose } from 'react-icons/cg';
import clsx from 'clsx';

// locally managed showState allows all modals to act independently
type ModalProps = {
    children: React.ReactNode;
    showState: [boolean, (arg0: boolean) => void]; // arg0 is a generic parameter name
    className?: string;
};

export const Modal = ({ children, showState, className }: ModalProps) => {
    const [isOpen, setIsOpen] = showState;

    const handleClose = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsOpen(false);
    };

    return (
        <>
            {isOpen && (
                <div
                    className="absolute z-50 flex h-screen w-screen items-center justify-center bg-hubba-800/[0.4]"
                    onClick={(e) => handleClose(e)}
                >
                    <div
                        className={clsx(
                            'scroll-gutter relative h-[400px] w-[600px] min-w-[500px] overflow-y-auto rounded bg-hubba-900 p-4 shadow-md shadow-hubba-900',
                            className,
                        )}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <CgClose
                            className="absolute right-4 cursor-pointer"
                            size={24}
                            onClick={(e) => handleClose(e)}
                        />
                        {children}
                    </div>
                </div>
            )}
        </>
    );
};
