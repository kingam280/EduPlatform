import React, {
    useEffect,
    useState
} from 'react'
import axios from '../../config/axios'
import Project from './Project'
import ProjectInterface from '../../interfaces/Project'
import { LinearProgress } from '@material-ui/core'

const ProjectsList = () => {
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

    return (
        <div>
            {loading ? <LinearProgress /> : projects.map(project => <Project data={project} key={project._id}/>)} 
        </div>
            

    )
}

export default ProjectsList