import './style.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Todo from './modules/todo.js';
import ProjectHandler from './modules/projectHandler.js';
import Project from './modules/project.js';
import AppData from './modules/appData.js';

ProjectHandler.loadProjects();

console.log('DUCKY TODO');

window.Project = Project;
window.ProjectHandler = ProjectHandler;
window.AppData = AppData;
window.Todo = Todo;