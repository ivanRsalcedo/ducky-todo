const AppData = (() => {
    return {
        saveProjects(projects) {
            localStorage.setItem('projects', JSON.stringify(projects));
        },
        loadProjects() {
            return JSON.parse(localStorage.getItem('projects'));
        }
    }
})();

export default AppData;