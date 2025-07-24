import AppData from './appData';

const ProjectHandler = (() => {
    let projects = [];
    let activeProject = null;
    return {
        getProjects() {
            return projects;
        },
        addProject(project) {
            projects.push(project);
        },
        deleteProject(project) {
            if (projects.length > 1) {
                const index = projects.findIndex(predicate => predicate.id === project.id);
                if (index !== -1) projects.splice(index, 1);
                else console.log('Project not found in array.');
            }
        },
        loadProjects() {
            projects = AppData.loadProjects() || [];
            this.setActiveProject(projects[0]);
        },
        getActiveProject() {
            return activeProject;
        },
        setActiveProject(project) {
            activeProject = project;
        }
    }
})();

export default ProjectHandler;