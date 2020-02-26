// Projects State Management

class ProjectState {
    private projects: any[] = [];
    private static instance: ProjectState;

    static getInstance() {
        if (this.instance) {
            return this.instance;
        }

        this.instance = new ProjectState();
        return this.instance;
    }

    addProject(title: string, description: string, numberOfPeople: number) {
        const newProject = {
            id: Math.random().toString(),
            title,
            description,
            people: numberOfPeople
        }

        this.projects.push(newProject);
    }
}

const projectState = ProjectState.getInstance();

export default projectState;