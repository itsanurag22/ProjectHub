// @flow
import { Box, Container, Grid } from '@mui/material';
import axios from 'axios';
import * as React from 'react';
import cookie from 'react-cookies'
import SideBar from './sidebar';
import Title from './title';
import MemberCard from './membercard';




export function Members() {
    const mytoken = cookie.load("authtoken")
    const [membersData, setMembersData] = React.useState([])
    const drawerWidth = 240;

    async function MembersData() {
        axios.get('http://127.0.0.1:8200/tracker_app/users/', { headers: { "Content-Type": "application/json", "Authorization": `Token ${mytoken}` } })
            .then(response => {
                // console.log(response.data)
                setMembersData(response.data)



            })
            .catch(err => {

                // console.log(err);
            })
    }
    React.useEffect(() => {
        MembersData()
    }, [])



    return (
        <Box>
            <SideBar />
            <Title title="Members" />

            <Box sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}>
                <Container disableGutters>
                    <Box sx={{ pl: 2 }}>
                        <Grid container spacing={4} xs={12} sx={{ m: 0 }} >
                            {membersData.map(member => (
                                <Grid item xs={12} md={6} lg={3} key={member.id}>
                                    <MemberCard memberState={member} />

                                </Grid>

                            ))}
                        </Grid>
                    </Box>
                </Container>
            </Box>
        </Box>
    );
};