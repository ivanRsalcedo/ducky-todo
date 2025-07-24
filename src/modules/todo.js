import { format } from "date-fns";

const Todo = (name, notes = '', date = '', time = '', priority = 'default') => {
    if (!date && time)
        date = format(new Date(), 'yyyy-MM-dd');
    return {
        name,
        notes,
        date,
        time,
        priority,
        id: crypto.randomUUID()
    }
};

export default Todo;