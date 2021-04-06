import {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../app/rootReducer';
import {fetchTasksByProject, fetchUsers} from '../../app/tasksReducer';
import TaskItem from './taskItem';

const TaskList = () => {
    const tasks = useSelector( (state:RootState) => state.tasks.tasks);
    const users = useSelector( (state:RootState) => state.tasks.users);
    const project = useSelector( (state:RootState) => state.tasks.projectId)
    const dispatch = useDispatch();

    useEffect( () => {
        dispatch(fetchUsers())
    }, [])

    useEffect( () => {
        dispatch(fetchTasksByProject(project));
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
        <section>
            {projectTasks()}
        </section>
    )
};

export default TaskList