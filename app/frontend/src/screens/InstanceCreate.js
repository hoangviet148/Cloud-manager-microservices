import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Grid } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from "@material-ui/core/Select";
import MenuItem from '@material-ui/core/MenuItem';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { getAllNetworks } from '../actions/networkActions';
import { createInstance, getInstanceByID } from '../actions/computeActions';
import Cookie from 'js-cookie';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'row',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

function InstanceCreate(props) {
    console.log("InstanceCreate screen: ", props)
    const [name, setName] = useState('');
    const [CPU, setCPU] = useState('');
    const [ram, setRam] = useState('');
    const [disk, setDisk] = useState('');
    const [network, setNetwork] = useState('');
    const [page, setPage] = useState(true);
    const dispatch = useDispatch();

    const res = useSelector(state => {
        console.log(state)
        return state.AllNetworks.networks
    });

    const instance = useSelector(state => {
        console.log(state)
        return state.InstanceByID.instance
    });
    console.log("instance: ", instance)

    const networks = res?.networks;
    console.log("networks: ", networks)

    const classes = useStyles();

    useEffect(() => {
        console.log("useEffect")
        setPage(props?.match.url.includes("update"))
        dispatch(getAllNetworks());
        dispatch(getInstanceByID(props.match.params.id))
    }, [])

    const submitHandler = async (e) => {
        e.preventDefault();
        await dispatch(createInstance(name, Cookie.getJSON('userInfo')?.userId, CPU, ram, disk, network))
        props.history.push("/instances");
    }

    return (
        <div className="content content-margined">
            <div className="back-to-result">
                <Link href="../instances" style={{ cursor: 'pointer', textDecoration: 'none' }}>
                    <Grid container style={{ width: '15rem' }}>
                        <Grid item xs={2}><ArrowBackIcon /></Grid>
                        <Grid item xs={10}>Back to Instance list</Grid>
                    </Grid>
                </Link>
            </div>
            <Container component="main" style={{ width: '40rem' }}>
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        {page ? "Update Instance" : "Create Instance"}
                    </Typography>
                    <form className={classes.form} onSubmit={submitHandler}>
                        <Grid item xs={8}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                label="Name"
                                name="name"
                                id="name"
                                // value={page ? instance?.hostname : ""}
                                autoFocus
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                label="CPU"
                                name="CPU"
                                id="CPU"
                                type="number"
                                min="1"
                                // value={page ? instance?.cpu : ""}
                                autoComplete="CPU"
                                autoFocus
                                onChange={(e) => setCPU(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                label="Ram"
                                name="ram"
                                id="ram"
                                type="number"
                                min="1"
                                // value={page ? instance?.ram : ""}
                                autoComplete="ram"
                                autoFocus
                                onChange={(e) => setRam(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                label="Disk"
                                name="disk"
                                id="disk"
                                type="number"
                                min="1"
                                // value={page ? instance?.disk : ""}
                                autoComplete="disk"
                                autoFocus
                                onChange={(e) => setDisk(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={8}>
                            <FormControl variant="outlined" style={{ width: '100%', marginTop: '2rem' }} margin="normal">
                                <InputLabel id="network">Network</InputLabel>
                                <Select
                                    id="network"
                                    label="network"
                                    displayEmpty
                                    name="network"
                                    // value={page ? instance?.disk : ""}
                                    onChange={(e) => setNetwork(e.target.value)}
                                    defaultValue="sdfsf"
                                >
                                    {networks?.length && networks.filter(network => network.status === "active").map(network => (<MenuItem value={network.id}>{network.name}</MenuItem>))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            {page ? "Update" : "Create"}
                        </Button>

                    </form>
                </div>
            </Container>
        </div>
    )
}

export default InstanceCreate