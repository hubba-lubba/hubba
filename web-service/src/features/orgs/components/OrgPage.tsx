import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Org } from '../types';
import { User } from '@/features/users/types';
import { getMockOrg } from '../api';
import { Button } from '@/components/elements/buttons';
import { useNavigate } from 'react-router-dom';
import Linkify from 'linkify-react';
import { PageLayout } from '@/components/layout';
import { getMockUser } from '@/features/users/api';
import { Pfp } from '@/components/elements';

const MemberCard = ({ user_id }: { user_id: string }) => {
    const [user, setUser] = useState<User>();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const userData = (await getMockUser(user_id)).user;
            setUser(userData);
        };

        fetchData();
    }, [user_id]);

    return (
        <Button
            variant="image"
            icon={<Pfp image={user?.profile_image} />}
            handleClick={() => navigate(`/user/${user_id}`)}
            style="w-[225px] p-2 !h-12 flex align-center rounded bg-hubba-800"
        >
            {user?.username ?? `User ${user_id}`}
        </Button>
    );
};

export const OrgPage = () => {
    const [org, setOrg] = useState<Org>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        if (!id) return;
        const fetchData = async () => {
            const orgData = (await getMockOrg(id, 'faide')).org;
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
        <PageLayout>
            <div className="flex flex-col lg:flex-row">
                <div className="flex w-8/12 flex-row items-center">
                    <div className="min-w-[250px]">
                        <img
                            className="rounded"
                            src={org.image}
                            alt={org.name}
                            width={250}
                        />
                    </div>
                    <div className="space-y-6 px-4">
                        <h1 className="text-4xl font-bold">{org.name}</h1>
                        <div>{org.users.length} members</div>
                        <Linkify
                            as="div"
                            options={{
                                target: '_blank',
                                className: 'underline',
                            }}
                        >
                            {org.description}
                        </Linkify>
                        <div className="flex w-full items-center justify-center">
                            <button className="w-[150px] rounded-2xl bg-hubba-500 px-3 py-2 font-bold">
                                JOIN
                            </button>
                        </div>
                    </div>
                </div>
                <div className="scroll-gutter mt-6 flex w-full min-w-[300px] flex-col items-center justify-start space-y-4 overflow-y-auto lg:mt-0 lg:w-4/12 lg:px-8">
                    {org.users.map((user_id, index) => (
                        <MemberCard
                            key={`member-${org.org_id}-${index}`}
                            user_id={user_id}
                        />
                    ))}
                </div>
            </div>
        </PageLayout>
    );
};
