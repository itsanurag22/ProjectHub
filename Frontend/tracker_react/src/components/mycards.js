// @flow
import { Box, Container, Grid, Typography } from '@mui/material';
import axios from 'axios';
import * as React from 'react';
import cookie from 'react-cookies'
import SideBar from './sidebar';
import CardShow from './cardshow';
import Title from './title';




export function MyCards() {
    const mytoken = cookie.load("authtoken")
    const [cardData, setCardData] = React.useState([])
    const drawerWidth = 240;

    async function MyCardData() {
        axios.get('http://127.0.0.1:8200/tracker_app/user_cards/', { headers: { "Content-Type": "application/json", "Authorization": `Token ${mytoken}` } })
            .then(response => {
                // console.log(response.data)
                setCardData(response.data)
            })
            .catch(err => {

                // console.log(err);
            })
    }
    React.useEffect(() => {
        MyCardData()
    }, [])



    return (
        <Box>
            <SideBar />
            <Title title="My Cards" />
            <Box sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}>
                <Container disableGutters>
                    <Box sx={{ pl: 2 }}>
                        <Grid container spacing={4} xs={12} sx={{ m: 0 }} >
                            {cardData.length > 0 ?
                                cardData.map(card => (
                                    <Grid item xs={12} md={6} lg={4} key={card.id}>
                                        <CardShow cardState={card} />

                                    </Grid>


                                ))
                                : <Box sx={{ m: 2 }}><Typography>No Cards assigned to you</Typography></Box>}
                        </Grid>
                    </Box>
                </Container>
            </Box>
        </Box>
    );
};