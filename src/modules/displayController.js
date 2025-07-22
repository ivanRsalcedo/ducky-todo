import Project from "./project";
import ProjectHandler from "./projectHandler";

const DisplayController = (() => {
    const sidebar = document.querySelector('#sidebar');
    const todoList = document.querySelector('#todo-list');

    return {
        update() {
            for (const todo of ProjectHandler.getActiveProject().getList()){
                const todoEl = document.createElement('div');
                todoEl.classList.add('todo-item')

                

                todoList.appendChild(todoEl);
            }
        }
    }
})();

export default DisplayController;