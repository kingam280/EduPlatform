import React, { useEffect, useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

type MemberOfGroup = {
  _id: string
}

type Group = {
  _id: string,
  groupName: string,
  mentor: string,
  members: Array<MemberOfGroup>
}

type Groups = {
  numberOfGroups: number,
  result: Array<Group>
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      maxWidth: 752,
    },
    demo: {
      backgroundColor: theme.palette.background.paper,
    },
    title: {
      margin: theme.spacing(4, 0, 2),
    },
  }),
);


export const getGroups = async () => {
  const groups = await fetch("https://eduplatformapi.herokuapp.com/group")
  const jsonGroups = await groups.json();
  return jsonGroups;
}

export const GroupDisplay = () => {
  const classes = useStyles();
  const [groups, setGroups] = useState<Groups | null>(null);
  useEffect(() => {
    getGroups()
      .then(newGroups => setGroups(newGroups))
  }, [])
  console.log(groups)
  return (
    <div className={classes.root}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" className={classes.title}>
            Text only
          </Typography>
          <div className={classes.demo}>
          <List >
              {groups !== null ? groups.result.map(Group => (
                <ListItem>
                  <ListItemText>
                    {Group.groupName}
                  </ListItemText>
                </ListItem>
                
              )) : "loading"}
            </List>
          </div>
        </Grid>
    </div>
  );
}