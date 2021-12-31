import React from 'react';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ChildCareIcon from '@material-ui/icons/ChildCare';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import './App.css';
import HomeScreen from './screens/HomeScreen';
import { Grid } from '@material-ui/core';
import InstanceList from './screens/InstanceList';
import InstanceDetail from './screens/InstanceDetail';
import SigninScreen from './screens/SigninScreen';
import RegisterScreen from './screens/RegisterScreen';
import TierList from './screens/TierList';
import TierDetail from './screens/TierDetail';
import TierCreateForm from './screens/TierCreateForm';
import InstanceCreate from './screens/InstanceCreate';
import NetworkList from './screens/NetworkList';
import UserTier from './screens/UserTier';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
}));

export default function SideBar() {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    // open sidebar
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    // close sidebar
    const handleDrawerClose = () => {
        setOpen(false);
    };

    const logoutHandle = () => {
        console.log("logoutHandle")
        //Cookie.remove('userInfo')
        //props.history.push('/signin');
    }

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;
    console.log("side bar: ", userInfo)

    return (
        <BrowserRouter>
            <div className={classes.root}>
                <CssBaseline />
                <AppBar position="fixed" className={clsx(classes.appBar, { [classes.appBarShift]: open, })}>
                    <Toolbar>
                        <Grid container>
                            <Grid item xs={1}>
                                <IconButton
                                    color="inherit"
                                    aria-label="open drawer"
                                    onClick={handleDrawerOpen}
                                    edge="start"
                                    className={clsx(classes.menuButton, open && classes.hide)}
                                >
                                    <MenuIcon />
                                </IconButton>
                            </Grid>
                            <Grid item xs={9}>
                                <Typography variant="h4" noWrap>
                                    <Link to="/">Cloud Manager</Link>
                                </Typography>
                            </Grid>
                            <Grid item xs={2} style={{ paddingTop: '0.4rem' }}>
                                {
                                    userInfo ? <Link to="/signin"><ExitToAppIcon onClick={logoutHandle} /></Link> : null

                                }
                                {
                                    userInfo ? <Link to="/profile"><PermIdentityIcon /> </Link> : null

                                }
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
                <Drawer
                    className={classes.drawer}
                    variant="persistent"
                    anchor="left"
                    open={open}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.drawerHeader}>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </IconButton>
                    </div>
                    <Divider />
                    <List>
                        {userInfo?.isAdmin == true ? null : (<ListItem button>
                            <Link to="/instances" style={{ textDecoration: 'none', color: '#203040' }}>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <ListItemIcon style={{ paddingTop: '.2rem' }}><ChildCareIcon /></ListItemIcon>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <ListItemText style={{ paddingLeft: '0.5rem' }}>Instances</ListItemText>
                                    </Grid>
                                </Grid>
                            </Link>
                        </ListItem>)}
                        {userInfo?.isAdmin ? null : (<ListItem button>
                            <Link to="/networks" style={{ textDecoration: 'none', color: '#203040' }}>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <ListItemIcon style={{ paddingTop: '.2rem' }}><ChildCareIcon /></ListItemIcon>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <ListItemText style={{ paddingLeft: '0.5rem' }}>Networks</ListItemText>
                                    </Grid>
                                </Grid>
                            </Link>
                        </ListItem>)}
                        <ListItem button>
                            <Link to="/tiers" style={{ textDecoration: 'none', color: '#203040' }}>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <ListItemIcon style={{ paddingTop: '.2rem' }}><ChildCareIcon /></ListItemIcon>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <ListItemText style={{ paddingLeft: '1.1rem' }}>Tier</ListItemText>
                                    </Grid>
                                </Grid>
                            </Link>
                        </ListItem>
                        <ListItem button>
                            <Link to="/resource" style={{ textDecoration: 'none', color: '#203040' }}>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <ListItemIcon style={{ paddingTop: '.2rem' }}><ChildCareIcon /></ListItemIcon>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <ListItemText style={{ paddingLeft: '0.2rem' }}>Storages</ListItemText>
                                    </Grid>
                                </Grid>
                            </Link>
                        </ListItem>
                        <ListItem button>
                            <Link to="/overview" style={{ textDecoration: 'none', color: '#203040' }}>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <ListItemIcon style={{ paddingTop: '.2rem' }}><ChildCareIcon /></ListItemIcon>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <ListItemText style={{ paddingLeft: '0.2rem' }}>Overview</ListItemText>
                                    </Grid>
                                </Grid>
                            </Link>
                        </ListItem>
                    </List>
                </Drawer>
                <main className={clsx(classes.content, { [classes.contentShift]: open, })}>
                    <div className={classes.drawerHeader} />
                    <div className="content" style={{ minHeight: '37rem' }}>
                        <Route path="/instances" component={InstanceList} />
                        <Route path="/instance/:id" component={InstanceDetail} />
                        <Route path="/" exact={true} component={HomeScreen} />
                        <Route path="/signin" component={SigninScreen} />
                        <Route path="/register" component={RegisterScreen} />
                        <Route path="/tiers" component={userInfo?.isAdmin ? TierList : UserTier} />
                        <Route path="/tier/:tier" component={TierDetail} />
                        <Route path="/tier-create" component={TierCreateForm} />
                        <Route path="/instance-create" component={InstanceCreate} />
                        <Route path="/networks" component={NetworkList} />
                        {/* <Route path="/products-list" component={ProductList} /> */}
                        {/* <Route path="/shipping" component={ShippingScreen} /> */}
                        {/* <Route path="/payment" component={PaymentScreen} /> */}
                        {/* <Route path="/placeorder" component={PlaceOrderScreen} /> */}
                        {/* <Route path="/profile" component={ProfileScreen} /> */}
                        {/* <Route path="/orders-list" component={OrdersScreen} /> */}
                        {/* <Route path="/category/:id" component={HomeScreen} /> */}
                        {/* <Route path="/users" component={UserList} /> */}
                    </div>
                </main>
            </div>
            {/* <footer className="footer">
                All right reversed.
    </footer> */}
        </BrowserRouter>
    )
}