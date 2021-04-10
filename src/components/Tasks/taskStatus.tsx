import React from 'react';
import { useDispatch } from 'react-redux';
import {TasksInterface} from '../../interfaces/tasks';
import { changeTaskStatus } from '../../app/tasksReducer';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import '../../styles/tasksStyles.css';

const TasksStatus = ({tasks}:TasksInterface) => {
    const dispatch = useDispatch();

    const changeStatus = (id:string) => {
        dispatch(changeTaskStatus(id))
    }
    
    const listOfTasksByStatus = (status:boolean) => {
        
        const listOfTasks = Object.keys(tasks)
        .filter(task => tasks[task].done === status)
        .map( task => {
            return <ListItem key={task} id={task} onClick={() => changeStatus(task)} button>
                        {tasks[task].name}
                    </ListItem>
        })

        return (
            <List>
                {listOfTasks}
            </List>
        )
    }

    return (
        <React.Fragment>
            <Grid container spacing={1} justify="space-between" alignItems="stretch" className= 'tasksBox'>
                <Grid item xs={12} sm={6}>
                    <Card variant="outlined" className="tasksBox__card">
                        <CardContent>
                            <Typography variant="h4" align='center' className='tasksBox__title'>
                                Tasks to do
                            </Typography>
                            <CardActions>
                                {listOfTasksByStatus(false)}   
                            </CardActions>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Card variant="outlined" className="tasksBox__card">
                        <CardContent>
                            <Typography variant="h4" align='center' className='tasksBox__title'>
                                Finished tasks
                            </Typography>
                            <CardActions>
                                {listOfTasksByStatus(true)}   
                            </CardActions>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default TasksStatus