// import { useState, useEffect } from 'react';
// import { PageLayout } from '@/components/layout';
// import { Message, User } from '../types';
// import { getMockInbox, getMockUser } from '../api';
// import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
// import { useNavigate } from 'react-router-dom';
// import { FaRegUserCircle } from 'react-icons/fa';
// import clsx from 'clsx';

// type InboxMessageProps = {
//     message: Message;
// };

// // TODO: message read status functionality

// const InboxMessage = (props: InboxMessageProps) => {
//     const { message } = props;
//     const [sender, setSender] = useState<User>();
//     const navigate = useNavigate();
//     const [expanded, setExpanded] = useState<boolean>(false);
//     const timestamp_date = message.timestamp.toLocaleString('en-US', {
//         month: 'short',
//         day: 'numeric',
//         year: 'numeric',
//     });

//     const timestamp_time = message.timestamp.toLocaleString('en-US', {
//         hour12: true,
//         hour: 'numeric',
//         minute: 'numeric',
//     });

//     useEffect(() => {
//         const fetchData = async () => {
//             const sender = (await getMockUser(message.sender)).user;
//             setSender(sender);
//         };
//         fetchData();
//     }, [message]);

//     return (
//         // change style (background color or opacity) based on read status
//         // each message can be expanded or folded to show more details (content)
//         // when expanded, original div shows expanded subject, new div at bottom shows content.
//         <div
//             className={clsx(
//                 'flex flex-col rounded',
//                 message.read ? 'bg-hubba-900' : 'bg-hubba-800',
//             )}
//         >
//             <div
//                 className="flex h-24 w-full select-none flex-row p-2"
//                 onClick={() => setExpanded(!expanded)}
//             >
//                 <div
//                     className="flex w-1/12 cursor-pointer flex-col items-center justify-center"
//                     onClick={() => navigate(`/user/${sender?.user_id}`)}
//                 >
//                     {sender?.profile_image ? (
//                         <img src={sender?.profile_image} alt="" width={50} />
//                     ) : (
//                         <FaRegUserCircle size={50} />
//                     )}
//                     <div>{sender?.username}</div>
//                 </div>
//                 <div className="mx-4 flex w-9/12 flex-col overflow-hidden">
//                     <div className={clsx(!expanded ? 'truncate' : '')}>
//                         {message.subject}
//                     </div>
//                     {!expanded && (
//                         <div className="truncate-end mt-2">
//                             {message.content}
//                         </div>
//                     )}
//                 </div>
//                 <div className="flex w-2/12 flex-col justify-center px-1">
//                     <div>{timestamp_date}</div>
//                     <div>{timestamp_time}</div>
//                 </div>
//                 <div className="flex cursor-pointer items-center justify-center">
//                     {expanded ? (
//                         <MdKeyboardArrowUp size={32} />
//                     ) : (
//                         <MdKeyboardArrowDown size={32} />
//                     )}
//                 </div>
//             </div>
//             {expanded && (
//                 <div className="flex flex-row p-2">
//                     <div className="w-1/12"></div>
//                     <div className="mx-4 w-9/12">{message.content}</div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export const Inbox = () => {
//     const [messages, setMessages] = useState<Message[]>([]);
//     const [loading, setLoading] = useState<boolean>(true);
//     const [error, setError] = useState<string>('');

//     useEffect(() => {
//         // fetch messages
//         const fetchMessages = async () => {
//             const messagesData = await getMockInbox();
//             setMessages(messagesData.messages);

//             setLoading(false);
//         };

//         fetchMessages().catch((err) =>
//             setError('Error retrieving messages: ' + err),
//         );
//     }, []);

//     if (loading) return <p>Loading messages...</p>;
//     if (error) return <div>error</div>;

//     return (
//         <PageLayout>
//             <div className="scroll-gutter space-y-4 overflow-y-auto">
//                 {messages.map((message) => (
//                     <InboxMessage
//                         key={`message-${message.message_id}`}
//                         message={message}
//                     />
//                 ))}
//             </div>
//         </PageLayout>
//     );
// };
