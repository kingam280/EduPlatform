import React from 'react'
import Project from './Project'
import { projectInterface } from '../../interfaces/Project'
import { LinearProgress } from '@material-ui/core'
import { useAppSelector } from '../../app/hooks'
import ProjectInfo from './ProjectInfo'

const ProjectsList = () => {
    const projects: projectInterface[] = useAppSelector(state => state.projects.projects)
    const loading = useAppSelector(state => state.projects.loading)

    return (
        <div>
            {loading ? <LinearProgress /> : projects.map(project => <Project data={project}  key={project._id}/>)}
            <ProjectInfo data={projects[0]}/>
        </div>
    )
}

export default ProjectsList