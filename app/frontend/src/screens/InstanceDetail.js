import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Link from '@material-ui/core/Link';

function InstanceDetail(props) {
    const [statusColor, setStatusColor] = useState("Green")

    console.log("InstanceDetail Screen")
    // const instanceList = useSelector(state => state.instanceList);
    // console.log("screen payload: ", instanceList)
    // const { loading, instances } = instanceList

    const dispatch = useDispatch();

    useEffect(() => {
        console.log("useEffect")
        //dispatch(listInstances());
    }, [])

    const instance =
    {
        hostname: "cdn",
        status: "Running",
        cpu: 1,
        ram: 1024,
    }

    return (
        <div className="content content-margined">
            <div className="instance-detail">
                <Table className="table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>CPU's</TableCell>
                            <TableCell>Memory</TableCell>
                            <TableCell>Description</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow key={instance.hostname}>
                            <TableCell>{instance.hostname}</TableCell>
                            <TableCell style={{ color: statusColor }}>{instance.status}</TableCell>
                            <TableCell>{instance.cpu}</TableCell>
                            <TableCell>{instance.ram}</TableCell>
                            <TableCell>None</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>

            </div>
        </div>
    )
}

export default InstanceDetail;