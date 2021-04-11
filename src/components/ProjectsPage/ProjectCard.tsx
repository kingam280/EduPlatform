import React, { useState, useEffect } from 'react'
import { IProject } from '../../interfaces/Project'
import { Card, Modal, LinearProgress, IconButton } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ProjectForm from './ProjectForm';
import { getSingleProject, updateProject } from './ProjectsPageSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useHistory } from "react-router-dom";
import useStyles from './useStyles'

const ProjectCard: React.FC = () => {
    const classes = useStyles()

    const [isEditing, setIsEditing] = useState(false)
    const dispatch = useAppDispatch()
    const history = useHistory()

    const { displayedProject, loading }= useAppSelector(state => state.projects)
    const path = window.location.pathname;

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
        <Card className={classes.projectCard}>
            <IconButton className={classes.goBackBtn} onClick={() => history.push('/projects')} ><ArrowBackIcon /></IconButton>
            <IconButton className={classes.editBtn} onClick={() => setIsEditing(true)} ><EditIcon /></IconButton>
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
                    <h2 className="project-info__title" >{displayedProject.title}</h2>
                    <p className="project-info__description" >{displayedProject.description}</p>
                    <p className="project-info__date" ><span className={classes.bold} >Date:</span> {displayDate()}</p>
                    <p className="project-info__group" ><span className={classes.bold} >Group:</span> {displayedProject.group.groupName}</p>
                    <p className="project-info__demo" ><span className={classes.bold} >Demo:</span> {displayedProject.linkToDemo}</p>
                    <p className="project-info__github" ><span className={classes.bold} >GitHub:</span> {displayedProject.linkToGitHub}</p>
                </>} 
        </Card>  
    )
}

export default ProjectCard