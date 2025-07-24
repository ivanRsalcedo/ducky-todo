import Todo from "./todo";
import { format } from "date-fns";


const FormHandler = (() => {

    return {
        parseSubmittedTodo() {
            const form = document.querySelector('#form-modal-add-todo');
            return Todo(
                form.elements['todo-title'].value,
                form.elements['todo-notes'].value,
                form.elements['form-modal-add-todo-date-due'].value === '' ? format(new Date(), 'yyyy-MM-dd') : form.elements['form-modal-add-todo-date-due'].value,
                form.elements['form-modal-add-todo-time-due'].value,
                form.elements['todo-priority'].value
            );
        }
    }
})();

export default FormHandler;