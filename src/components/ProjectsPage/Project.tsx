import React, { 
    useState, 
    useEffect 
} from 'react'
import ProjectInterface from '../../interfaces/Project'
import UserInterface from '../../interfaces/User'
import axios from '../../config/axios'
import { AppBar } from '@material-ui/core'


const Project: React.FC<{data: ProjectInterface, updateProjectsList: Function}> = ({ data, updateProjectsList }) => {
    const [mentor, setMentor] = useState("")

    const handleRemoveProjectClick = () => {
        const id = data._id
        console.log(id)
        axios
            .delete(`/projects/${id}`)
            .then(res => updateProjectsList())
            .catch(err => console.log(err))
    }

    useEffect(() => {
        axios
            .get('/authorization')
            .then(res => res.data)
            .then(res => {
                res.forEach((el: UserInterface) => {
                    if (el._id === data.mentor) {
                        const mentor = `${el.firstName} ${el.lastName}`
                        setMentor(mentor)
                    }
                })
            })
    }, [data.mentor])

    return (
        <AppBar position='relative' color='default'>
            <h3>{data.title}</h3>
            <p>{mentor}</p>
            <button onClick={handleRemoveProjectClick}><i className="fas fa-times"></i></button>
        </AppBar>
    )
}

export default Project