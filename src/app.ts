import ProjectInput from "./components/input.js";
import ProjectList from "./components/list.js";

// @ts-ignore
const prjInput = new ProjectInput();

// @ts-ignore
const activeProjects = new ProjectList('active');

// @ts-ignore
const finishedProjects = new ProjectList('finished');