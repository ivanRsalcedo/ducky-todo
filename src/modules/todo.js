const Todo = (name, notes = '', date = '', time = '', priority = '') => {
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