import React from 'react';
import { ChannelButton, EventButton, OrgButton } from './Buttons';
import defaultimg from '../images/defaultimg.png';
import '../styles/Sidebar.scss';

export default function () {
    return (
        <div className="sidebar-container">
            <div className="sidebar-library">
                <p className="library-title">Library</p>
                <div className="section-block">
                    <p className="section-title">Channels</p>
                    <ChannelButton icon={defaultimg} name="channel 1" />
                    <ChannelButton icon={defaultimg} name="channel 2" />
                    <ChannelButton icon={defaultimg} name="channel 3" />
                    <ChannelButton icon={defaultimg} name="channel 4" />
                    <ChannelButton icon={defaultimg} name="channel 5" />
                </div>
                <div className="section-block">
                    <p className="section-title">Events</p>
                    <EventButton name="event 1" />
                    <EventButton name="event 2" />
                    <EventButton name="event 3" />
                    <EventButton name="event 4" />
                </div>
                <div className="section-block">
                    <p className="section-title">Orgs</p>
                    <OrgButton name="org 1" />
                    <OrgButton name="org 2" />
                    <OrgButton name="org 3" />
                    <OrgButton name="org 4" />
                </div>
            </div>
        </div>
    );
}
