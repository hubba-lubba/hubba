import { useContext } from 'react';
import { Modal } from '..';
import { ModalContext } from '@/contexts/ModalProvider';
import { Layout } from '@/components/layout';
import { UserContext } from '@/contexts/UserProvider';

export const StreamModal = () => {
    const { showStreamModal, setShowStreamModal } = useContext(ModalContext);
    const { userData, setStreamStatus } = useContext(UserContext);
    const actions = ['Start', 'Stop'];

    const handleClick = (status: 0 | 1) => {
        setStreamStatus(status);
        setShowStreamModal(false);
    };

    return (
        <Modal showState={[showStreamModal, setShowStreamModal]}>
            <Layout style="items-center justify-center h-full flex-col space-y-12">
                {userData ? (
                    <>
                        <h1 className="bold text-center text-3xl font-semibold">
                            {actions[userData?.streaming_status ?? 0]} a Stream
                        </h1>
                        <div>
                            {actions[userData?.streaming_status ?? 0]} a stream
                            with channel &nbsp;
                            <span className="font-bold">
                                {userData?.channel}
                            </span>
                            ?
                        </div>
                        {/* same button as SubmitButton in Form; componentize if time */}
                        <button
                            onClick={() =>
                                handleClick(
                                    userData.streaming_status === 0 ? 1 : 0, //gotta do this bc i set status to type 0 | 1 zzz
                                )
                            }
                            className="h-11 w-5/12 cursor-pointer rounded-md bg-hubba-500 hover:bg-hubba-400"
                        >
                            {actions[userData?.streaming_status ?? 0]}
                        </button>
                    </>
                ) : (
                    <h1 className="bold text-center text-3xl font-semibold">
                        You are not logged in.
                    </h1>
                )}
            </Layout>
        </Modal>
    );
};
