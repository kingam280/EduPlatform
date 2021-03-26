import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../app/rootReducer';
import {fetchTasksByProject, fetchUsers} from '../../app/tasksReducer';
import TaskItem from './taskItem';

const TaskList = () => {
    const tasks = useSelector( (state:RootState) => state.tasks.tasks);
    const users = useSelector( (state:RootState) => state.tasks.users);
    const project = useSelector( (state:RootState) => state.tasks.projectId)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTasksByProject(project));
        dispatch(fetchUsers())
    }, [project, dispatch]);

    const projectTasks =  () => {
        return Object.keys(tasks).map( (task, index) => {
            return <TaskItem  key={index} 
                name={tasks[task].name} 
                deadline={tasks[task].deadline}
                user={users[tasks[task].user] ? 
                        `${users[tasks[task].user].firstName} ${users[tasks[task].user].lastName}` 
                        : null}
                 />
        })
    }
    return (
        <section>
            {projectTasks()}
        </section>
    )
};

export default TaskList