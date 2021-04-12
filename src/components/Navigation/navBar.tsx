import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { List, ListItem, ListItemText } from "@material-ui/core"
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import useStyles from './useStyles';

const Navbar  = () => {
    const classes = useStyles()

    const navLinks = [
        { title: `about us`, path: `/about-us` },
        { title: `product`, path: `/product` },
        { title: `blog`, path: `/blog` },
        { title: `contact`, path: `/contact` },
        { title: `faq`, path: `/faq` },
      ]

    return (
        <AppBar>
            <Toolbar>
                <Container className={classes.navbarDisplayFlex} maxWidth="lg">
                    <Typography variant='h6'>
                        EduPlatform
                    </Typography>
                    <List component="nav" aria-labelledby="main navigation" className={classes.navDisplayFlex}>
                        {navLinks.map(({ title, path }) => (
                        <a href={path} key={title} className={classes.linkText}>
                            <ListItem button>
                                <ListItemText primary={title} />
                            </ListItem>
                        </a>
                    ))}
                    </List>
                </Container>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar