import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../app/rootReducer';
import {fetchTasksByProject} from '../../app/tasksReducer';
import Button from '@material-ui/core/Button';
import TaskItem from './taskItem';

const TaskList = () => {
    const tasks = useSelector( (state:RootState) => state.tasks.tasks);
    const project = useSelector( (state:RootState) => state.tasks.projectId)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTasksByProject(project))
    }, [project, dispatch])

    const projectTasks =  () => {
        return Object.keys(tasks).map( task => {
            return <TaskItem  name={tasks[task].name} deadline={tasks[task].deadline} />
        })
    }
    return (
        <article>
            <Button variant="outlined" color="primary">Add task</Button>
            {projectTasks()}
        </article>
    )
};

export default TaskList