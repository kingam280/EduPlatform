import userInterface from "./User";

export  interface IFetchedProject {
    _id: string,
    title: string,
    description: string,
    mentor: string,
    authors: Array<string>,
    linkToDemo: string,
    linkToGitHub: string,
    timestamp: number
}

export interface IProject {
    _id: string,
    title: string,
    description: string,
    mentor: userInterface,
    authors: Array<string>,
    linkToDemo: string,
    linkToGitHub: string,
    timestamp: number
}

export interface IAddProject {
    shouldDisplayAddProject: boolean,
    setShouldDisplayAddProject: (isTrue: boolean) => void
}

export interface IProjectsInitialState {
    projects: IProject[],
    loading: Boolean,
    error: Boolean
  }