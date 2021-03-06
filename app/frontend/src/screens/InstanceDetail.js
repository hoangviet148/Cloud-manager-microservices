import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import InsertChartIcon from '@material-ui/icons/InsertChart';
import SettingsNewIcon from '@material-ui/icons/Settings';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import DeleteIcon from '@material-ui/icons/Delete';
import Graphics from './instanceDetailPage/Graphics'
import { makeStyles } from '@material-ui/core/styles';
import { getInstanceByID } from '../actions/computeActions';

const useStyles = makeStyles({
    indicator: {
      background: "none"
    },
    tabs: {
      "&": {
        border: "3px solid blue"
      }
    }
  });

function InstanceDetail(props) {
    const classes = useStyles();
    console.log("InstanceDetail Screen")
    const [value, setValue] = useState(3);
    const res = useSelector(state => state.InstanceByID);
    console.log("screen payload: ", res.instance)
    const instance = res.instance

    const dispatch = useDispatch();

    useEffect(() => {
        console.log("useEffect")
        console.log("props: ", props)
        dispatch(getInstanceByID(props.match.params.id));
    }, [])

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className="row">
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
                        <TableRow key={instance?.hostname}>
                            <TableCell>{instance?.hostname}</TableCell>
                            <TableCell style={{ color: instance?.status === "running" ? "green" : "red" }}>{instance?.status}</TableCell>
                            <TableCell>{instance?.cpu}</TableCell>
                            <TableCell>{instance?.ram}</TableCell>
                            <TableCell>None</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
            <br></br>
            <div>
                <Tabs centered="true" value={value} onChange={handleChange} aria-label="icon label tabs example">
                    <Tab icon={<PowerSettingsNewIcon />} label="Power" />
                    <Tab icon={<BusinessCenterIcon />} label="Access" />
                    <Tab icon={<CameraAltIcon />} label="Snapshots" />
                    <Tab icon={<InsertChartIcon />} label="Graphics" />
                    <Tab icon={<SettingsNewIcon />} label="Settings" />
                    <Tab icon={<CloudDownloadIcon />} label="Migrate" />
                    <Tab icon={<DeleteIcon />} label="Destroy" />
                </Tabs>
                <br></br>
                <br></br>
                {value == 3 ? <Graphics /> : null}
                
            </div>

        </div>
    )
}

export default InstanceDetail;