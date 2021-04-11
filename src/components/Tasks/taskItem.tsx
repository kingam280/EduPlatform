import RemoveTask from './removeTask';
import UserIcon from './userIcon';
import {Card, CardContent, CardActions, Grid} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import '../../styles/tasksStyles.css';

interface taskProps {
    name: string,
    deadline: number,
    user?: string | null,
    id: string
}

const taskItem = ({name, deadline, user, id}: taskProps) => {
    return (
        <Card id={id} className= "tasksBox__subcard">
            <Grid container justify="space-between" alignItems="stretch">
                <CardContent>
                    <Typography variant="h5" className='tasksBox__subtitle'>
                        {name}
                    </Typography>
                    <Typography variant="subtitle1" className='tasksBox__date'>
                        Deadline: {new Date(deadline).toLocaleDateString()}
                    </Typography>
                </CardContent>
                <CardActions>
                    <UserIcon userName={user} taskId={id}/>
                    <RemoveTask id={id}/>
                </CardActions>
            </Grid>
        </Card>
    )
};

export default taskItem