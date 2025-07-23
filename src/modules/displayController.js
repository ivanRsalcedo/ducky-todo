import ProjectHandler from "./projectHandler";
import { format } from 'date-fns';


const DisplayController = (() => {
    const navProjects = document.querySelector('#nav-projects');
    const todoList = document.querySelector('#todo-list');

    function init() {

        navProjects.querySelectorAll('button')[0]?.classList.add('active-project');

        const modal = document.querySelector('#modal-add-todo');
        const form = document.querySelector('#form-modal-add-todo');

        document.querySelector('#btn-add-todo').addEventListener('click', () => {
            const now = new Date();
            modal.showModal();
        });

        form.addEventListener('submit', (e) => {
            e.preventDefault();
        });

        document.querySelector('#btn-form-add').addEventListener('click', () => {
            form.reset();
            modal.close();
        });
        document.querySelector('#btn-form-cancel').addEventListener('click', () => {
            modal.close();
        });
    }

    function renderTodo(todo) {
        const details = document.createElement('details');
        details.classList.add('todo-item');
        details.classList.add(`pr-${todo.priority}`);

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
                navProjects.querySelectorAll('button').forEach(btnProj => {
                    btnProj.classList.remove('active-project');
                });
                btn.classList.add('active-project');

                renderTodoList();
            });
            navProjects.appendChild(btn);
        }
    }

    return {
        init,
        renderTodoList,
        renderProjects,
    };
})();

export default DisplayController;