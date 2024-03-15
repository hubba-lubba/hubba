import { useParams } from "react-router-dom";

export const EventPage = () => {
    const { id } = useParams<{ id: string }>();
    
    return (
        <div>
            <h1>Event {id}</h1>
        </div>
    );
}