const Project = (name, todoList = []) => {
    return {
        name,
        id: crypto.randomUUID(),
        addTodo(todo) {
            todoList.push(todo);
        },
        deleteTodo(todo) {
            const index = todoList.findIndex(predicate => predicate.id === todo.id);
            if (index !== -1) todoList.splice(index, 1);
            else console.log('Todo not found in array.');
        },
        getList() {
            return todoList;
        }
    };
};

export default Project;