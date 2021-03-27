import React from 'react';
import RemoveTask from './removeTask';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import UserIcon from './userIcon';
import {Card, CardContent} from '@material-ui/core';

interface taskProps {
    name: string,
    deadline: number,
    user?: string | null,
    id: string
}

const taskItem = ({name, deadline, user, id}: taskProps) => {
    console.log(user)
    return (
        <Card id={id}>
            <CardContent>
                <h2>{name}</h2>
                <time>Deadline: {deadline}</time>
                {/* { user ? 
                    <Fab color="primary"  variant="extended" size="small" onClick={() => console.log('hej')}>
                        <React.Fragment>{user}</React.Fragment>
                    </Fab> 
                    :
                    <Fab color="primary" aria-label="add" size="small" onClick={() => console.log('hej')}>
                        <AddIcon />
                    </Fab>
                } */}
                <UserIcon userName={user}/>
                <RemoveTask id={id}/>
            </CardContent>
        </Card>
    )
};

export default taskItem