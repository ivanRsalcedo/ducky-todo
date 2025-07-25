import AppData from "./appData";
import FormHandler from "./formHandler";
import ProjectHandler from "./projectHandler";
import { formatDisplayTodo } from "./dateTimeUtils";

const navProjects = document.querySelector('#nav-projects');
const todoList = document.querySelector('#todo-list');

function save() {
    AppData.saveProjects(ProjectHandler.getProjects());
}

function init() {

    navProjects.querySelectorAll('button')[0]?.classList.add('active-project');
    initBtnAddProject();
    initBtnAddTodo();
}

function initBtnAddProject() {
    const modalAddProject = document.querySelector('#modal-add-project');
    const formAddProject = document.querySelector('#form-modal-add-project');


    document.querySelector('#btn-add-project').addEventListener('click', () => {
        modalAddProject.showModal();
    });

    formAddProject.addEventListener('submit', (e) => {
        e.preventDefault();

        const newProject = FormHandler.parseSubmittedProject();
        ProjectHandler.addProject(newProject);

        save();
        renderProjects();
        console.log(navProjects.lastElementChild);
        navProjects.lastElementChild.click();


        formAddProject.reset();
        modalAddProject.close();
    });

    document.querySelector('#btn-form-proj-cancel').addEventListener('click', () => {
        modalAddProject.close();
    });
}

function initBtnAddTodo() {
    const modalAddTodo = document.querySelector('#modal-add-todo');
    const formAddTodo = document.querySelector('#form-modal-add-todo');

    document.querySelector('#btn-add-todo').addEventListener('click', () => {
        modalAddTodo.showModal();
    });

    formAddTodo.addEventListener('submit', (e) => {
        e.preventDefault();

        const newTodo = FormHandler.parseSubmittedTodo();
        ProjectHandler.getActiveProject().addTodo(newTodo);

        save();
        renderTodoList();

        formAddTodo.reset();
        modalAddTodo.close();
    });

    document.querySelector('#btn-form-todo-cancel').addEventListener('click', () => {
        modalAddTodo.close();
    });
}

function renderTodoList() {
    todoList.innerHTML = '';
    const project = ProjectHandler.getActiveProject();
    if (!project) return;

    const list = project.getList().slice().sort((a, b) => a.completed - b.completed);
    for (const todo of list) {
        todoList.appendChild(renderTodo(todo));
    }
}

function renderTodo(todo) {
    const details = document.createElement('details');
    details.classList.add('todo-item');
    details.classList.add(`pr-${todo.priority}`);


    const summary = document.createElement('summary');
    if (todo.completed) {
        summary.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
        });
    }

    const checkbox = document.createElement('button');
    checkbox.classList.add('btn-checkbox');

    checkbox.innerHTML = todo.completed ? '<i class="fa-regular fa-square-check"></i>' : '<i class="fa-regular fa-square"></i>';

    if (todo.completed) {
        details.classList.add('completed-todo');
    }

    checkbox.addEventListener('click', () => {
        todo.completed = !todo.completed;
        save();
        renderTodoList();
    });

    const title = document.createElement('input');
    title.type = 'text';
    title.classList.add('todo-title');
    title.readOnly = true;
    title.value = todo.name;

    title.addEventListener('click', () => {
        if (todo.completed) return;

        if (details.open)
            title.readOnly = false;
        else
            details.open = true;
    });

    title.addEventListener('keydown', (e) => {
        if (e.key === ' ' && details.open) {
            e.preventDefault();
            const { selectionStart, selectionEnd, value } = e.target;
            e.target.value = value.slice(0, selectionStart) + ' ' + value.slice(selectionEnd);
            e.target.selectionStart = e.target.selectionEnd = selectionStart + 1;

            title.dispatchEvent(new Event('input'));
        } else if (e.key === 'Enter') {
            title.blur();
        }
    });

    title.addEventListener('input', () => {
        if (todo.name !== title.value) {
            todo.name = title.value;
            save();
        }
    });

    details.addEventListener('toggle', () => {
        if (todo.completed && details.open) {
            details.open = false;
        } else if (!details.open) {
            title.readOnly = true;
        }
    });

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

    notes.addEventListener('input', () => {
        todo.notes = notes.value;
        save();
    });

    const buttonGroup = document.createElement('div');
    buttonGroup.classList.add('todo-buttons');

    const btnDateInput = document.createElement('input');
    btnDateInput.type = 'date';
    btnDateInput.value = todo.date || '';
    btnDateInput.classList.add('input-date-time');

    btnDateInput.addEventListener('change', () => {
        todo.date = btnDateInput.value;
        save();

        const format = formatDisplayTodo(todo.date, todo.time);
        date.textContent = format[0];
        time.textContent = format[1];
    });

    const btnTimeInput = document.createElement('input');
    btnTimeInput.type = 'time';
    btnTimeInput.value = todo.time || '';
    btnTimeInput.classList.add('input-date-time');

    btnTimeInput.addEventListener('change', () => {
        todo.time = btnTimeInput.value;
        save();

        const format = formatDisplayTodo(todo.date, todo.time);
        date.textContent = format[0];
        time.textContent = format[1];
    });

    const btnDeleteTodo = document.createElement('button');
    btnDeleteTodo.classList.add('btn-remove-todo');
    btnDeleteTodo.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
    btnDeleteTodo.addEventListener('click', () => {
        ProjectHandler.getActiveProject().deleteTodo(todo);
        save();
        renderTodoList();
    });

    buttonGroup.append(btnDateInput, btnTimeInput, btnDeleteTodo);
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

const DisplayController = {
    init,
    renderTodoList,
    renderProjects,
};

export default DisplayController;