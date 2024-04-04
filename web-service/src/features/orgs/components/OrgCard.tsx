import { Card } from '@/components/library';
import { Org } from '@/features/orgs/types';

export const OrgCard = ({ org }: { org: Org }) => {
    return (
        <Card url={`orgs/${org.org_id}`}>
            <img src={org.image} />
            <div>
                <h2>{org.name}</h2>
                <h2>{org.description}</h2>
                <h2>{org.tags}</h2>
            </div>
        </Card>
    );
};
