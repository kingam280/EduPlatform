import React from 'react'
import { Modal } from '@material-ui/core'
import { useAppDispatch } from '../../app/hooks'
import { addNewProject } from './ProjectsPageSlice'
import ProjectForm from './ProjectForm'
import { IProject, IAddProject } from '../../interfaces/Project'

const AddProject = ({ shouldDisplayAddProject, setShouldDisplayAddProject }: IAddProject) => {
    const dispatch = useAppDispatch()

    const handleClose = () => {
        setShouldDisplayAddProject(false);
    }

    const saveProject =  (body: IProject) => {
        dispatch(addNewProject(body))
        setShouldDisplayAddProject(false)
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