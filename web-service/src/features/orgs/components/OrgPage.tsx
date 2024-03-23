import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Org } from '../types';
import { User } from '@/features/users/types';
import { getOrg } from '../api';
import { Button } from '@/components/elements/buttons';
import { useNavigate } from 'react-router-dom';
import Linkify from 'linkify-react';

const MemberCard = ({ user }: { user: User }) => {
    const navigate = useNavigate();

    return (
        <Button
            variant="image"
            image={user.profile_image}
            handleClick={() => navigate(`/user/${user.id}`)}
            style="w-full p-2 h-12 flex align-center rounded bg-hubba-800"
        >
            {user.username}
        </Button>
    );
};

export const OrgPage = () => {
    const [org, setOrg] = useState<Org>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    const { id } = useParams<{ id: string }>();
    
    useEffect(() => {
        if(!id) return;
        const fetchData = async () => {
            const orgData = await getOrg(id);
            setOrg(orgData);
            setLoading(false);
        };
        
        fetchData().catch((err) => setError('Error loading page: ' + err));
    }, [id]);
    
    if (!id) return <div>Org not found</div>;
    if (!org) return <div>Org not found</div>;
    if (loading) return <p>Loading events...</p>;
    if (error) return <div>{error}</div>;

    return (
        <div className="flex h-full flex-row p-24">
            <div className="flex w-9/12 flex-row">
                <div>
                    <img className="rounded" src={org.image} alt={org.name} />
                </div>
                <div className="space-y-2 px-4">
                    <h1 className="text-3xl">{org.name}</h1>
                    <div>{org.users.length} members</div>
                    <Linkify
                        as="div"
                        options={{ target: '_blank', className: 'underline' }}
                    >
                        {org.description}
                    </Linkify>
                </div>
            </div>
            <div className="flex w-3/12 flex-col space-y-4 overflow-y-scroll px-8">
                {org.users.map((user, index) => (
                    <MemberCard key={`member-${org.id}-${index}`} user={user} />
                ))}
            </div>
        </div>
    );
};
