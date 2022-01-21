import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@mui/material/TextField';
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
import { updateInstance, getInstanceByID } from '../actions/computeActions';
import Cookie from 'js-cookie';
import Alert from '@mui/material/Alert';

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

function InstanceUpdate(props) {
    console.log("InstanceCreate screen: ", props)
    const [displayError, setDisplayError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    console.log("displayError: ", displayError)
    const [name, setName] = useState('');
    const [CPU, setCPU] = useState('');
    const [ram, setRam] = useState('');
    const [disk, setDisk] = useState('');
    const dispatch = useDispatch();

    const res = useSelector(state => {
        //console.log(state)
        return state.AllNetworks.networks
    });

    const instance = useSelector(state => {
        console.log(state)
        return state.InstanceByID.instance
    });
    console.log("instance: ", instance)


    const updateInstanceStatus = useSelector(state => {
        return state.updateInstance
    });

    console.log("updateInstanceStatus: ", updateInstanceStatus)

    const networks = res?.networks;
    console.log("networks: ", networks)

    const classes = useStyles();

    useEffect(async () => {
        console.log("useEffect", props)
        //setPage(props?.match.url.includes("update"))
        dispatch(getAllNetworks());
        await dispatch(getInstanceByID(props.match.params.id))
        if (updateInstanceStatus.error) {
            setDisplayError(true)
            setErrorMessage(updateInstanceStatus.error)
        }
        if (updateInstanceStatus.message === 'Update Compute success!') {
            props.history.push("/instances");
        }
    }, [updateInstanceStatus.error, updateInstanceStatus.message])

    const submitHandler = async (e) => {
        console.log("submitHandler")
        e.preventDefault();
        await dispatch(updateInstance(name, Cookie.getJSON('userInfo')?.userId, disk, ram, CPU, props?.match.params.id))
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
                        Update Instance
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
                                value={instance?.hostname}
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
                                value={instance?.cpu}
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
                                label="Ram (GB)"
                                name="ram"
                                id="ram"
                                type="number"
                                min="1"
                                value={instance?.ram}
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
                                label="Disk (GB)"
                                name="disk"
                                id="disk"
                                type="number"
                                min="1"
                                value={instance?.disk}
                                autoComplete="disk"
                                autoFocus
                                onChange={(e) => setDisk(e.target.value)}
                            />
                        </Grid>

                        {displayError && <Alert severity="error">{errorMessage}</Alert>}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Update
                        </Button>

                    </form>
                </div>
            </Container>
        </div>
    )
}

export default InstanceUpdate