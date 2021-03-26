import React from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import {Card, CardContent} from '@material-ui/core';

interface taskProps {
    name: string,
    deadline: number
}

const taskItem = ({name, deadline}: taskProps) => {
    return (
        <Card>
            <CardContent>
                <h2>{name}</h2>
                <time>Deadline: {deadline}</time>
                <Fab color="primary" aria-label="add" size="small">
                    <AddIcon />
                </Fab>
            </CardContent>
        </Card>
    )
};

export default taskItem