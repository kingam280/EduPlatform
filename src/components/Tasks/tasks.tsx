import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../app/rootReducer';
import {fetchTasksByProject, fetchUsers} from '../../app/tasksReducer';
import TaskList from './taskList';
import AddTask from './addTask';
import TasksStatus from './taskStatus';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CircularProgress from '@material-ui/core/CircularProgress';
import '../../styles/tasksStyles.css';

const Tasks = () => {

  const loading = useSelector((state:RootState) => state.tasks.loading)
  const tasks = useSelector( (state:RootState) => state.tasks.tasks);
  const project = useSelector( (state:RootState) => state.tasks.projectId);
  const users = useSelector( (state:RootState) => state.tasks.users)
  const dispatch = useDispatch();

  useEffect( () => {
      dispatch(fetchTasksByProject(project));
      dispatch(fetchUsers())
  }, [project, dispatch]);

  return (
    <React.Fragment>
        <Container>
          {loading ? <CircularProgress className='tasksBox__spinner'/> :
          (<React.Fragment>
            <TasksStatus tasks={tasks}/>
          <Card variant="outlined" className='tasksBox'>
            <CardContent>
              <TaskList tasks={tasks}/>
            </CardContent>
            <CardActions>
              <AddTask project={project} users={users}/>
            </CardActions>
          </Card>
          </React.Fragment>)}
        </Container>
    </React.Fragment>
  );
}

export default Tasks