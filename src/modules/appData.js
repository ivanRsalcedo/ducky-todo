import Project from "./project";
import Todo from "./todo";
import { format, addDays, addHours, addMinutes } from "date-fns";

function saveProjects(projects) {
    localStorage.setItem('projects', JSON.stringify(projects));
}

function loadProjects() {
    const unconverted = JSON.parse(localStorage.getItem('projects'));

    if (!unconverted || unconverted.length === 0) {
        const defaultProjects = createDefaultProject();
        saveProjects(defaultProjects);
        return defaultProjects;
    }

    return unconverted.map(rebuildProject);
}

function createDefaultProject() {
    const general = Project('General', []);
    const current = new Date();

    general.addTodo(Todo(
        'Create your first todo!',
        'Change date/time due or delete a todo with the buttons on the right.',
        format(current, 'yyyy-MM-dd'),
        '',
        'mid'
    ));
    general.addTodo(Todo(
        'Try clicking a project on the left!',
        'You can switch between projects or add a new one below.',
        format(addDays(current, 1), 'yyyy-MM-dd'),
        format(addHours(addMinutes(current, 60 - current.getMinutes()), 3), 'HH:mm'),
        'low'
    ));

    const work = Project('Work', []);
    work.addTodo(Todo(
        'Help Bob troubleshoot his PC',
        'Bob probably just needs to restart the computer.',
        '',
        '10:00',
        'high'
    ));

    return [general, work];
}

function rebuildProject(rawObject) {
    const project = Project(rawObject.name, []);
    project.id = rawObject.id;
    rawObject.todoList.forEach(todo => {
        const realTodo = Todo(
            todo.name, todo.notes, todo.date, todo.time, todo.priority
        );
        realTodo.id = todo.id;
        project.addTodo(realTodo);
    });
    return project;
}

const AppData = {
    saveProjects,
    loadProjects,
};

export default AppData;