import React, { FormEvent, useState } from 'react'
import { Modal } from '@material-ui/core'
import axios from '../../config/axios'

type shouldDisplay = {
    shouldDisplayAddProject: boolean,
    setShouldDisplayAddProject: (isTrue: boolean) => void
}

const AddProject = ({ shouldDisplayAddProject, setShouldDisplayAddProject }: shouldDisplay) => {
    const [form, setForm] = useState({
        title: '',
        description: '',
        mentor: '',
        authors: [],
        linkToDemo: '',
        linkToGitHub: ''
    })

    const handleClose = () => {
        setShouldDisplayAddProject(false);
    }

    const handleFormChange = (e: React.ChangeEvent<HTMLFormElement>) => {
        if (e.target.id === "authors") {
            const authors = Array.from(e.target.selectedOptions, (option: HTMLInputElement) => option.value)
            setForm(prev => ({
                ...prev,
                [e.target.id]: authors
            }))
            console.log(authors[0])
        } else {
            setForm(prev => ({
                ...prev,
                [e.target.id]: e.target.value
            }))
        }     
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const body = {
            title: form.title,
            description: form.description,
            mentor: form.mentor,
            authors: form.authors,
            linkToDemo: form.linkToDemo,
            linkToGitHub: form.linkToGitHub
        }
        
        axios
            .post('/projects', body)
            .then(res => {
                console.log(res)
                setShouldDisplayAddProject(false)
            })
            .catch(err => console.log)
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
                <form onChange={handleFormChange} onSubmit={handleSubmit} className={"add-project-form"}>
                    <label htmlFor="title">Title</label>
                    <input type="text" id="title"  required />
                    <label htmlFor="description">Description</label>
                    <textarea name="description" id="description" required></textarea>
                    <label htmlFor="mentor">Mentor</label>
                    <select id="mentor" required>
                        <option value="604a7b12d610101287aa2955">604a7b12d610101287aa2955</option>
                        <option value="604a7b12d610101287aa2955">604a7b12d610101287aa2955</option>
                        <option value="604a7b12d610101287aa2955">604a7b12d610101287aa2955</option>
                    </select>
                    <label htmlFor="authors">Authors</label>
                    <select id="authors" multiple required>
                        <option value="604a7b12d610101287aa2955">604a7b12d610101287aa2955</option>
                        <option value="604a7b12d610101287aa2955">604a7b12d610101287aa2955</option>
                        <option value="604a7b12d610101287aa2955">604a7b12d610101287aa2955</option>
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