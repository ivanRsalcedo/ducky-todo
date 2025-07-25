import AppData from './appData';

let projects = [];
let activeProject = null;

function getProjects() {
    return projects;
}

function addProject(project) {
    projects.push(project);
}

function deleteProject(project) {
    if (projects.length > 1) {
        const index = projects.findIndex(predicate => predicate.id === project.id);
        if (index !== -1) projects.splice(index, 1);
        else console.log('Project not found in array.');
    }
}

function loadProjects() {
    projects = AppData.loadProjects() || [];
    ProjectHandler.setActiveProject(projects[0]);
}

function getActiveProject() {
    return activeProject;
}

function setActiveProject(project) {
    activeProject = project;
}


const ProjectHandler = {
    getProjects,
    addProject,
    deleteProject,
    loadProjects,
    getActiveProject,
    setActiveProject
};

export default ProjectHandler;