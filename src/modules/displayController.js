import ProjectHandler from "./projectHandler";

const DisplayController = (() => {
    const navProjects = document.querySelector('#nav-projects');
    const todoList = document.querySelector('#todo-list');

    function renderTodo(todo) {
        const details = document.createElement('details');
        details.classList.add('todo-item');

        const summary = document.createElement('summary');

        const checkbox = document.createElement('button');
        checkbox.classList.add('btn-checkbox');
        checkbox.innerHTML = '<i class="fa-regular fa-square"></i>';

        const title = document.createElement('p');
        title.classList.add('todo-title');
        title.textContent = todo.name;

        const dateTime = document.createElement('div');
        dateTime.classList.add('todo-date-time');

        const date = document.createElement('p');
        date.classList.add('todo-date');
        date.textContent = todo.date;

        const time = document.createElement('p');
        time.classList.add('todo-time');
        time.textContent = todo.time;

        dateTime.append(date, time);
        summary.append(checkbox, title, dateTime);

        const expanded = document.createElement('div');
        expanded.classList.add('todo-expanded');

        const notes = document.createElement('textarea');
        notes.classList.add('todo-notes');
        notes.value = todo.notes;

        const buttonGroup = document.createElement('div');
        buttonGroup.classList.add('todo-buttons');

        const dateInput = document.createElement('input');
        dateInput.type = 'datetime-local';
        dateInput.classList.add('input-date-time');

        const trash = document.createElement('button');
        trash.classList.add('btn-remove-todo');
        trash.innerHTML = '<i class="fa-solid fa-trash-can"></i>';

        buttonGroup.append(dateInput, trash);
        expanded.append(notes, buttonGroup);

        details.append(summary, expanded);
        return details;
    }

    function renderTodoList() {
        todoList.innerHTML = '';
        const project = ProjectHandler.getActiveProject();
        if (!project) return;

        const list = project.getList();
        for (const todo of list) {
            todoList.appendChild(renderTodo(todo));
        }
    }

    function renderProjects() {
        navProjects.innerHTML = '';

        const projects = ProjectHandler.getProjects();
        for (const project of projects) {
            const btn = document.createElement('button');
            btn.classList.add('project-btn');
            btn.textContent = project.name;

            btn.addEventListener('click', () => {
                ProjectHandler.setActiveProject(project);
                renderTodoList();
            });

            navProjects.appendChild(btn);
        }
    }

    return {
        renderTodoList,
        renderProjects,
    };
})();

export default DisplayController;