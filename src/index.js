import './style.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import ProjectHandler from './modules/projectHandler.js';
import DisplayController from './modules/displayController.js';

ProjectHandler.loadProjects();
DisplayController.renderProjects();
DisplayController.renderTodoList();
DisplayController.init();