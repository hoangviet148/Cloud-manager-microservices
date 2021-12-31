import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUsersByTier, changeUserStatus, deleteUserByID } from '../actions/userActions';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import ToggleOnIcon from '@material-ui/icons/ToggleOn';
import ToggleOffIcon from '@material-ui/icons/ToggleOff';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

function TierDetail(props) {
    console.log("TierDetail Screen")
    const res = useSelector(state => state.getUsersByTier);
    const userStatus = useSelector(state => state.changeUserStatus);
    const userDelete = useSelector(state => state.deleteUserByID);
    const users = res.users
    console.log("tier detail payload: ", users, userStatus, userDelete)

    const dispatch = useDispatch();

    useEffect(() => {
        console.log("useEffect")
        dispatch(getUsersByTier(props.match.params.tier));
    }, [userStatus, userDelete])

    // delete user
    const deleteHandler = (id) => {
        dispatch(deleteUserByID(props.match.params.tier, id));
    }

    const toggleHandle = (id) => {
        console.log("togglehandle: ", id)
        dispatch(changeUserStatus(id));
        console.log("user status: ", userStatus)
    }

    return (

        <div className="content content-margined">
            <div className="product-header">
                <Grid container>
                    <Grid item xs={8}>
                        <Typography component="h1" variant="h5">
                            User list
                        </Typography>
                    </Grid>
                    {/* <Grid item xs={4} style={{ paddingLeft: '12rem' }}>
                        <Link href="../instance-create" >
                            <Grid container>
                                <Button variant="contained" color="primary">
                                    New Tier
                                </Button>
                            </Grid>
                        </Link>
                    </Grid> */}
                </Grid>
            </div>
            <div className="product-list">
                <Table className="table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Payment</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users?.length && users?.map(user => (<TableRow key={user.id}>
                            <TableCell>{user.username}</TableCell>
                            <TableCell>{user.phone}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.payment}</TableCell>
                            <TableCell style={{ color: user.status === "enable" ? "green" : "red" }}>{user.status}</TableCell>
                            <TableCell>
                                <IconButton>
                                    <SearchIcon></SearchIcon>
                                </IconButton>
                                <IconButton>
                                    <DeleteIcon onClick={() => (window.confirm('Are you sure you wish to delete this item?')) ? deleteHandler(user.id) : {}} />
                                </IconButton>
                                <IconButton onClick={() => toggleHandle(user.id)}>
                                    {user?.status === "enable" ? <ToggleOnIcon /> : <ToggleOffIcon />}
                                </IconButton>
                            </TableCell>
                        </TableRow>))}
                    </TableBody>
                </Table>

            </div>
        </div>
    )
}

export default TierDetail;