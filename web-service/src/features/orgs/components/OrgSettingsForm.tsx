import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    ChangeName,
    ChangeImage,
    ChangeChannel,
    ChangeDesc,
} from './settings_forms';
import { Layout } from '@/components/layout';
import { Org } from '../types';
import { get_org } from '../api';

export const OrgSettingsForm = () => {
    const [org, setOrg] = useState<Org>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        if (!id) return;
        const fetchData = async () => {
            const orgData = await get_org(id);
            setOrg(orgData);
            setLoading(false);
        };

        fetchData().catch((err) => setError('Error loading page: ' + err));
    }, [id]);

    if (loading || !org) return <p>Loading org...</p>;

    return (
        <Layout style="flex-col items-center h-full">
            {error && <div>{error}</div>}
            <h1 className="text-5xl font-bold">Settings</h1>

            <section className="flex h-[90%] w-5/6 flex-row pt-6 space-x-16">
                <ChangeImage org={org} />
                <div className="scroll-gutter flex h-full w-5/6 flex-col gap-16 overflow-y-auto">
                    <ChangeName org={org} />
                    <ChangeChannel org={org} />
                    <ChangeDesc org={org} />
                </div>
            </section>
        </Layout>
    );
};
