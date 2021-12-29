import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';

function NetworkList(props) {
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
                <Box
                    component="span"
                    sx={{
                        display: 'block',
                        p: 1,
                        m: 1,
                        bgcolor: 'background.paper',
                    }}
                >
                    IPv4 Forwarding NAT
                    <br />
                    Network
                    <br />
                    DHCP
                    <br />
                    Start
                    <br />
                    End
                </Box>
                <Box
                    component="span"
                    sx={{
                        display: 'block',
                        p: 1,
                        m: 1,
                        bgcolor: 'background.paper',
                    }}
                >
                    IPv4 Forwarding NAT
                    <br />
                    Network
                    <br />
                    DHCP
                    <br />
                    Start
                    <br />
                    End
            </Box>
            </div>
        </div>

    );
}

export default NetworkList;