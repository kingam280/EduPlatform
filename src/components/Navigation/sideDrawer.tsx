import React, {useState} from 'react';
import IconButton from "@material-ui/core/IconButton"
import Menu from "@material-ui/icons/Menu"
import useStyles from './useStyles';
import Drawer from "@material-ui/core/Drawer";
import Navbar from './navbar';

const SideDrawer = () => {
    const classes = useStyles();
    const [state, setState] = useState(false);

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
                <Navbar auth={true} mobile={true} />
            </Drawer>
        </React.Fragment>
    )
  
}

export default SideDrawer