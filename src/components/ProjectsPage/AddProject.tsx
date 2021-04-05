import React from 'react'
import { Modal } from '@material-ui/core'
import axios from '../../config/axios'
import { useAppDispatch } from '../../app/hooks'
import { fetchProjects } from './ProjectsPageSlice'
import ProjectForm from './ProjectForm'
import { IProject, IAddProject } from '../../interfaces/Project'

const AddProject = ({ shouldDisplayAddProject, setShouldDisplayAddProject }: IAddProject) => {
    const dispatch = useAppDispatch()

    const handleClose = () => {
        setShouldDisplayAddProject(false);
    }

    const saveProject =  (body: IProject) => {
        axios
            .post('/projects', body)
            .then(res => {
                dispatch(fetchProjects())
                setShouldDisplayAddProject(false)
            })
            .catch(err => console.log(err))
    }

    return (
        <Modal
            open={shouldDisplayAddProject}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        > 
            <ProjectForm saveProject={saveProject} header="Add new project" />
        </Modal>
    )
}

export default AddProject