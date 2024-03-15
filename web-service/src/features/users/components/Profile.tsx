import { useParams } from 'react-router-dom';

export const Profile = () => {
    const { id } = useParams<{ id: string }>();

    return <div>{id ? <h1>User {id}</h1> : <h1>Profile</h1>}</div>;
};
