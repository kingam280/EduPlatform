export default interface projectInterface {
    _id: string,
    title: string,
    description: string,
    mentor: string,
    authors: Array<string>,
    linkToDemo: string,
    linkToGitHub: string,
    timestamp: number
}