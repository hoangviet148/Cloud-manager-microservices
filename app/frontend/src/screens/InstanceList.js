import React, { useEffect, useState } from 'react';
import Link from '@material-ui/core/Link';
import { useSelector, useDispatch } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import SettingsNewIcon from '@material-ui/icons/Settings';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { listInstances, changeInstanceStatus, deleteInstance } from '../actions/computeActions';
import Cookie from 'js-cookie';

function InstanceList(props) {
    const userID = Cookie.getJSON('userInfo')?.userId
    console.log("InstanceList Screen: ", userID)
    const instanceList = useSelector(state => state.instanceList);
    const changeInstanceStatusMessage = useSelector(state => state.changeInstanceStatus);
    const deleteInstanceMessage = useSelector(state => state.deleteInstance)
    console.log("screen payload: ", instanceList, changeInstanceStatusMessage, deleteInstanceMessage)
    const { loading, instances } = instanceList
    const { message: messageChangeStatus, error: errorChangeStatus } = changeInstanceStatusMessage
    const dispatch = useDispatch();

    useEffect(() => {
        console.log("useEffect")
        dispatch(listInstances());
    }, [messageChangeStatus, deleteInstanceMessage.message])

    const powerHandle = (id, status) => {
        console.log("powerHandle")
        dispatch(changeInstanceStatus(id, status));
    }

    const deleteHandle = (id) => {
        console.log("powerHandle")
        dispatch(deleteInstance(id));
    }

    const settingHandle = (id) => {
        console.log("settinghandle: ", id, props)
        window.location.href = `http://localhost:3000/instance-update/${id}`
    }

    return (
        <div className="content content-margined">
            <div className="product-header">
                <Grid container>
                    <Grid item xs={8}>
                        <Typography component="h1" variant="h5">
                            Instances
                        </Typography>
                    </Grid>
                    <Grid item xs={4} style={{ paddingLeft: '12rem' }}>
                        <Link href="../instance-create" >
                            <Grid container>
                                <Button variant="contained" color="primary">
                                    New Instance
                                </Button>
                            </Grid>
                        </Link>
                    </Grid>
                </Grid>
            </div>
            <div className="product-list">
                <Table className="table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>CPU's</TableCell>
                            <TableCell>Memory</TableCell>
                            <TableCell>Storage</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {instances?.length && instances?.filter(instance => instance.ownerID == userID).map(instance => (<TableRow key={instance.hostname}>
                            <TableCell><Link href={`/instance/${instance._id}`}>{instance.hostname}</Link></TableCell>
                            <TableCell style={{ color: instance.status === "running" ? "green" : "red" }}>{instance.status}</TableCell>
                            <TableCell>{instance.cpu}</TableCell>
                            <TableCell>{instance.ram} GB</TableCell>
                            <TableCell>{instance.disk} GB</TableCell>
                            <TableCell>
                                <IconButton>
                                    <PowerSettingsNewIcon onClick={() => powerHandle(instance._id, instance.status === "running" ? "stopped" : "running")} />
                                </IconButton>
                                <IconButton>
                                    <DeleteIcon onClick={() => (window.confirm('Are you sure you wish to delete this item?')) ? deleteHandle(instance._id) : {}} />
                                </IconButton>
                                <IconButton>
                                    <SettingsNewIcon onClick={() => settingHandle(instance._id)} />
                                </IconButton>
                            </TableCell>
                        </TableRow>))}
                    </TableBody>
                </Table>

            </div>
        </div>
    )
}

export default InstanceList;