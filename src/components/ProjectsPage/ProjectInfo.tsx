import axios from '../../config/axios'
import React, { useState, useEffect } from 'react'
import { projectInterface } from '../../interfaces/Project'
import { Card, Modal, LinearProgress } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import './ProjectInfo.css'
import ProjectForm from './ProjectForm';
import { fetchProjects } from './ProjectsPageSlice';
import { useAppDispatch } from '../../app/hooks';
import { useHistory } from "react-router-dom";



const ProjectInfo = () => {
    const [project, setProject] = useState<(projectInterface)>()
    const [isEditing, setIsEditing] = useState(false)
    const dispatch = useAppDispatch()
    
    const history = useHistory()

    const getProject = () => {
        const path = window.location.pathname
        axios
            .get(path)
            .then(res => setProject(res.data))
            .catch(err => console.log(err))
    }

    const handleClose = () => {
        setIsEditing(false)
    }

    const saveProject = async (body: projectInterface) => {
        const path = window.location.pathname
        await axios
            .put(path, body)
            .then(res => {
                dispatch(fetchProjects())
                getProject()
                setIsEditing(false)
                
            })
            .catch(err => console.log)
    }

    useEffect(() => {
        getProject()
    }, [])

    return (
        <Card className="project-info">
            <ArrowBackIcon onClick={() => history.push('/projects')}/>
            <EditIcon onClick={() => setIsEditing(true)}/>
            {isEditing &&
                <Modal
                    open={isEditing}
                    onClose={handleClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    >  
                    <ProjectForm saveProject={saveProject} header="Edit project" projectData={project}/>
                </Modal>}
            {!project ? <LinearProgress /> :
                <> 
                    <h2 className="project-info__title">{project.title}</h2>
                    <p className="project-info__description">{project.description}</p>
                    <p className="project-info__date"><span className="project-info-bold">Date:</span> {project.timestamp}</p>
                    <p className="project-info__group"><span className="project-info-bold">Group:</span> {project.mentor}</p>
                    <p className="project-info__demo"><span className="project-info-bold">Demo:</span> {project.linkToDemo}</p>
                    <p className="project-info__github"><span className="project-info-bold">GitHub:</span> {project.linkToGitHub}</p>
                </>} 
        </Card>
        
    )
}

export default ProjectInfo