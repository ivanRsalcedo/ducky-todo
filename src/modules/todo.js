const Todo = (title, notes = '', date = '', time = '', priority = '') => {
    return {
        title,
        notes,
        date,
        time,
        priority,
        completed: false
    };
};

export default Todo;