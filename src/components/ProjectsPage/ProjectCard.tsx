import React, { useState, useEffect } from 'react'
import { IProject } from '../../interfaces/Project'
import { Card, Modal, LinearProgress } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import './ProjectInfo.css'
import ProjectForm from './ProjectForm';
import { getSingleProject, updateProject } from './ProjectsPageSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useHistory } from "react-router-dom";

const ProjectCard: React.FC = () => {
    const [isEditing, setIsEditing] = useState(false)
    const dispatch = useAppDispatch()
    const history = useHistory()

    const { displayedProject, loading }= useAppSelector(state => state.projects)
    const path = window.location.pathname

    const displayDate = () => {
        if (displayedProject) {
            const day = new Date(displayedProject.timestamp).getDate()
            const month = new Date(displayedProject.timestamp).getMonth() + 1
            const year = new Date(displayedProject.timestamp).getFullYear()
            return `${day < 10 ? `0` + day : day}/${month < 10 ? `0` + month : month}/${year}`
        }
    }

    const handleClose = () => {
        setIsEditing(false)
    }

    const saveProject = (body: IProject) => {
        dispatch(updateProject({path, body}))
        setIsEditing(false)
    }

    useEffect(() => {
        dispatch(getSingleProject(path))
    }, [dispatch, path])

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
                    <ProjectForm saveProject={saveProject} header="Edit project" projectData={displayedProject}/>
                </Modal>}
                {loading || !displayedProject ? <LinearProgress /> :
                <> 
                    <h2 className="project-info__title">{displayedProject.title}</h2>
                    <p className="project-info__description">{displayedProject.description}</p>
                    <p className="project-info__date"><span className="project-info-bold">Date:</span> {displayDate()}</p>
                    <p className="project-info__group"><span className="project-info-bold">Group:</span> {displayedProject.group.groupName}</p>
                    <p className="project-info__demo"><span className="project-info-bold">Demo:</span> {displayedProject.linkToDemo}</p>
                    <p className="project-info__github"><span className="project-info-bold">GitHub:</span> {displayedProject.linkToGitHub}</p>
                </>} 
        </Card>  
    )
}

export default ProjectCard