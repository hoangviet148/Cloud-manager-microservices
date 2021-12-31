import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect } from 'react';
import { getAllNetworks, deleteNetworkByID, changeNetworkStatus } from '../actions/networkActions';
import Cookie from 'js-cookie';

function NetworkList(props) {
    const userID = Cookie.getJSON('userInfo')?.userId
    console.log("NetworkList Screen: ", userID)
    const dispatch = useDispatch();
    const res = useSelector(state => state.AllNetworks)
    const deleteStatusMessage = useSelector(state => state.deleteNetworkByID)
    const changeNetworkStatusMessage = useSelector(state => state.changeNetworkStatus)
    const {networks} = res;
    console.log("networks: ", networks?.networks)

    const enableHandle = (id) => {
        console.log("enablehandle")
        dispatch(changeNetworkStatus(id));
    }

    const deleteHandle = (id) => {
        console.log("deleteHandle")
        dispatch(deleteNetworkByID(id));
    }

    useEffect(() => {
        console.log("useEffect")
        dispatch(getAllNetworks());
    }, [deleteStatusMessage, changeNetworkStatusMessage])

    return (
        <div>
            <div className="product-header">
                <Grid container>
                    <Grid item xs={8}>
                        <Typography component="h1" variant="h5">
                            Networks
                        </Typography>
                    </Grid>
                    <Grid item xs={4} style={{ paddingLeft: '12rem' }}>
                        <Link href="../instance-create" >
                            <Grid container>
                                <Button variant="contained" color="primary">
                                    New Network
                                </Button>
                            </Grid>
                        </Link>
                    </Grid>
                </Grid>
            </div>
            <div style={{ width: '100%' }}>
                {networks?.networks?.map(network => (<Card key={network.id}>
                    <CardHeader title={network.name} />
                    <CardContent>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>IPv4 Forwarding</Grid>
                            <Grid item xs={6}>{network.ip_forward}</Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>Network</Grid>
                            <Grid item xs={6}>{network.IPv4}</Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>DHCP</Grid>
                            <Grid item xs={6}>ON</Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>Start</Grid>
                            <Grid item xs={6}>192.168.1.2</Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>End</Grid>
                            <Grid item xs={6}>192.168.1.254</Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>Status</Grid>
                            <Grid style={{ color: network.status === "active" ? "green" : "red" }} item xs={6}>{network.status}</Grid>
                        </Grid>
                        <Grid container spacing={1} >
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => enableHandle(network.id)}
                            >
                                {network.status === "active" ? "Disble" : "Enable"}
                            </Button>
                            &nbsp;
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => (window.confirm('Are you sure you wish to delete this item?')) ? deleteHandle(network.id) : {}}
                            >
                                Delete
                            </Button>
                        </Grid>
                    </CardContent>
                </Card>))}
            </div>
        </div>

    );
}

export default NetworkList;