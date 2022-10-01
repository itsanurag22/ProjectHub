import { Button, Box, Card, CardActions, CardContent, CardHeader, Divider, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router';

const ProjectCard = (props) => {
    const project = props.projState;
    // const users = props.userState;
    const history = useNavigate();


    return (
        <Box>
            <Card sx={{ minWidth: 250 }} variant="outlined" key={project.id}>
                <CardHeader title={project.name} />
                <Divider />
                <CardContent>
                    <Typography gutterBottom>
                        <Box sx={{ fontWeight: 'bold' }} mt={1} >Description:</Box>
                    </Typography>
                    <div>
                        <Typography sx={{ fontSize: 14 }} noWrap dangerouslySetInnerHTML={{ __html: project.description }}>
                        </Typography>
                    </div>
                    <Typography gutterBottom>
                        <Box sx={{ fontWeight: 'bold' }} mt={1} >Created By:</Box>
                        {project.creator.fullname}
                    </Typography>

                </CardContent>
                <CardActions >
                    <Button
                        variant="contained"
                        style={{ backgroundColor: '#3F72AF', color: '#F9F7F7' }}
                        disableElevation
                        onClick={(e) => {
                            e.preventDefault();

                            history(`/projects/${project.id}/`)
                        }}
                    >
                        Open
                    </Button>
                </CardActions>
            </Card>
        </Box>
    );
}

export default ProjectCard;