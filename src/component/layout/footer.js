import React, { Component } from 'react';
import Image from '../images/Soul.png';

// materia-ui components
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/styles/withStyles';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import { ListSubheader , ListItem , ListItemText } from '@material-ui/core';
import Copyright from '@material-ui/icons/Copyright';


const styles = theme => ({
    ...theme.spreadThis,
    divider:{
        display:'block',
        backgroundColor:theme.palette.secondary.main,
        width:'80%',
        [theme.breakpoints.up('sm')]:{
            display:'none',
        }
    },
    footer:{
        padding:theme.spacing(2),
        [theme.breakpoints.down('sm')]:{
            padding:0
        },
        backgroundColor:'#cfd8dc',
        display:'flex',
        flexDirection:'column',
        justifyContent:'center'
        
    },
    firstItem:{
        display:'flex',
        [theme.breakpoints.up('sm')]:{
            flexDirection:'row',
            justifyContent:'space-evenly'
        },
        [theme.breakpoints.down('sm')]:{
            flexDirection:'column',
            alignItems:'center'
        }
    },
    cardDiv:{
        padding:theme.spacing(4),
    },
    card:{
        borderRadius:10,
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        // border:'1px solid red'
        padding:theme.spacing(4),
        boxShadow:'0 0 5px white'
    },
    CardImage:{
        padding:theme.spacing(1),
        height:200,
        width:200,
        borderRadius:'50%',
        transition:'0.3s ease-in-out',
        "&:hover":{
            boxShadow:'0 0 1rem #455a64'
        }
    },
    cardContent:{
        marginTop:theme.spacing(2),
        textAlign:'center'
    },
    ListDiv:{
        // margin:'0 200px'
    },
    secondItem:{
        // justifyContent:'center'
        padding:theme.spacing(2)
    },
    copyrightSection:{
        display:'flex',
        alignItems:'center',
        justifyContent:'center'
    },
    list:{
        borderRadius:10,
        color:theme.palette.primary.main,
    },
    buttonText:{
        color:'black'
    }
})

class Footer extends Component {
    render() {
        const {classes} = this.props;
        return (
            <div>

                <Divider 
                variant='fullWidth' 
                light={true} 
                // className={classes.divider}
                />

                <Grid container className={classes.footer}>

                    <Grid item className={classes.firstItem}>
                        <div className={classes.cardDiv}>
                            <Card className={classes.card}>
                            <CardMedia
                            className={classes.CardImage}
                            image={Image}
                            title="Web Developer"
                            />
                            <CardContent className={classes.cardContent}>
                            <Typography gutterBottom variant="h5" component="h2">
                                Web Developer
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                I am Soul Developer from India
                            </Typography>
                            </CardContent>
                            </Card>
                        </div>

                        <Divider className={classes.divider} light={true} variant='middle'/>

                        <div className={classes.ListDiv}>
                            <List className={classes.list}>
                                <ListSubheader>About Us</ListSubheader>
                                <ListItem button>
                                    <ListItemText className={classes.buttonText} primary="Soul Developer"/>
                                </ListItem>
                                <ListItem button>
                                    <ListItemText className={classes.buttonText} primary="Team" />
                                </ListItem>
                                <ListItem button>
                                    <ListItemText className={classes.buttonText} primary="Something" />
                                </ListItem>
                            </List>
                        </div>

                        <Divider className={classes.divider} light={true} variant='middle'/>

                        <div>
                        <List>
                                <ListSubheader>Contact Us</ListSubheader>
                                <ListItem button>
                                    <ListItemText primary="Any Suggestion" />
                                </ListItem>
                                <ListItem button>
                                    <ListItemText primary="Ask your queries" />
                                </ListItem>
                            </List>
                        </div>
                    </Grid>

                    <Divider light={true} variant='fullWidth'/>
                    <Grid item className={classes.secondItem}>
                        <Typography variant='caption' className={classes.copyrightSection}>Copyright <Copyright/> {new Date().getUTCFullYear()} Soul Developer. All rights reserved.</Typography>
                    </Grid>
                    
                </Grid>

            </div>
        );
    }
}

export default withStyles(styles)(Footer);