import React from 'react'
import { useHistory } from "react-router-dom";
import axios from '../../config/axios'
import { AppBar } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';
import InfoIcon from '@material-ui/icons/Info';
import { IProject } from '../../interfaces/Project'
import { useAppDispatch } from '../../app/hooks'
import { fetchProjects } from './ProjectsPageSlice'

const Project = ({ data } : { data: IProject }) => {
    const dispatch = useAppDispatch()
    const history = useHistory()

    const handleRemoveProjectClick = () => {
        const id = data._id
        axios
            .delete(`/projects/${id}`)
            .then(res => dispatch(fetchProjects()) )
            .catch(err => console.log(err))
    }

    const handleGoToProjectClick = () => {
        history.push(`/projects/${data._id}`)
    }

    return (
        <AppBar position='relative' color='default' >
            <h3>{data.title}</h3>
            <p>{data.group}</p>
            <button onClick={handleRemoveProjectClick}><DeleteIcon /></button>
            <InfoIcon onClick={handleGoToProjectClick} />
        </AppBar>
    )
}

export default Project