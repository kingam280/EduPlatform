import React from 'react'
import axios from '../../config/axios'
import { AppBar } from '@material-ui/core'
import { projectInterface } from '../../interfaces/Project'
import { useAppDispatch } from '../../app/hooks'
import { fetchProjects } from './ProjectsPageSlice'

const Project: React.FC<{ data: projectInterface }> = ({ data }) => {

    const dispatch = useAppDispatch()

    const handleRemoveProjectClick = () => {
        const id = data._id
        console.log(id)
        axios
            .delete(`/projects/${id}`)
            .then(res => dispatch(fetchProjects()) )
            .catch(err => console.log(err))
    }

    return (
        <AppBar position='relative' color='default'>
            <h3>{data.title}</h3>
            <p>{data.mentor.firstName} {data.mentor.lastName}</p>
            <button onClick={handleRemoveProjectClick}><i className="fas fa-times"></i></button>
        </AppBar>
    )
}

export default Project