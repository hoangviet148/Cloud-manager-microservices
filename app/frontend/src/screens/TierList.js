import React, { useEffect, useState } from 'react';
import Link from '@material-ui/core/Link';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { listTiers } from '../actions/tierActions';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { set } from 'js-cookie';

function TierList(props) {
    console.log("TierList Screen")
    //let [tiers, setTiers] = useState([])
    const tierList = useSelector(state => { 
        console.log(state.tierList)
        return state.tierList
    });
    const {loading, tiers2} = tierList
    console.log("payload: ", tiers2) 
    const dispatch = useDispatch();

    useEffect(() => {
        console.log("useEffect")
        dispatch(listTiers());
    }, [])
    const tiers = [
        {
            "name": "Basic",
            "cost": "20",
            "maxIOPerSec": "1000",
            "analytics": "false",
        }
    ]
    return (

        <div className="content content-margined">
            <div className="back-to-result">
                <Link href="../profile" style={{ cursor: 'pointer', textDecoration: 'none' }}>
                    <Grid container style={{ width: '15rem' }}>
                        <Grid item xs={2}><ArrowBackIcon /></Grid>
                        <Grid item xs={10}>Back to profile</Grid>
                    </Grid>
                </Link>
            </div>
            <div className="product-header">
                <Grid container>
                    <Grid item xs={8}>
                        <Typography component="h1" variant="h5">
                            Tier list
          </Typography>
                    </Grid>
                    <Grid item xs={4} style={{ paddingLeft: '12rem' }}>
                        <Link href="../product-create" style={{ color: '#203040', textDecoration: 'none' }}>
                            <Grid container>
                                <Grid item xs={1}><AddBoxIcon /></Grid>
                                <Grid item xs={4} style={{ paddingTop: '.1rem', fontSize: '1rem' }}>Add tier</Grid>
                            </Grid>
                        </Link>
                    </Grid>
                </Grid>
            </div>
            <div className="product-list">
                <Table className="table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Cost</TableCell>
                            <TableCell>MaxIOPerSec</TableCell>
                            <TableCell>Analytics</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tiers.map(tier => (<TableRow key={tier.id}>
                            <TableCell>{tier.id}</TableCell>
                            <TableCell>{tier.name}</TableCell>
                            <TableCell>{tier.cost}</TableCell>
                            <TableCell>{tier.maxIOPerSec}</TableCell>
                            <TableCell>{tier.analytics}</TableCell>
                            <TableCell>
                                {/* <Link onClick={() => (window.confirm('Are you sure you wish to delete this item?')) ? deleteHandler(tier) : {}} style={{ color: "#203040", cursor: 'pointer' }}><DeleteIcon /></Link> */}
                                <Link href={"../tier-update/" + tier._id} style={{ color: "#203040", cursor: 'pointer' }}><CreateIcon /></Link>
                            </TableCell>
                        </TableRow>))}
                    </TableBody>
                </Table>

            </div>
        </div>
    )
}

export default TierList;