// @flow
import { Box, Container, Grid, Typography } from '@mui/material';
import axios from 'axios';
import * as React from 'react';
import cookie from 'react-cookies'
import ProjectCard from './projectcard';
import SideBar from './sidebar';
import Title from './title';




export function MyProjects() {
    const mytoken = cookie.load("authtoken")
    const [projData, setProjData] = React.useState([])
    const drawerWidth = 240;

    async function MyProjectData() {
        axios.get('http://127.0.0.1:8200/tracker_app/user_projects/', { headers: { "Content-Type": "application/json", "Authorization": `Token ${mytoken}` } })
            .then(response => {
                // console.log(response.data)
                setProjData(response.data)



            })
            .catch(err => {

                // console.log(err);
            })
    }
    React.useEffect(() => {
        MyProjectData()
    }, [])



    return (
        <Box>
            <SideBar />
            <Title title="My Projects" />

            <Box sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}>
                <Container disableGutters>
                    <Box sx={{ pl: 2 }}>
                        <Grid container spacing={4} xs={12} sx={{ m: 0 }} >
                            {projData.length > 0 ?
                                projData.map(proj => (
                                    <Grid item xs={12} md={6} lg={4} key={proj.id}>
                                        <ProjectCard projState={proj} />

                                    </Grid>


                                ))
                                : <Box sx={{ m: 2 }}><Typography>You are not a part of any projects.</Typography></Box>}
                        </Grid>
                    </Box>
                </Container>
            </Box>
        </Box>
    );
};