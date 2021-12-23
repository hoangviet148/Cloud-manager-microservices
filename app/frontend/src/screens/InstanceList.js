import React, { useEffect, useState } from 'react';
import Link from '@material-ui/core/Link';
import { useSelector, useDispatch } from 'react-redux';
import { listInstances, changeInstanceStatus } from '../actions/computeActions';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import DeleteIcon from '@material-ui/icons/Delete';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import SettingsNewIcon from '@material-ui/icons/Settings';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

function InstanceList(props) {
    const [status, setStatus] = useState(true)

    console.log("InstanceList Screen")
    const instanceList = useSelector(state => state.instanceList);
    const changeInstanceStatusMessage = useSelector(state => state.changeInstanceStatus);
    console.log("screen payload: ", instanceList, changeInstanceStatusMessage)
    const { loading, instances } = instanceList
    const { message: messageChangeStatus, error: errorChangeStatus } = changeInstanceStatusMessage
    const dispatch = useDispatch();

    useEffect(() => {
        console.log("useEffect")
        dispatch(listInstances());
    }, [messageChangeStatus])

    const powerHandle = (id, status) => {
        console.log("powerHandle")
        dispatch(changeInstanceStatus(id, status));
        //setStatus(!status)
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
                        <Link href="../tier-create" >
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
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {instances?.length && instances?.map(instance => (<TableRow key={instance.hostname}>
                            <TableCell><Link href={`/instance/${instance.id}`}>{instance.hostname}</Link></TableCell>
                            <TableCell style={{ color: instance.status === "running" ? "green" : "red" }}>{instance.status}</TableCell>
                            <TableCell>{instance.cpu}</TableCell>
                            <TableCell>{instance.ram}</TableCell>
                            <TableCell>
                                <PowerSettingsNewIcon onClick={() => powerHandle(instance._id, instance.status === "running" ? "stopped" : "running")} />
                                <PlayArrowIcon />
                                <DeleteIcon />
                                <SettingsNewIcon />
                            </TableCell>
                        </TableRow>))}
                    </TableBody>
                </Table>

            </div>
        </div>
    )
}

export default InstanceList;