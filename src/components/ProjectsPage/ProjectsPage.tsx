import React, {
    useEffect,
    useState
} from 'react'
import ProjectsList from './ProjectsList'
import AddProject from './AddProject'
import { Button } from '@material-ui/core'
import './ProjectsPage.css'
import { useAppDispatch } from '../../app/hooks'
import { fetchProjects } from './ProjectsPageSlice'

const ProjectsPage: React.FC = () => {
    const [shouldDisplayAddProject, setShouldDisplayAddProject] = useState(false)

    const handleOpenClick = () => {
        setShouldDisplayAddProject(true)
    }
    
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(fetchProjects())
    }, [dispatch])    
    
    return (
        <div>
            <h2>All projects</h2>
            <Button onClick={handleOpenClick} variant="contained">+ New project</Button>
            <ProjectsList />
            {shouldDisplayAddProject ? <AddProject shouldDisplayAddProject={shouldDisplayAddProject} setShouldDisplayAddProject={setShouldDisplayAddProject} /> : null}
        </div>
    )
}

export default ProjectsPage