import './style.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import ProjectHandler from './modules/projectHandler.js';
import DisplayController from './modules/displayController.js';
import FormHandler from './modules/formHandler.js';

ProjectHandler.loadProjects();
DisplayController.renderProjects();
DisplayController.renderTodoList();
DisplayController.init();