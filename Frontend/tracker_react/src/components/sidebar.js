import React from 'react'
import { Divider } from '@mui/material'
import Drawer from '@mui/material/Drawer'
import Typography from '@mui/material/Typography'
import { useNavigate, useLocation } from 'react-router-dom'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import { Box } from '@mui/system'
import ContentPasteSharp from '@mui/icons-material/ContentPasteSharp'
import cookie from 'react-cookies'



const drawerWidth = 240

export default function SideBar() {

  const classes = {
    page: {
      background: '#f9f9f9',
      width: '100%',

    },
    listitem: {
      '&:hover': {
        backgroundColor: '#FFFFFF',
      },
    },
    drawer: {
      width: drawerWidth,
    },
    drawerPaper: {
      width: drawerWidth,
      backgroundColor: "#DBE2EF"
    },
    active: {
      background: '#ffffff',
      '&:hover': {
        backgroundColor: '#ffffff',
      },
    },
    largeIcon: {
      width: 25,
      height: 25,
    },
  }

  const history = useNavigate()
  const location = useLocation()
  const user_id = cookie.load("userid")
  const menuItems = [

    {
      text: 'All Projects',

      path: '/projects'
    },
    {
      text: 'My Projects',

      path: '/myprojects'
    },
    {
      text: 'My Cards',

      path: '/mycards'
    },
    {
      text: 'My Profile',

      path: `/members/${user_id}/`
    },

    {
      text: 'Members',

      path: '/members'
    },
  ];


  return (
    <div style={{
      display: 'flex',
    }}>
      <Drawer
        sx={classes.drawer}
        variant="permanent"
        PaperProps={{
          sx: {
            width: drawerWidth,
            backgroundColor: "#DBE2EF",
          }
        }}
        anchor="left"
      >
        <Box mt={1.65} mb={1.65} ml={3} mr={3}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            justifyContent: 'space-between'
          }}>
            <ContentPasteSharp sx={classes.largeIcon} />
            <Typography variant="h5" >
              <strong>WorkTracker</strong>

            </Typography>
          </div>

        </Box>
        <Divider />
        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              onClick={() => history(item.path)}
              sx={location.pathname === item.path ? classes.active : classes.listitem}
            >
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  )
}