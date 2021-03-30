import React, { FormEvent } from 'react'
import { Modal } from '@material-ui/core'

type shouldDisplay = {
    shouldDisplayAddProject: boolean,
    setShouldDisplayAddProject: (isTrue: boolean) => void
}

const AddProject = ({ shouldDisplayAddProject, setShouldDisplayAddProject }: shouldDisplay) => {

    const handleClose = () => {
        setShouldDisplayAddProject(false);
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setShouldDisplayAddProject(false)
    }


    return (
        <Modal
            open={shouldDisplayAddProject}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        > 
            <div className="add-project-modal">
                <h2 id="simple-modal-title">Add new project</h2>
                <form onSubmit={handleSubmit} className={"add-project-form"}>
                    <label htmlFor="title">Title</label>
                    <input type="text" id="title" required/>
                    <label htmlFor="description">Description</label>
                    <textarea name="description" id="description" required></textarea>
                    <label htmlFor="mentor">Mentor</label>
                    <select id="mentor" >
                        <option value="a">a</option>
                        <option value="b">b</option>
                        <option value="c">c</option>
                    </select>
                    <label htmlFor="authors">Authors</label>
                    <select id="authors" multiple>
                        <option value="a">a</option>
                        <option value="b">b</option>
                        <option value="c">c</option>
                    </select>
                    <label htmlFor="linkToDemo">Link to demo</label>
                    <input type="text" id="linkToDemo" required/>
                    <label htmlFor="linkToGitHub">Link to GitHub</label>
                    <input type="text" id="linkToGitHub" required/>
                    <button>Add</button>
                </form>
            </div>
        </Modal>
    )
}

export default AddProject