import { format, isToday, isTomorrow, isThisWeek } from 'date-fns';

function formatTime(date) {
    const raw = format(date, 'h:mm a');
    return raw.includes(':00') ? raw.replace(':00', '') : raw;
}

export function formatDisplayTodo(dateStr, timeStr) {
    if (dateStr) {
        const date = new Date(`${dateStr}T${timeStr || '00:00'}`);
        let formattedDate = '';

        if (isToday(date)) {
            formattedDate = 'Today';
        } else if (isTomorrow(date)) {
            formattedDate = 'Tomorrow';
        } else if (isThisWeek(date, { weekStartsOn: 1 })) {
            formattedDate = format(date, 'EEEE');
        } else {
            formattedDate = format(date, 'MMM d');
        }

        const formattedTime = timeStr ? formatTime(date) : '';
        return [formattedDate, formattedTime];
    }

    if (timeStr) {
        const timeOnly = new Date(`1970-01-01T${timeStr}`);
        return ['', formatTime(timeOnly)];
    }

    return ['', ''];
}