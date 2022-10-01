import React from 'react';
import { Grid, Button } from '@mui/material';




function Login() {
    const handleClick = (e) => {
        e.preventDefault();
        window.location.href = "https://channeli.in/oauth/authorise/?client_id=INhtorJkF0OWireWXlzYgdEo4oly2WLBLtYuvABI&redirect_uri=http://localhost:3000/oauth";

    }
    return (
        <>
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                style={{ minHeight: '100vh' }}
            >

                <Grid item xs={3}>
                    <Button variant="contained" style={{ backgroundColor: '#3F72AF', color: '#F9F7F7' }} onClick={handleClick}>
                        Sign In with Channel-I
                    </Button>
                </Grid>

            </Grid>
        </>

    );
}
export default Login;
