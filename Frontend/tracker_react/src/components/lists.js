// @flow
import { Button, Box, Card, CardActions, CardContent, CardHeader, Divider, Grid, TextField, Typography } from '@mui/material';
import axios from 'axios';
import * as React from 'react';
import cookie from 'react-cookies';
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import SideBar from './sidebar';
import Title from './title';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


export function Lists() {
    const { p_id } = useParams()
    const mytoken = cookie.load("authtoken")
    const [lists, setLists] = React.useState([])
    const drawerWidth = 240;
    const history = useNavigate();
    const [createList, setCreateList] = React.useState(false)
    const [createErr, setCreateErr] = React.useState(false)
    const [name, setName] = React.useState('')
    const projid = p_id;
    const handleNameChange = (e) => {

        setName(e.target.value)
        setCreateErr(false)
    }
    const handleFormSubmit = (e) => {
        e.preventDefault()
        console.log(name)
        const data = {
            "name": name,
            "parent_project": projid

        }
        axios.post(`http://127.0.0.1:8200/tracker_app/projects/${projid}/lists/`, data, { headers: { "Content-Type": "application/json", "Authorization": `Token ${mytoken}` } })
            .then(response => {
                console.log("nacho bc")
                history(0);

            })
            .catch(err => {
                if (err.response.status === 403) {
                    setCreateErr(true)
                    console.log("Restricted")
                }

                console.log(err);
            })

    }
    const handleCreateList = (e) => {
        e.preventDefault()
        createList ? setCreateList(false) : setCreateList(true)

    }



    async function ListsGet() {
        axios.get(`http://127.0.0.1:8200/tracker_app/projects/${p_id}/lists/`, { headers: { "Content-Type": "application/json", "Authorization": `Token ${mytoken}` } })
            .then(response => {
                // console.log(response.data);
                setLists(response.data);






            })
            .catch(err => {

                // console.log(err);
            })
    }
    React.useEffect(() => {
        ListsGet();

    }, [])


    return (
        <Box>
            <SideBar />
            <Title title="Project Lists" />
            <Box mb={2} mr={3} sx={{ ml: `${drawerWidth}px` }}>
                <Grid container justifyContent="flex-end" spacing={2}>
                    <Grid item pl={5}>
                        <Button
                            variant="outlined"
                            startIcon={<ArrowBackIcon />}
                            onClick={(e) => {
                                e.preventDefault();

                                history(`/projects/${p_id}/`)
                            }}
                        >
                            Parent project
                        </Button>
                    </Grid>
                    <Grid item xs />
                    <Grid item>
                        <Button
                            variant="contained"
                            style={{ backgroundColor: '#3F72AF', color: '#F9F7F7' }}
                            startIcon={createList ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                            disableElevation
                            onClick={handleCreateList}
                        >
                            Create a list
                        </Button>
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
            >
                {createErr ? <Box sx={{ fontWeight: 'bold', color: '#D72323' }}>* Not Allowed! Only admin and project members can create a list</Box> : <Box></Box>}
                {createList ?

                    <Box sx={{ width: '50%', p: 2, border: 1, borderRadius: 2, mb: 4 }} >
                        <Typography variant="h5" gutterBottom>Create a  List</Typography>
                        <Divider />

                        <form onSubmit={handleFormSubmit}>
                            <Box sx={{ fontWeight: 'bold' }} mt={2} mb={2} >
                                List Name :
                            </Box>
                            <Box mb={2}>
                                <TextField
                                    label="Name"
                                    variant="outlined"
                                    fullWidth
                                    required
                                    value={name}
                                    onChange={handleNameChange}
                                />
                            </Box>


                            <Button
                                variant="contained"
                                style={{ backgroundColor: '#3F72AF', color: '#F9F7F7' }}
                                startIcon={<AddCircleOutlineIcon />}
                                disableElevation
                                type="submit"
                            >
                                Create
                            </Button>
                        </form>
                    </Box>

                    :
                    null
                }

                <Box sx={{ width: '50%', mt: 2, border: 1, p: 2, borderRadius: 2 }}>
                    <Typography variant="h5" gutterBottom>Lists</Typography>
                    <Divider />
                    {lists.length > 0 ?
                        lists.map(list => (
                            <Box sx={{ mt: 2 }}>
                                <Card variant="outlined" >
                                    <CardHeader title={`${list.name}`} />
                                    <CardActions >
                                        <Button
                                            variant="contained"
                                            style={{ backgroundColor: '#3F72AF', color: '#F9F7F7' }}
                                            disableElevation
                                            onClick={(e) => {
                                                e.preventDefault();

                                                history(`/projects/${p_id}/lists/${list.id}`)
                                            }}
                                        >
                                            List Details
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Box>

                        )) : <p>No lists to show</p>}

                </Box>
            </Box>

        </Box>
    );
};