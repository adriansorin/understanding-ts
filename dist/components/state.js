// Projects State Management
class ProjectState {
    constructor() {
        this.projects = [];
    }
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new ProjectState();
        return this.instance;
    }
    addProject(title, description, numberOfPeople) {
        const newProject = {
            id: Math.random().toString(),
            title,
            description,
            people: numberOfPeople
        };
        this.projects.push(newProject);
    }
}
const projectState = ProjectState.getInstance();
export default projectState;
