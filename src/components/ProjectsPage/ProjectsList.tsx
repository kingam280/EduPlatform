import React, {
    useEffect,
    useState
} from 'react'
import axios from '../../config/axios'
import Project from './Project'
import ProjectInterface from '../../interfaces/Project'
import UserInterface from '../../interfaces/User'
import { LinearProgress } from '@material-ui/core'

const ProjectsList = () => {
    const [projects, setProjects] = useState<Array<ProjectInterface>>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [users, setUsers] = useState<Array<UserInterface>>([])
    
    const getUsers = async () => {
        await axios
            .get('/authorization')
            .then(res => res.data)
            .then(res => {
                console.log(res)
                setUsers(res)
            })
            .catch(err => console.log(err))
    }
    
    const getProjects = async () => {
        setLoading(true)
        await axios
            .get('/projects')
            .then( res => res.data)
            .then( data => {
                setProjects(data)
                setLoading(false)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getUsers()
        getProjects()             
    }, [])


    return (
        <div>
            {loading ? <LinearProgress /> : projects.map(project => <Project data={project} updateProjectsList={getProjects} key={project._id}/>)} 
        </div>
            

    )
}

export default ProjectsList