import { MenuButton, ChannelButton, EventButton, OrgButton } from './Buttons';
import defaultimg from '../images/defaultimg.png';
import '../styles/Sidebar.scss';

export default function Sidebar() {
    return (
        <div className="sidebar-container">
            <div className="sidebar-library">
                <div className="section-block">
                    <MenuButton icon={defaultimg} name="Feed" />
                    <MenuButton icon={defaultimg} name="Events" />
                    <MenuButton icon={defaultimg} name="Organizations" />
                    <MenuButton icon={defaultimg} name="Community" />
                    <MenuButton icon={defaultimg} name="Education" />
                </div>
                <div className="section-block">
                    <small className="section-title">DISCOVER</small>
                    <ChannelButton icon={defaultimg} name="channel 1" />
                    <ChannelButton icon={defaultimg} name="channel 2" />
                    <ChannelButton icon={defaultimg} name="channel 3" />
                    <ChannelButton icon={defaultimg} name="channel 4" />
                    <ChannelButton icon={defaultimg} name="channel 5" />
                    <small className="expand-section">SHOW MORE</small>
                </div>
                <div className="section-block">
                    <small className="section-title">UPCOMING EVENTS</small>
                    <EventButton name="event 1" />
                    <EventButton name="event 2" />
                    <EventButton name="event 3" />
                    <EventButton name="event 4" />
                </div>
                <div className="section-block">
                    <small className="section-title">MY ORGS</small>
                    <OrgButton name="org 1" />
                    <OrgButton name="org 2" />
                    <OrgButton name="org 3" />
                    <OrgButton name="org 4" />
                    <MenuButton icon={defaultimg} name="Join an org" />
                </div>
            </div>
        </div>
    );
}
