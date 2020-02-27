import ProjectStatus from './projectStatus.js';

export default interface Project {
    id: string,
    title: string,
    description: string,
    people: number,
    status: ProjectStatus
}