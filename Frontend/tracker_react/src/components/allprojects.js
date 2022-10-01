// @flow
import { Button, Container, Grid, Box } from '@mui/material';
import axios from 'axios';
import * as React from 'react';
import cookie from 'react-cookies'
import ProjectCard from './projectcard';
import SideBar from './sidebar';
import Title from './title';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Link } from 'react-router-dom'




export function AllProjects() {
    const mytoken = cookie.load("authtoken")
    const [projData, setProjData] = React.useState([])
    const drawerWidth = 240;

    async function AllProjectData() {
        axios.get('http://127.0.0.1:8200/tracker_app/projects/', { headers: { "Content-Type": "application/json", "Authorization": `Token ${mytoken}` } })
            .then(response => {
                // console.log(response.data)
                setProjData(response.data)
            })
            .catch(err => {
                console.log(err);
            })
    }

    React.useEffect(() => {
        AllProjectData();
    }, [])



    return (
        <Box>
            <SideBar />
            <Title title="All Projects" />
            <Box mb={2} mr={3}>
                <Grid container justifyContent="flex-end">
                    <Link
                        style={{ textDecoration: 'none' }}
                        to="/createproject">
                        <Button
                            variant="contained"
                            style={{ backgroundColor: '#3F72AF', color: '#F9F7F7' }}
                            startIcon={<AddCircleOutlineIcon />}
                            disableElevation>
                            Create a project
                        </Button>
                    </Link>
                </Grid>
            </Box>
            <Box sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}>
                <Container disableGutters>
                    <Box sx={{ pl: 2 }}>
                        <Grid container spacing={4} xs={12} sx={{ m: 0 }} >
                            {projData.map(proj => (
                                <Grid item xs={12} md={6} lg={4} key={proj.id}>
                                    <ProjectCard projState={proj} />

                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </Container>
            </Box>
        </Box>
    );
};