import React from 'react'
import Project from './Project'
import { projectInterface } from '../../interfaces/Project'
import { LinearProgress } from '@material-ui/core'
import { useAppSelector } from '../../app/hooks'

const ProjectsList = () => {
    const projects: projectInterface[] = useAppSelector(state => state.projects.projects)
    const loading = useAppSelector(state => state.projects.loading)

    return (
        <div>
            {loading ? <LinearProgress /> : projects.map(project => <Project data={project}  key={project._id}/>)}
        </div>
    )
}

export default ProjectsList