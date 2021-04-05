import React, { useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import axios from '../../config/axios';

const mentor = "604a7b12d610101287aa2955";   

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
    button: {
        margin: theme.spacing(1),
      },
  }),
);

export const GroupCreate = () => {
  const classes = useStyles();
  const [groupName, setGroupName] = useState('');
  
  const changeGroupName = (e: React.FormEvent) => {
    const value = (e.target as HTMLTextAreaElement).value; 
    setGroupName(value)
  }
  
  const createGroup = () => {
    const newGroup = axios.post('/group/createGroup', {mentor: mentor, groupName: groupName})
  }

  return (
    <div className={classes.root}>
      <TextField 
        id="standard-basic"
        label="Name of the group" 
        onChange={e=>changeGroupName(e)}
      />
      <Button 
        variant="contained"
        color="primary"
        size="small"
        className={classes.button}
        startIcon={<SaveIcon />}
        onClick={createGroup}
      >
        Create
      </Button>
    </div>
  );
}