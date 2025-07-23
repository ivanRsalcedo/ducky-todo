import Project from "./project";

const AppData = (() => {
    return {
        saveProjects(projects) {
            localStorage.setItem('projects', JSON.stringify(projects));
        },
        loadProjects() {
            const unconverted = JSON.parse(localStorage.getItem('projects'));

            if (!unconverted || unconverted.length === 0) {
                const generalProject = Project('General', []);
                generalProject.addTodo({
                    title: 'Create your first todo!',
                    notes: 'Change date/time due or delete a todo with the buttons on the right.',
                    date: '',
                    time: '',
                    priority: ''
                });
                this.saveProjects([generalProject]);
                return [generalProject];
            }

            return unconverted.map(project => {
                const restored = Project(project.name, []);
                project.todoList.forEach(todo => restored.addTodo(todo));
                return restored;
            });
        }
    }
})();

export default AppData;