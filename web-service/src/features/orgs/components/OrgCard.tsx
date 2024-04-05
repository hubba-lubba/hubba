import { Card, Thumbnail } from '@/components/library';
import { Org } from '@/features/orgs/types';

export const OrgCard = ({ org }: { org: Org }) => {
    return (
        <Card
            url={`orgs/${org.org_id}`}
            media={<Thumbnail src={org.image} />}
            footer={
                <>
                    <h2>{org.name}</h2>
                    <h2>{org.description}</h2>
                    <h2>{org.tags}</h2>
                </>
            }
        />
    );
};
