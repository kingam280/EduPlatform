import React, {useState} from 'react';
import { IconButton } from "@material-ui/core"
import { Menu } from "@material-ui/icons"
import useStyles from './useStyles';
import { List, ListItem, ListItemText, Drawer  } from "@material-ui/core";

const navLinks = [
    { title: `about us`, path: `/about-us` },
    { title: `product`, path: `/product` },
    { title: `blog`, path: `/blog` },
    { title: `contact`, path: `/contact` },
    { title: `faq`, path: `/faq` },
  ]

const SideDrawer = () => {
    const classes = useStyles();
    const [state, setState] = useState(false);

    const toggleDrawer = () => {
        setState(!state)
      }

      const sideDrawerList = () => (
          <List component="nav">
            {navLinks.map(({ title, path }) => (
              <a href={path} key={title} className={classes.linkTextDrawer}>
                <ListItem button>
                  <ListItemText primary={title} />
                </ListItem>
              </a>
            ))}
          </List>
      );

    return (
        <React.Fragment>
            <IconButton edge="start" aria-label="menu" onClick={toggleDrawer}>
            <Menu />
            </IconButton>
            <Drawer
                anchor="right"
                open={state}
                onClose={toggleDrawer}
            >
                {sideDrawerList()}
            </Drawer>
        </React.Fragment>
    )
  
}

export default SideDrawer