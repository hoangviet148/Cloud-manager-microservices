import React, { useEffect } from 'react';
import Link from '@material-ui/core/Link';
import { useSelector, useDispatch } from 'react-redux';
import { listTiers } from '../actions/tierActions';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

function TierList(props) {
    console.log("TierList Screen")
    const tierList = useSelector(state => state.tierList);
    console.log("payload: ", tierList)
    const { loading, tiers } = tierList

    console.log("payload: ", tiers)
    const dispatch = useDispatch();

    useEffect(() => {
        console.log("useEffect")
        dispatch(listTiers());
    }, [])

    // delete tier
    const deleteHandler = (tier) => {
        //dispatch(deleteProduct(tier._id));
    }

    return (

        <div className="content content-margined">
            <div className="product-header">
                <Grid container>
                    <Grid item xs={8}>
                        <Typography component="h1" variant="h5">
                            Tier list
                        </Typography>
                    </Grid>
                    <Grid item xs={4} style={{ paddingLeft: '12rem' }}>
                        <Link href="../tier-create" >
                            <Grid container>
                                <Button variant="contained" color="primary">
                                    New Tier
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
                            <TableCell>Cost</TableCell>
                            <TableCell>Analytics</TableCell>
                            <TableCell>Users</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tiers?.length && tiers?.map(tier => (<TableRow key={tier.id}>
                            <TableCell><Link href={`/tier/${tier.name}`}>{tier.name}</Link></TableCell>
                            <TableCell>{tier.cost}</TableCell>
                            <TableCell>{tier.analytics.toString()}</TableCell>
                            <TableCell>{tier.users !== undefined ? tier.users.length : 0}</TableCell>
                            <TableCell>
                                <Link onClick={() => (window.confirm('Are you sure you wish to delete this item?')) ? deleteHandler(tier) : {}} style={{ color: "#203040", cursor: 'pointer' }}><DeleteIcon /></Link>
                                <Link href={"../tier-update/" + tier.id} style={{ color: "#203040", cursor: 'pointer' }}><CreateIcon /></Link>
                            </TableCell>
                        </TableRow>))}
                    </TableBody>
                </Table>

            </div>
        </div>
    )
}

export default TierList;