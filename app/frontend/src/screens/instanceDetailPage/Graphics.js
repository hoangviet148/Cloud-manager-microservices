import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from 'recharts';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const cpuData = [
    {
        uv: 100,
    },
    {
        uv: 50,
    },
    {
        uv: 60,
    },
    {
        uv: 20,
    },
    {
        uv: 25,
    },
    {
        uv: 45,
    },
    {
        uv: 40,
    }
];

const banwidthData = [
    {
        uv: 0.01,
    },
    {
        uv: 0.0075,
    },
    {
        uv: 0.005,
    },
    {
        uv: 0.0025,
    },
    {
        uv: 0.0034,
    },
    {
        uv: 0.0056,
    },
    {
        uv: 0.004,
    }
];

const ramData = [
    {
        uv: 8,
    },
    {
        uv: 0.5,
    },
    {
        uv: 1,
    },
    {
        uv: 5,
    },
    {
        uv: 2,
    },
    {
        uv: 3,
    },
    {
        uv: 2.5,
    }
];

function Graphics(props) {
    return (
        <Grid container >
            <Grid item xs={4}>
                <Typography variant="h6">CPU Usage</Typography>
                <AreaChart
                    width={400}
                    height={320}
                    data={cpuData}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
                </AreaChart>
            </Grid>

            <Grid item xs={4}>
                <Typography variant="h6">Bandwidth</Typography>
                <AreaChart
                    width={400}
                    height={320}
                    data={banwidthData}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area unit="Kg" type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
                </AreaChart>
            </Grid>
            <Grid item xs={4}>
                <Typography variant="h6">Ram Usage</Typography>
                <AreaChart
                    width={400}
                    height={320}
                    data={ramData}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="G" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d0" />
                </AreaChart>
            </Grid>
        </Grid>
    )
}
export default Graphics;