import React, { useState } from 'react';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useSelector, useDispatch } from 'react-redux';
import { createTier } from '../actions/tierActions';
import { Grid } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
// import Input from '@material-ui/core/Input';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

function TierCreateForm(props) {
    const [name, setName] = useState('');
    const [cost, setCost] = useState('');
    const [analytics, setAnalytics] = useState('');
    const [description, setDescription] = useState('');
    const dispatch = useDispatch();

    const classes = useStyles();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(createTier({ name, cost, analytics, description }))
        props.history.push("/tier");
    }

    return (
        <div className="content content-margined">
            <div className="back-to-result">
                <Link href="../tiers" style={{ cursor: 'pointer', textDecoration: 'none' }}>
                    <Grid container style={{ width: '15rem' }}>
                        <Grid item xs={2}><ArrowBackIcon /></Grid>
                        <Grid item xs={10}>Back to Tier list</Grid>
                    </Grid>
                </Link>
            </div>
            <Container component="main" style={{ width: '40rem' }}>
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Create Tier
          </Typography>
                    <form className={classes.form} onSubmit={submitHandler}>
                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    label="Name"
                                    name="name"
                                    //id="name"
                                    //autoComplete="name"
                                    autoFocus
                                // onChange={(e) => setName(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    label="Cost"
                                    name="price"
                                    id="price"
                                    type="number"
                                    min="1"
                                    autoComplete="price"
                                    autoFocus
                                // onChange={(e) => setPrice(e.target.value)}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                                <FormControl variant="outlined" style={{ width: '100%', marginTop: '2rem' }} margin="normal">
                                    <InputLabel id="category">Analytics</InputLabel>
                                    <Select
                                        id="category"
                                        label="category"
                                    // onChange={(e) => setCategory(e.target.value)}
                                    >
                                        <MenuItem value={"True"}>True</MenuItem>
                                        <MenuItem value={"False"}>False</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>



                        <TextField
                            variant="outlined"
                            style={{ marginTop: '2rem' }}
                            required
                            fullWidth
                            id="description"
                            label="Description"
                            name="description"
                            autoComplete="description"
                            autoFocus
                        // onChange={(e) => setDescription(e.target.value)}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Create
              </Button>

                    </form>
                </div>
            </Container>
        </div>
    )
}

export default TierCreateForm