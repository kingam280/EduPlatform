import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../app/rootReducer';

const TasksStatus = () => {
    const tasks = useSelector((state:RootState) => state.tasks.tasks);
    const dispatch = useDispatch();
    
    const listOfTasksByStatus = (status:boolean) => {
        
        const listOfTasks = Object.keys(tasks)
        .filter(task => tasks[task].done === status)
        .map( task => {
            return <li key={task} id={task}>
                        {tasks[task].name}
                    </li>
        })

        console.log(listOfTasks)

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