import userInterface from "./User";

export  interface basicProjectInterface {
    _id: string,
    title: string,
    description: string,
    mentor: string,
    authors: Array<string>,
    linkToDemo: string,
    linkToGitHub: string,
    timestamp: number
}

export interface projectInterface {
    _id: string,
    title: string,
    description: string,
    mentor: userInterface,
    authors: Array<string>,
    linkToDemo: string,
    linkToGitHub: string,
    timestamp: number
}