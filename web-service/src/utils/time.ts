export const formatTime = (date: Date) => {
    const time = date.toLocaleString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        timeZone: 'UTC',
        timeZoneName: 'short',
        hour12: true,
        hour: 'numeric',
        minute: 'numeric',
    });
    return time;
};
