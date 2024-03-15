// get id from url
import { useParams } from 'react-router-dom';

export const OrgPage = () => {
    const { id } = useParams<{ id: string }>();

    console.log('org page id', id);
    return (
        <div>
            <h1>Org {id}</h1>
        </div>
    );
};
