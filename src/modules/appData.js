import Project from "./project";

const AppData = (() => {
    return {
        saveProjects(projects) {
            localStorage.setItem('projects', JSON.stringify(projects));
        },
        loadProjects() {
            const unconverted = JSON.parse(localStorage.getItem('projects'));
            return unconverted.map(project => Project(project.name, project.todoList));
        }
    }
})();

export default AppData;