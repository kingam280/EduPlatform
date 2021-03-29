import React, {
    useEffect,
    useState
} from 'react'
import axios from '../../config/axios'
import Project from './Project'
import ProjectInterface from '../../interfaces/Project'
import { Button } from '@material-ui/core'

const ProjectsPage: React.FC = () => {
    const [projects, setProjects] = useState<Array<ProjectInterface>>([])
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        setLoading(true)
        axios
            .get('/projects')
            .then( res => res.data)
            .then( data => {
                setProjects(data)
                setLoading(false)
            })
            .catch(err => console.log(err))
    }, [])

    const showProjects = () => {
        if (projects.length > 0) {
            projects.forEach(project => {
                <Project data={project} />
            })
        }
    }


    return (
        <div>
            <h2>All projects</h2>
            <Button>+ New project</Button>
            {loading ? 'Loading...' : projects.map(project => <Project data={project} key={project._id}/>)}
            {showProjects()}
        </div>
    )
}

export default ProjectsPage