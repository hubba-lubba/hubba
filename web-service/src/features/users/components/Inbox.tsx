import { useState, useEffect } from 'react';
import { Layout } from '@/components/layout';
import { Message } from '../types';
import { getInbox } from '../api';

type InboxMessageProps = {
    message: Message;
};

const InboxMessage = (props: InboxMessageProps) => {
    const { message } = props;
    return (
        // change style (background color or opacity) based on read status
        // each message can be expanded or folded to show more details (content)
        <div className="h-24 w-full bg-hubba-800 p-6">
            <h1>{message.subject}</h1>
            <div>{message.sender}</div>
            <div>{message.timestamp}</div>
            <div>{message.content}</div>
        </div>
    );
};

export const Inbox = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        // fetch messages
        const fetchMessages = async () => {
            const messagesData = await getInbox();
            setMessages(messagesData.messages);

            setLoading(false);
        };

        fetchMessages().catch((err) =>
            setError('Error retrieving messages: ' + err),
        );
    }, []);

    if (loading) return <p>Loading messages...</p>;
    if (error) return <div>error</div>;

    return (
        <Layout variant="left">
            <div className="flex h-full w-full flex-col space-y-6 p-24">
                {messages.map((message) => (
                    <InboxMessage
                        key={`message-{message.id}`}
                        message={message}
                    />
                ))}
            </div>
        </Layout>
    );
};
