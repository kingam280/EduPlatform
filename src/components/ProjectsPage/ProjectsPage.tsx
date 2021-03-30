import React, {
    useState
} from 'react'
import ProjectsList from './ProjectsList'
import AddProject from './AddProject'
import { Button } from '@material-ui/core'
import './ProjectsPage.css'

const ProjectsPage: React.FC = () => {
    const [shouldDisplayAddProject, setShouldDisplayAddProject] = useState(false)

    const handleOpenClick = () => {
        setShouldDisplayAddProject(true)
    }
    
    return (
        <div>
            <h2>All projects</h2>
            <Button onClick={handleOpenClick}>+ New project</Button>
            <ProjectsList />
            {shouldDisplayAddProject ? <AddProject shouldDisplayAddProject={shouldDisplayAddProject} setShouldDisplayAddProject={setShouldDisplayAddProject} /> : 'b'}
        </div>
    )
}

export default ProjectsPage