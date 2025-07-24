import { format } from 'date-fns';

export function formatDisplayTodo(dateStr, timeStr) {
    if(!dateStr || !timeStr) return ['', ''];
    const date = new Date(`${dateStr}T${timeStr || '00:00'}`);
    const formattedDate = format(date, 'MMM d');
    const rawTime = format(date, 'h:mm a');
    const formattedTime = rawTime.includes(':00')
        ? rawTime.replace(':00', '')
        : rawTime;

    return [formattedDate, formattedTime];
}