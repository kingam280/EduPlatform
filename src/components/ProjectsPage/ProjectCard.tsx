import axios from '../../config/axios'
import React, { useState, useEffect, useCallback } from 'react'
import { IProject, IProjectWithGroup } from '../../interfaces/Project'
import { Card, Modal, LinearProgress } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import './ProjectInfo.css'
import ProjectForm from './ProjectForm';
import { addNewProject, fetchProjects, getSingleProject } from './ProjectsPageSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useHistory } from "react-router-dom";
import { stat } from 'node:fs';

const ProjectCard = () => {
    const [isEditing, setIsEditing] = useState(false)
    const dispatch = useAppDispatch()
    const history = useHistory()

    const project = useAppSelector(state => state.projects.displayedProject)

    const displayDate = () => {
        if (project) {
            const day = new Date(project.timestamp).getDate()
            const month = new Date(project.timestamp).getMonth() + 1
            const year = new Date(project.timestamp).getFullYear()
            return `${day < 10 ? `0` + day : day}/${month < 10 ? `0` + month : month}/${year}`
        }
    }

    const handleClose = () => {
        setIsEditing(false)
    }

    const saveProject = (body: IProject) => {
        // dispatch(addNewProject(body))
        setIsEditing(false)
        // axios
        //     .put(path, body)
        //     .then(res => {
        //         dispatch(fetchProjects())
        //         setIsEditing(false)
        //         // getProject()
        //     })
        //     .catch(err => console.log)
    }

    useEffect(() => {
        dispatch(getSingleProject(window.location.pathname))
    }, [dispatch])

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
                    <p className="project-info__date"><span className="project-info-bold">Date:</span> {displayDate()}</p>
                    <p className="project-info__group"><span className="project-info-bold">Group:</span> {project.group.groupName}</p>
                    <p className="project-info__demo"><span className="project-info-bold">Demo:</span> {project.linkToDemo}</p>
                    <p className="project-info__github"><span className="project-info-bold">GitHub:</span> {project.linkToGitHub}</p>
                </>} 
        </Card>  
    )
}

export default ProjectCard