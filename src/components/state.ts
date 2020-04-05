
import Project from '../types/project';
import ProjectStatus from '../types/projectStatus';
import Listener from '../types/listener';

// Base State Management class
export class State<T> {
    protected listeners: Listener<T>[] = [];

    addListener(listenerFn: Listener<T>) {
        this.listeners.push(listenerFn);
    }
}
// Projects State Management

class ProjectState extends State<Project> {
    private projects: Project[] = [];
    private static instance: ProjectState;

    private constructor() {
        super();
    }

    static getInstance() {
        if (this.instance) {
            return this.instance;
        }

        this.instance = new ProjectState();
        return this.instance;
    }

    addProject(title: string, description: string, numberOfPeople: number) {
        const newProject: Project = {
            id: Math.random().toString(),
            title,
            description,
            people: numberOfPeople,
            status: ProjectStatus.Active
        };

        this.projects.push(newProject);
        for (const listenerFn of this.listeners) {
            listenerFn(this.projects.slice());
        }
    }
}

const projectState = ProjectState.getInstance();

export default projectState;