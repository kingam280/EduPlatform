import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Hidden from "@material-ui/core/Hidden";
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import useStyles from './useStyles';
import SideDrawer from './sideDrawer';
import Navbar from './navbar';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/rootReducer';

const Menu  = () => {
    const classes = useStyles();
    const token = useSelector((state:RootState) => state.authorization.token)

    return (
        <AppBar>
            <Toolbar>
                <Container className={classes.navbarDisplayFlex} maxWidth="lg">
                    <NavLink to='/' className={classes.linkText}>
                        <Button>
                            <Typography variant='h6' className={classes.linkText}>
                                EduPlatform
                            </Typography>
                        </Button>
                    </NavLink>
                    <Hidden smDown>
                        <Navbar auth={token ? true : false} mobile={false}/>
                    </Hidden>
                    <Hidden mdUp> 
                        <SideDrawer />
                    </Hidden>
                </Container>
            </Toolbar>
        </AppBar>
    )
}

export default Menu