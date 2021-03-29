import RemoveTask from './removeTask';
import UserIcon from './userIcon';
import {Card, CardContent} from '@material-ui/core';

interface taskProps {
    name: string,
    deadline: number,
    user?: string | null,
    id: string
}

const taskItem = ({name, deadline, user, id}: taskProps) => {
    console.log(user)
    return (
        <Card id={id}>
            <CardContent>
                <h2>{name}</h2>
                <time>Deadline: {deadline}</time>
                <UserIcon userName={user} taskId={id}/>
                <RemoveTask id={id}/>
            </CardContent>
        </Card>
    )
};

export default taskItem