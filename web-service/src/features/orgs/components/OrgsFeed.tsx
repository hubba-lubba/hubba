import { Layout } from '@/components/layout';
import { Grid } from '@/components/library';
import { useEffect, useState } from 'react';
import { getDiscoverOrgs } from '../api';
import { Org } from '../types';
import { OrgCard } from './OrgCard';

export const OrgsFeed = () => {
    const [discoverOrgs, setDiscoverOrgs] = useState<Org[]>([]);

    // put this into each feature as a component
    useEffect(() => {
        // once this is complete, move into individual features as a component
        const fetchData = async () => {
            const discoverOrgsData = await getDiscoverOrgs();
            setDiscoverOrgs(discoverOrgsData.orgs);
        };

        fetchData();
    }, []);
    return (
        <Layout style="w-full flex-col">
            <Grid title="Orgs">
                {discoverOrgs!.map((org, index) => (
                    <OrgCard
                        key={`upcoming-${org.org_id}-${index}`}
                        org={org}
                    ></OrgCard>
                ))}
            </Grid>
        </Layout>
    );
};
