import { Card, Thumbnail } from '@/components/library';
import { Org } from '@/features/orgs/types';

export const OrgCard = ({ org }: { org: Org }) => {
    return (
        <Card
            url={`/orgs/${org.org_id}`}
            media={<Thumbnail src={org.image} />}
            footer={
                <div className="flex flex-col">
                    <div className="w-2/12">{org.name}</div>
                    <div>{org.description}</div>
                    {/* <div>{org.tags}</div> */}
                </div>
            }
        />
    );
};
