import React, { 
    useState, 
    useEffect 
} from 'react'
import ProjectInterface from '../../interfaces/Project'
import UserInterface from '../../interfaces/User'
import axios from '../../config/axios'


const Project: React.FC<{data: ProjectInterface}> = ({ data }) => {
    const [mentor, setMentor] = useState("")

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
        <div>
            <h3>{data.title}</h3>
            <p>{mentor}</p>
        </div>
    )
}

export default Project