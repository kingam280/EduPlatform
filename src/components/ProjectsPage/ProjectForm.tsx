import React, { FormEvent, useState } from 'react'
import { projectInterface } from '../../interfaces/Project'

const ProjectForm = ({ saveProject, header, projectData }: {saveProject: Function, header: string, projectData?: projectInterface}) => {

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
        saveProject(body) 
    }

    return (
        <div className="add-project-modal">
                <h2 id="simple-modal-title">{header}</h2>
                <form onChange={handleFormChange} onSubmit={handleSubmit} className={"add-project-form"}>
                    <label htmlFor="title">Title</label>
                    <input type="text" id="title"  required defaultValue={projectData && projectData.title}/>
                    <label htmlFor="description">Description</label>
                    <textarea name="description" id="description" required defaultValue={projectData && projectData.description}></textarea>
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
                    <input type="text" id="linkToDemo" required defaultValue={projectData && projectData.linkToDemo}/>
                    <label htmlFor="linkToGitHub">Link to GitHub</label>
                    <input type="text" id="linkToGitHub" required defaultValue={projectData && projectData.linkToGitHub}/>
                    <button>Add</button>
                </form>
            </div>
    )
}

export default ProjectForm