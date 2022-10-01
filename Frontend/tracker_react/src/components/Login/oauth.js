import React from "react";
import axios from "axios";
import cookie from 'react-cookies'
import { Navigate } from 'react-router-dom'
import Progress from '../progress'

class OAuth extends React.Component {
    constructor(props) {
        super(props)
        this.state = { isLoggedIn: false }
    }
    async componentDidMount() {
        const params = new URLSearchParams(window.location.search);
        const auth = params.get("code");

        axios.get('http://127.0.0.1:8200/tracker_app/token/?code=' + auth + '&state=state', { withCredentials: true })
            .then(response => {
                console.log(response)
                cookie.save('csrftoken', response.data['csrftoken'], { path: "/" })
                cookie.save('sessionid', response.data['sessionid'], { path: "/" })
                cookie.save('authtoken', response.data['authtoken'], { path: "/" })
                cookie.save('userid', response.data['userid'], { path: "/" })
                this.setState({ isLoggedIn: true })

            })
            .catch(err => {
                this.setState({ isLoggedIn: false })
                // console.log("error while authenticating");
            })



    }
    render() {
        if (this.state.isLoggedIn) {
            return <Navigate to='/projects' />
        }
        else {
            return <Progress />
        }
    }
}

export default OAuth;