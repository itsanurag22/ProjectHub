import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, Divider, Grid, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router';
import { grey } from '@mui/material/colors';




const MemberCard = (props) => {
    const member = props.memberState
    const history = useNavigate();
    const letter = member.fullname.split(" ")
    const classes = {
        avatar: {
            backgroundColor: grey[600]
            
        }
    }


    return (
        <Box>
            <Card sx={{ minWidth: 250 }} variant="outlined" key={member.id}>

                <CardContent>
                    <Grid container justifyContent="flex-end">
                        <Avatar sx={classes.avatar}>{letter[0].charAt(0).toUpperCase()}</Avatar>
                        <Grid item xs />
                        {member.admin_check ? <Box sx={{ fontWeight: 'bold', color: '#FF9A3C' }}> Admin</Box> :
                            [(member.banned ? <Box sx={{ fontWeight: 'bold', color: '#D72323' }}>Restricted</Box> : <Box sx={{ fontWeight: 'bold', color: '#1FAB89' }}>Normal User</Box>)]}

                    </Grid>
                    <br />
                    <Typography gutterBottom><Box sx={{ fontWeight: 'bold' }}  >Username:</Box>
                        {member.username}
                    </Typography>
                    <Typography gutterBottom><Box sx={{ fontWeight: 'bold' }} mt={1} >Fullname:</Box>
                        {member.fullname}
                    </Typography>

                </CardContent>
                <CardActions >
                    <Button
                        variant="contained"
                        style={{ backgroundColor: '#3F72AF', color: '#F9F7F7' }}
                        disableElevation
                        onClick={(e) => {
                            e.preventDefault();

                            history(`/members/${member.id}/`)
                        }}
                    >User details</Button>
                </CardActions>
            </Card>
        </Box>
    );
}

export default MemberCard;