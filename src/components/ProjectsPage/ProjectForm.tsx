import React, { FormEvent, useState } from 'react'
import { IProject } from '../../interfaces/Project'
import { Button, TextField } from '@material-ui/core'
import { useAppSelector } from '../../app/hooks'
import Select from '@material-ui/core/Select';

const ProjectForm = ({ saveProject, header, projectData }: {saveProject: Function, header: string, projectData?: IProject}) => {
    const groups = useAppSelector(state => state.projects.groups)
    const [form, setForm] = useState(projectData || {
        title: '',
        description: '',
        group: '',
        linkToDemo: '',
        linkToGitHub: ''
    })

    const handleFormChange = (e: React.ChangeEvent<HTMLFormElement>) => {
        setForm(prev => ({
            ...prev,
            [e.target.id]: e.target.value
        }))
        }     
    

    const handleSelectChange =  (e: React.ChangeEvent<{ name?: string | undefined; value: unknown; }>) => {
        setForm(prev => ({
            ...prev,
            group: e.target.value as string
        }))
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const body = {
            title: form.title,
            description: form.description,
            group: form.group,
            linkToDemo: form.linkToDemo,
            linkToGitHub: form.linkToGitHub
        }
        await saveProject(body) 
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
                        <Select
                            value={form.group}
                            onChange={handleSelectChange}
                            labelId="demo-simple-select-filled-label"
                            label="Group"
                            id="demo-simple-select-filled"
                            variant="filled"
                            required 
                            fullWidth
                            margin="dense"
                            >
                            {groups.map(group => <option value={group._id}>{group.groupName}</option>)}
                        </Select>
                    <Button variant="contained" type="submit">Submit</Button>
                </form>
            </div>
    )
}

export default ProjectForm