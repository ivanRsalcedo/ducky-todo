import AppData from './appData';

const ProjectHandler = (() => {
    let projects = [];
    return {
        getProjects() {
            return projects;
        },
        addProject(project) {
            projects.push(project);
        },
        deleteProject(project) {
            const index = projects.findIndex(predicate => predicate.id === project.id);
            if (index !== -1) projects.splice(index, 1);
            else console.log('Project not found in array.');
        },
        loadProjects() {
            projects = AppData.loadProjects() || [];
        }
    }
})();

export default ProjectHandler;