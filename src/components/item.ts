import BaseComponent from "./base.js";
import Project from "../types/project.js";

export default class ProjectItem extends BaseComponent<
  HTMLUListElement,
  HTMLLIElement
> {
  private project!: Project;

  constructor(hostID: string, project: Project) {
    super("single-project", hostID, false, project.id);
    this.project = project;

    this.configure();
    this.renderContent();
  }

  configure() {}

  renderContent() {
    this.element.querySelector("h2")!.textContent = this.project.title;
    this.element.querySelector("h3")!.textContent = this.project.people.toString();
    this.element.querySelector("p")!.textContent = this.project.description;
  }
}
