import autobind from "../decorators/autobind";
import { validate, Validatable } from "./validate";
import projectState from "./state";
import BaseComponent from "./base";

// ProjectInput Class
export default class ProjectInput extends BaseComponent<
  HTMLDivElement,
  HTMLFormElement
> {
  titleInputElementField: HTMLInputElement;
  descriptionInputElementField: HTMLInputElement;
  peopleInputElementField: HTMLInputElement;

  constructor() {
    super("project-input", "app", true, "user-input");

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

  configure() {
    this.element.addEventListener("submit", this.submitHandler);
  }

  renderContent() {}
}
