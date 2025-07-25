import { format } from "date-fns";

const Todo = (name, notes = '', date = '', time = '', priority = 'default', completed = false) => {
    if (!date && time)
        date = format(new Date(), 'yyyy-MM-dd');
    return {
        name,
        notes,
        date,
        time,
        priority,
        completed,
        id: crypto.randomUUID()
    }
};

export default Todo;