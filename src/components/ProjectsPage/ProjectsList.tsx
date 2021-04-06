import React from 'react'
import ProjectItem from './ProjectItem'
import { IProjectWithGroup } from '../../interfaces/Project'
import { LinearProgress } from '@material-ui/core'
import { useAppSelector } from '../../app/hooks'

const ProjectsList = () => {
    const projects: IProjectWithGroup[] = useAppSelector(state => state.projects.projects)
    const loading = useAppSelector(state => state.projects.loading)

    return (
        <div>
            {projects.length <=0 && loading ? <LinearProgress /> : projects.map(project => <ProjectItem data={project}  key={project._id}/>)}
        </div>
    )
}

export default ProjectsList