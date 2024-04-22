import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    ChangeName,
    ChangeThumbnail,
    ChangeDesc,
    ChangePrizes,
    ChangeTime,
    ChangeUrl,
} from './settings_forms';
import { Layout } from '@/components/layout';
import { Event } from '../types';
import { get_event } from '../api';

export const EventSettingsForm = () => {
    const [event, setEvent] = useState<Event>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        if (!id) return;
        const fetchData = async () => {
            const eventData = await get_event(id);
            setEvent(eventData);
            setLoading(false);
        };

        fetchData().catch((err) => setError('Error loading page: ' + err));
    }, [id]);

    if (loading || !event) return <p>Loading event...</p>;

    return (
        <Layout style="flex-col items-center h-full">
            {error && <div>{error}</div>}
            <h1 className="text-5xl font-bold">Settings</h1>

            <section className="flex h-[90%] w-5/6 flex-row pt-6">
                <ChangeThumbnail event={event} />
                <div className="scroll-gutter flex h-full w-5/6 flex-col gap-16 overflow-y-auto">
                    <ChangeName event={event} />
                    <ChangeDesc event={event} />
                    <ChangeUrl event={event} />
                    <ChangeTime event={event} />
                    <ChangePrizes event={event} />
                </div>
            </section>
        </Layout>
    );
};
