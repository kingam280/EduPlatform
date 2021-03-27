import React from 'react';
import RemoveTask from './removeTask';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import {Card, CardContent} from '@material-ui/core';

interface taskProps {
    name: string,
    deadline: number,
    user?: string | null,
    id: string
}

const taskItem = ({name, deadline, user, id}: taskProps) => {
    return (
        <Card id={id}>
            <CardContent>
                <h2>{name}</h2>
                <time>Deadline: {deadline}</time>
                { user ? 
                    <Fab color="primary"  variant="extended" size="small">
                        <React.Fragment>{user}</React.Fragment>
                    </Fab> 
                    :
                    <Fab color="primary" aria-label="add" size="small">
                        <AddIcon />
                    </Fab>
                }
                <RemoveTask id={id}/>
            </CardContent>
        </Card>
    )
};

export default taskItem