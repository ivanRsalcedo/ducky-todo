import Project from "./project";
import Todo from "./todo";

const AppData = (() => {

    return {
        saveProjects(projects) {
            localStorage.setItem('projects', JSON.stringify(projects));
        },
        loadProjects() {
            const unconverted = JSON.parse(localStorage.getItem('projects'));

            if (!unconverted || unconverted.length === 0) {
                const defaultProjects = createDefaultProject();
                AppData.saveProjects(defaultProjects);
                return defaultProjects;
            }

            return unconverted.map(rebuildProject);
        }
    }

    function createDefaultProject() {
        const general = Project('General', []);
        general.addTodo(Todo(
            'Create your first todo!',
            'Change date/time due or delete a todo with the buttons on the right.',
            '', '', 'mid'
        ));
        general.addTodo(Todo(
            'Try clicking a project on the left!',
            'You can switch between projects or add a new one below.',
            '', '', 'low'
        ));

        const work = Project('Work', []);
        work.addTodo(Todo(
            'Help Bob troubleshoot his PC',
            'Bob probably just needs to restart the computer.',
            '', '', 'high'
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

})();

export default AppData;