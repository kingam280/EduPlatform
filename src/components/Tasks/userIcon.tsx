import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../app/rootReducer';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';

interface userIcon {
    userName: string | null | undefined
}

const UserIcon = ({userName}: userIcon) => {
    const users = useSelector( (state:RootState) => state.tasks.users);
    const [open, setOpen] = useState<boolean>(false);
    const [user, setUser] = useState<string>('');

    const changeVisibilty = () => {
        setOpen(!open)
    }

    const changeValue = (event: React.FormEvent) => {
        const target = event.target as HTMLTextAreaElement;
        const value= target.value;

        setUser(value)
    }

    const closeSelectUser = () => {
        changeVisibilty();
        setUser('')
    }

    return (
        <React.Fragment>
             { userName ? 
                <Fab color="primary"  variant="extended" size="small" onClick={() => changeVisibilty()}>
                    <React.Fragment>{userName}</React.Fragment>
                </Fab> 
                :
                <Fab color="primary" aria-label="add" size="small" onClick={() => changeVisibilty()}>
                    <AddIcon />
                </Fab>
            }
            <Dialog open={open} aria-labelledby="form-dialog-title" >
                <DialogTitle id="form-dialog-title">Add new task</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        id="user"
                        label="User"
                        select
                        fullWidth
                        onChange={(e) => changeValue(e)}
                        value={user}
                    >
                        {Object.keys(users).map( (user, index)  => {
                            return <MenuItem key={user} value={user}>
                                        {`${users[user].firstName} ${users[user].lastName} (${users[user].role})`}
                                    </MenuItem>
                        })}
                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={closeSelectUser}>
                        Cancel
                    </Button>
                    <Button color="primary">
                        Add task
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
};

export default UserIcon