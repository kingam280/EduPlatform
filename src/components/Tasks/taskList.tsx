import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../app/rootReducer';
import {fetchTasksByProject, fetchUsers} from '../../app/tasksReducer';
import TaskItem from './taskItem';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import '../../styles/tasksStyles.css'

const TaskList = () => {
    const loading = useSelector((state:RootState) => state.tasks.loading)
    const tasks = useSelector( (state:RootState) => state.tasks.tasks);
    const project = useSelector( (state:RootState) => state.tasks.projectId)
    const dispatch = useDispatch();

    useEffect( () => {
        dispatch(fetchTasksByProject(project));
        dispatch(fetchUsers())
    }, [project, dispatch]);

    const projectTasks =  () => {
        return Object.keys(tasks).map( task => {
            return <TaskItem  key={task} 
                id={task}
                name={tasks[task].name} 
                deadline={tasks[task].deadline}
                user={tasks[task].user !== null ? 
                        `${tasks[task].user!.name}` 
                        : null}
                 />
        })
    }

    return (
        <React.Fragment>
            <Typography variant="h4" align='center' className='tasksBox__title'>
                All tasks for this project
            </Typography>
            { loading ? <CircularProgress className='tasksBox__spinner'/> : 
            projectTasks()}
        </React.Fragment>
    )
};

export default TaskList