import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../app/rootReducer';
import { changeTaskStatus } from '../../app/tasksReducer';

const TasksStatus = () => {
    const tasks = useSelector((state:RootState) => state.tasks.tasks);
    const dispatch = useDispatch();

    const changeStatus = (id:string) => {
        dispatch(changeTaskStatus(id))
    }
    
    const listOfTasksByStatus = (status:boolean) => {
        
        const listOfTasks = Object.keys(tasks)
        .filter(task => tasks[task].done === status)
        .map( task => {
            return <li key={task} id={task} onClick={() => changeStatus(task)}>
                        {tasks[task].name}
                    </li>
        })

        return (
            <ul>
                {listOfTasks}
            </ul>
        )
    }

    return (
        <article>
            <section>
                {listOfTasksByStatus(false)}
            </section>
            <section>
                {listOfTasksByStatus(true)}
            </section>
        </article>
    )
}

export default TasksStatus