import ProjectStatus from './projectStatus';

export default interface Project {
    id: string,
    title: string,
    description: string,
    people: number,
    status: ProjectStatus
}