import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../app/rootReducer';
import {fetchTasksByProject, fetchUsers, removeTaskFromProject} from '../../app/tasksReducer';
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

    // const removeTask = (id:string) => {
    //     // dispatch(removeTaskFromProject(id))
    //     console.log(id)
    // }

    const projectTasks =  () => {
        return Object.keys(tasks).map( task => {
            return <TaskItem  key={task} 
                id={task}
                name={tasks[task].name} 
                deadline={tasks[task].deadline}
                // user={tasks[task].userId ? 
                //         `${users[tasks[task].userId!].firstName} ${users[tasks[task].userId!].lastName}` 
                //         : null}
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