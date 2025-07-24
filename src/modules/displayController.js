import AppData from "./appData";
import FormHandler from "./formHandler";
import ProjectHandler from "./projectHandler";
import { formatDisplayTodo } from "./dateTimeUtils";

const DisplayController = (() => {
    const navProjects = document.querySelector('#nav-projects');
    const todoList = document.querySelector('#todo-list');

    function update() {
        AppData.saveProjects(ProjectHandler.getProjects());
        renderTodoList();
    }

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

            const newTodo = FormHandler.parseSubmittedTodo();
            ProjectHandler.getActiveProject().addTodo(newTodo);
            
            update();
        
            form.reset();
            modal.close();
        });

        document.querySelector('#btn-form-cancel').addEventListener('click', () => {
            modal.close();
        });
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


        const formattedDateTime = formatDisplayTodo(todo.date, todo.time);

        const date = document.createElement('p');
        date.classList.add('todo-date');
        date.textContent = formattedDateTime[0];

        const time = document.createElement('p');
        time.classList.add('todo-time');
        time.textContent = formattedDateTime[1];

        dateTime.append(date, time);
        summary.append(checkbox, title, dateTime);

        const expanded = document.createElement('div');
        expanded.classList.add('todo-expanded');

        const notes = document.createElement('textarea');
        notes.classList.add('todo-notes');
        notes.value = todo.notes;

        const buttonGroup = document.createElement('div');
        buttonGroup.classList.add('todo-buttons');

        const btnDateInput = document.createElement('input');
        btnDateInput.type = 'datetime-local';
        btnDateInput.classList.add('input-date-time');

        const btnDeleteTodo = document.createElement('button');
        btnDeleteTodo.classList.add('btn-remove-todo');
        btnDeleteTodo.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
        btnDeleteTodo.addEventListener('click', () => {
            ProjectHandler.getActiveProject().deleteTodo(todo);
            update();
        });

        buttonGroup.append(btnDateInput, btnDeleteTodo);
        expanded.append(notes, buttonGroup);

        details.append(summary, expanded);
        return details;
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