import React from 'react'
import Project from './Project'
import { IProject } from '../../interfaces/Project'
import { LinearProgress } from '@material-ui/core'
import { useAppSelector } from '../../app/hooks'

const ProjectsList = () => {
    const projects: IProject[] = useAppSelector(state => state.projects.projects)
    const loading = useAppSelector(state => state.projects.loading)

    return (
        <div>
            {projects.length <=0 && loading ? <LinearProgress /> : projects.map(project => <Project data={project}  key={project._id}/>)}
        </div>
    )
}

export default ProjectsList