import autobind from "../decorators/autobind.js";
import { validate, Validatable } from "./validate.js";
import projectState from "./state.js";

// ProjectInput Class
export default class ProjectInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;
  titleInputElementField: HTMLInputElement;
  descriptionInputElementField: HTMLInputElement;
  peopleInputElementField: HTMLInputElement;

  constructor() {
    this.templateElement = document.getElementById(
      "project-input"
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById("app")! as HTMLDivElement;

    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    this.element = importedNode.firstElementChild as HTMLFormElement;
    this.element.id = "user-input";

    this.titleInputElementField = this.element.querySelector(
      "#title"
    ) as HTMLInputElement;
    this.descriptionInputElementField = this.element.querySelector(
      "#description"
    ) as HTMLInputElement;
    this.peopleInputElementField = this.element.querySelector(
      "#people"
    ) as HTMLInputElement;

    this.configure();
    this.attach();
  }

  private getUserInput(): [string, string, number] | void {
    const enteredTitle = this.titleInputElementField.value;
    const enteredDescription = this.descriptionInputElementField.value;
    const enteredPeople = this.peopleInputElementField.value;

    const titleValidatable: Validatable = {
      value: enteredTitle,
      required: true
    };

    const descriptionValidatable: Validatable = {
      value: enteredDescription,
      required: true,
      minLength: 5
    };

    const peopleValidatable: Validatable = {
      value: +enteredPeople,
      required: true,
      min: 1,
      max: 5
    };

    if (
      !validate(titleValidatable) ||
      !validate(descriptionValidatable) ||
      !validate(peopleValidatable)
    ) {
      alert("Invalid input");
      return;
    }

    return [enteredTitle, enteredDescription, +enteredPeople];
  }

  @autobind
  private submitHandler(event: Event) {
    event.preventDefault();
    const userInput = this.getUserInput();

    if (Array.isArray(userInput)) {
      const [title, desc, people] = userInput;
      projectState.addProject(title, desc, people);
      this.clearInputs();
    }
  }

  private clearInputs() {
    this.titleInputElementField.value = "";
    this.descriptionInputElementField.value = "";
    this.peopleInputElementField.value = "";
  }

  private configure() {
    this.element.addEventListener("submit", this.submitHandler);
  }

  private attach() {
    this.hostElement.insertAdjacentElement("afterbegin", this.element);
  }
}
