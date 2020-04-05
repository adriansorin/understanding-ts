import ProjectInput from "./components/input";
import ProjectList from "./components/list";

// @ts-ignore
const prjInput = new ProjectInput();

// @ts-ignore
const activeProjects = new ProjectList('active');

// @ts-ignore
const finishedProjects = new ProjectList('finished');