import './style.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Todo from './modules/todo.js';
import ProjectHandler from './modules/projectHandler.js';
import Project from './modules/project.js';
import AppData from './modules/appData.js';
import DisplayController from './modules/displayController.js';

ProjectHandler.loadProjects();
DisplayController.renderProjects();
DisplayController.renderTodoList();