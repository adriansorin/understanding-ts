import projectState from "./state";
import Project from "../types/project";
import ProjectStatus from "../types/projectStatus";
import BaseComponent from "./base";
import ProjectItem from "./item";

// ProjectList class
export default class ProjectList extends BaseComponent<
  HTMLDivElement,
  HTMLElement
> {
  assignedProjects: Project[] = [];

  constructor(private type: "active" | "finished") {
    super("project-list", "app", false, `${type}-projects`);

    this.configure();
    this.renderContent();
  }

  private renderProjects() {
    const listEl = document.getElementById(
      `${this.type}-project-list`
    )! as HTMLUListElement;
    listEl.textContent = "";
    for (const prjItem of this.assignedProjects) {
      new ProjectItem(this.element.querySelector('ul')!.id, prjItem);
    }
  }

  configure() {
    projectState.addListener((projects: Project[]) => {
      const filteredProjects = projects.filter(prj => {
        if (this.type === "active") {
          return prj.status === ProjectStatus.Active;
        }

        return prj.status === ProjectStatus.Finished;
      });
      this.assignedProjects = filteredProjects;
      this.renderProjects();
    });
  }

  renderContent() {
    const listID = `${this.type}-project-list`;
    this.element.querySelector("ul")!.id = listID;
    this.element.querySelector("h2")!.textContent =
      this.type.toUpperCase() + " PROJECTS";
  }
}
