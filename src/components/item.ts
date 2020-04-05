import BaseComponent from "./base";
import Project from "../types/project";

export default class ProjectItem extends BaseComponent<
  HTMLUListElement,
  HTMLLIElement
> {
  private project!: Project;

  get persons() {
    return this.project.people === 1 ? '1 person' : `${this.project.people} persons`;
  }

  constructor(hostID: string, project: Project) {
    super("single-project", hostID, false, project.id);
    this.project = project;

    this.configure();
    this.renderContent();
  }

  configure() {}

  renderContent() {
    this.element.querySelector("h2")!.textContent = this.project.title;
    this.element.querySelector("h3")!.textContent = this.persons + ' assigned';
    this.element.querySelector("p")!.textContent = this.project.description;
  }
}
