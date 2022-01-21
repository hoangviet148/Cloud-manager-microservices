import Paper from '@material-ui/core/Paper';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getInstanceByOwnerID } from '../actions/computeActions';
import {
    Chart,
    PieSeries,
    Title
} from '@devexpress/dx-react-chart-material-ui';

import PieChart, {
    Series,
    Label,
    Connector,
    Size,
    Export,
} from 'devextreme-react/pie-chart';


import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Cookie from 'js-cookie';

function Overview() {
    const userId = Cookie.getJSON('userInfo')?.userId
    let ramAvaiable = 0;
    let diskAvaiable = 0;
    let cpuAvaiable = 0;
    let instancesAvaiable = 0;

    const tier = Cookie.getJSON('tier')
    switch (tier) {
        case 'Basic':
            ramAvaiable = 32;
            diskAvaiable = 500
            cpuAvaiable = 8
            instancesAvaiable = 10
            break;
        case 'Pro':
            ramAvaiable = 128;
            diskAvaiable = 2000
            cpuAvaiable = 16
            instancesAvaiable = 30
            break;
        case 'Premium':
            ramAvaiable = 512;
            diskAvaiable = 5000
            cpuAvaiable = 32
            instancesAvaiable = 100
            break;
    }
    const dispatch = useDispatch();

    const InstanceByOwnerID = useSelector(state => state.getInstanceByOwnerID.instance?.instances);
    console.log("payload Overview: ", InstanceByOwnerID)

    let UsedRam = 0;
    InstanceByOwnerID?.forEach(item => {
        UsedRam += parseInt(item.ram)
    })

    let UsedDisk = 0;
    InstanceByOwnerID?.forEach(item => {
        UsedDisk += parseInt(item.disk)
    })

    let UsedCpu = 0;
    InstanceByOwnerID?.forEach(item => {
        UsedCpu += parseInt(item.cpu)
    })

    let UsedInstance = InstanceByOwnerID ? InstanceByOwnerID.length : 0

    let RamData = [
        { argument: 'used', value: UsedRam },
        { argument: 'avaiable', value: ramAvaiable - UsedRam }
    ]

    let DiskData = [
        { argument: 'used', value: UsedDisk },
        { argument: 'avaiable', value: diskAvaiable - UsedDisk }
    ]

    let CpuData = [
        { argument: 'used', value: UsedCpu },
        { argument: 'avaiable', value: cpuAvaiable - UsedCpu }
    ]

    let InstanceData = [
        { argument: 'used', value: UsedInstance },
        { argument: 'avaiable', value: instancesAvaiable - UsedInstance }
    ];

    console.log("payload Overview: ", UsedRam, ramAvaiable)
    useEffect(() => {
        console.log("useEffect")
        dispatch(getInstanceByOwnerID(userId));
    }, [])

    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Paper>
                        <PieChart
                                id="ram"
                                dataSource={RamData}
                                palette="Bright"
                                title="Ram Usage"
                            >
                                <Series
                                    argumentField="argument"
                                    valueField="value"
                                >
                                    <Label visible={true}>
                                        <Connector visible={true} width={1} />
                                    </Label>
                                </Series>
                                <Size width={500} />
                            </PieChart>
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper>
                        <PieChart
                                id="cpu"
                                dataSource={CpuData}
                                palette="Bright"
                                title="Cpu Usage"
                            >
                                <Series
                                    argumentField="argument"
                                    valueField="value"
                                >
                                    <Label visible={true}>
                                        <Connector visible={true} width={1} />
                                    </Label>
                                </Series>
                                <Size width={500} />
                            </PieChart>
                        </Paper>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Paper>
                            <PieChart
                                id="instance"
                                dataSource={DiskData}
                                palette="Bright"
                                title="Disk Usage"
                            >
                                <Series
                                    argumentField="argument"
                                    valueField="value"
                                >
                                    <Label visible={true}>
                                        <Connector visible={true} width={1} />
                                    </Label>
                                </Series>
                                <Size width={500} />
                            </PieChart>
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper>
                            <PieChart
                                id="instance"
                                dataSource={InstanceData}
                                palette="Bright"
                                title="Instances"
                            >
                                <Series
                                    argumentField="argument"
                                    valueField="value"
                                >
                                    <Label visible={true}>
                                        <Connector visible={true} width={1} />
                                    </Label>
                                </Series>
                                <Size width={500} />
                            </PieChart>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </div>
    )
}

export default Overview