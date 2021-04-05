import React, { FormEvent, useState } from 'react'
import { IProject } from '../../interfaces/Project'
import { Button, TextField } from '@material-ui/core'

const ProjectForm = ({ saveProject, header, projectData }: {saveProject: Function, header: string, projectData?: IProject}) => {

    const [form, setForm] = useState(projectData || {
        title: '',
        description: '',
        mentor: '',
        authors: [],
        linkToDemo: '',
        linkToGitHub: ''
    })

    const handleFormChange = (e: React.ChangeEvent<HTMLFormElement>) => {
        if (e.target.id === "authors") {
            const authors = Array.from(e.target.selectedOptions, (option: HTMLInputElement) => option.value)
            setForm(prev => ({
                ...prev,
                [e.target.id]: authors
            }))
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
        console.log(body)
        saveProject(body) 
    }

    return (
        <div className="add-project-modal">
                <h2 id="simple-modal-title">{header}</h2>
                <form onChange={handleFormChange} onSubmit={handleSubmit} className={"add-project-form"}>
                    <TextField 
                        id="title" 
                        label="Title" 
                        variant="filled" 
                        defaultValue={projectData && projectData.title}
                        required 
                        fullWidth
                        margin="dense"
                        />
                    <TextField 
                        id="description" 
                        label="Description" 
                        variant="filled" 
                        defaultValue={projectData && projectData.description}
                        required 
                        fullWidth
                        margin="dense"
                        rows={4}
                        />
                    <TextField 
                        id="linkToDemo" 
                        label="Link to demo" 
                        variant="filled" 
                        defaultValue={projectData && projectData.linkToDemo}
                        required 
                        fullWidth
                        margin="dense"
                        />
                    <TextField 
                        id="linkToGitHub" 
                        label="Link to GitHub" 
                        variant="filled"
                        defaultValue={projectData && projectData.linkToGitHub}
                        required 
                        fullWidth
                        margin="dense"
                        />
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
                    <Button variant="contained" type="submit">Add</Button>
                </form>
            </div>
    )
}

export default ProjectForm