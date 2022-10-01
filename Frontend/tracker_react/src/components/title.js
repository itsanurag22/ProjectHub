import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import cookie from 'react-cookies'
import axios from "axios";
import { useNavigate } from 'react-router-dom';


export default function Title(props) {
  const history = useNavigate()
  const [isLogIn, setLogIn] = React.useState(false)
  const mytoken = cookie.load("authtoken")

    const drawerWidth = 240;
    const logOut = () =>{
      
      axios.get('http://127.0.0.1:8200/tracker_app/logout',  {headers:{"Content-Type": "application/json", "Authorization": `Token ${mytoken}`}})
      .then(response => {
          console.log(response)
          cookie.remove('csrftoken', { path: '/' })
          cookie.remove('sessionid', { path: '/' })
          cookie.remove('authtoken', { path: '/' })
          cookie.remove('userid', { path: '/' })
          history('/')
          
          
      })
      .catch(err => {
          
          // console.log(err);
      })
  }
  async function CheckLogin(){
      
    axios.get('http://127.0.0.1:8200/tracker_app/checklogin/', {headers:{"Content-Type": "application/json", "Authorization": `Token ${mytoken}`}} )
    .then(response => {
        // console.log(response)
        setLogIn(true);
         
        
        
    })
    .catch(err => {
        
        // console.log(err);
        setLogIn(false);
        history("/")

    })
}
React.useEffect(()=>{
  CheckLogin();
  
}, [])

  return (
    <Box sx={{ flexGrow: 1 }} mb={2}>
      <AppBar style={{ background: '#112D4E' }} position="static" sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}>
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1, textAlign: 'center', color:'#ffffff' }}>
            {props.title}
          </Typography>
          <Button  style={{ color: '#FFFFFF', }} onClick={()=>{logOut()}}>
            Logout
          </Button>
          
        </Toolbar>
      </AppBar>
    </Box>
  );
}

