import React from 'react';
import TaskList from './taskList';
import AddTask from './addTask';
import TasksStatus from './taskStatus';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import '../../styles/tasksStyles.css';

const Tasks = () => {

  return (
    <React.Fragment>
        <Container>
          <TasksStatus />
          <Card variant="outlined" className='tasksBox'>
            <CardContent>
              <TaskList />
            </CardContent>
            <CardActions>
              <AddTask />
            </CardActions>
          </Card>
        </Container>
    </React.Fragment>
  );
}

export default Tasks