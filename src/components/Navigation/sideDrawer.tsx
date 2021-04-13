import React, {useState} from 'react';
import IconButton from "@material-ui/core/IconButton"
import Menu from "@material-ui/icons/Menu"
import useStyles from './useStyles';
import Drawer from "@material-ui/core/Drawer";
import Navbar from './navbar';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/rootReducer';

const SideDrawer = () => {
    const classes = useStyles();
    const [state, setState] = useState(false);
    const token = useSelector((state:RootState) => state.authorization.token)

    const toggleDrawer = () => {
        setState(!state)
      }

    return (
        <React.Fragment>
            <IconButton edge="start" aria-label="menu" onClick={toggleDrawer} className={classes.linkText}>
            <Menu />
            </IconButton>
            <Drawer
                anchor="right"
                open={state}
                onClose={toggleDrawer}>
                <Navbar auth={token ? true : false} mobile={true} />
            </Drawer>
        </React.Fragment>
    )
  
}

export default SideDrawer