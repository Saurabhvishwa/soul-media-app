import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import withStyles from '@material-ui/styles/withStyles';
import MyButton from '../layout/MyButton';
import dayjs from 'dayjs';
import UpdateProfile from '../user/updatePofile';
import Image from '../images/Soul.png';


// import clsx from 'clsx';

// material-ui
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import {HomeRounded ,PersonPinCircle , Edit, PersonRounded , ExitToAppRounded , AccountCircleRounded , Info} from '@material-ui/icons';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import IconButton from "@material-ui/core/IconButton";
import CalendarToday from '@material-ui/icons/CalendarToday';

// redux component
import {connect} from 'react-redux';
import {updateProfile} from '../redux/actions/userActions';
import {logout} from '../redux/actions/userActions';

var styles = theme => ({
    ...theme.spreadThis
});

const useStyles = makeStyles((theme) =>({
  list: {
    color:theme.palette.secondary.main,
    width: 250,
    backgroundColor:'rgba(0,0,0,0.2)',
    height:'100%',
    
  },
  fullList: {
    width: 'auto',
  },
  profContainer:{
      marginTop:0,
      justifyContent:'center',
      padding:theme.spacing(1)
  },
  profPaper:{
      padding:theme.spacing(1),
      borderRadius:10,
      backgroundColor:'$fff',
      height:'auto',
      width:200,
      display:'flex',
      flexDirection:'column',
      textAlign:'center',
      alignItems:'center',
      border:'none',
      boxShadow:'0 0 2px gray'
  },
  IconBtn:{
      marginTop:theme.spacing(2),
    height:theme.spacing(12),
    width:theme.spacing(12)
  },
  avatar:{
      height:theme.spacing(10),
      width:theme.spacing(10)
  },
  divider:{
      backgroundColor:'gray',
      width:'80%',
      margin:theme.spacing(1)
  },
  drawer:{
      backgroundColor:'black'
  },
  mainList:{
    "&:hover":{
        backgroundColor:'white'
    },
  },
  MText:{
      color:theme.palette.primary.main,
    "& span":{
        fontWeight:700
    }
  },
  MBtn:{
      color:theme.palette.primary.main,
      boxShadow:'0 0 2px gray',
    fontWeight:'700',
  },
  menuIcon:{
      color:'white'
  },
  alignItems:{
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    margin:'5px 0'
  },
  imageEditButton:{
      position:'absolute',
      top:'73%',
      left:'73%'
  },
  iconBtn:{
    width:30,
    height:30,
    color:theme.palette.secondary.main
  },
  icon:{
      transform:"scale(0.8)",
      color:theme.palette.secondary.main
  },
  profInfoChange:{
      borde:'1px solid black'
  },
  alignLocation:{
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    margin:'5px 0'
  },
}));

function MyDrawer(props) {

  const classes = useStyles();
  const [state, setState] = React.useState({

  });

  const handleImageChange = () => {
    const imageFileInput = document.getElementById('imageFile');
    imageFileInput.click();
  }

  const handleImageEdit = (event) => {
    if(event){
        const valid = event.target.files[0].name.split('.')[1];
      if(valid === 'jpeg' || valid === 'png' || valid === 'jpg'){
      const imageFileForUpload = event.target.files[0];
      const DataForUpload = new FormData();
      DataForUpload.append('image' , imageFileForUpload , imageFileForUpload.name);
      props.uploadUserImage(DataForUpload);
      // }
      }
    }
  }


  const toggleDrawer = (anchor, open) => () => {
    setState({ ...state, [anchor]: open });
  };
  
  const {authenticated ,imageUrl , handle , location , bio , website , createdAt , errors} = props.User;

  const list = () => (
        <div
        className={classes.list}
        role="presentation"
        >
            <Grid container className={classes.profContainer}>
                {
                    errors ? (
                        <Paper className={classes.profPaper} elevation={1}>
                                <IconButton
                                className={classes.IconBtn}
                                color='inherit'
                                >
                                    <Avatar src={Image} alt="Profile Image" className={classes.avatar}/>
                                </IconButton>
    
                                <Divider className={classes.divider} variant='middle'/>
    
                                <Typography align='center' variant='h6' color='error'>Check your internet connection</Typography>
                            </Paper>
                    ) : (
                        authenticated ? (
                            <Paper className={classes.profPaper} elevation={1}>
    
                                <div style={{position:'relative'}}>
                                    <IconButton
                                    className={classes.IconBtn}
                                    color='inherit'
                                    ><Avatar alt="Profile Image" src={imageUrl} className={classes.avatar}/>
                                    </IconButton>
    
                                    <div className={classes.imageEditButton}>
                                    <input type='file' id='imageFile' hidden='hidden' onChange={handleImageEdit}/>
    
                                    <MyButton tip="Change Profile Image" className={classes.iconBtn} onClick={handleImageChange}>
                                        <Edit className={classes.icon}/>
                                    </MyButton>
    
                                    </div>
    
                                </div>
    
                                <Divider className={classes.divider} variant='middle'/>
    
                                <Typography color='secondary' variant='h5' style={{fontWeight:'700'}}>{handle}</Typography>
                                {bio && <Typography variant='body1' style={{fontWeight:'600'}}>{bio}</Typography>}
                                {location && <Typography variant='body2' color='secondary' className={classes.alignLocation} style={{fontWeight:'500'}}><PersonPinCircle/>{location}</Typography>}
                                {website && <Typography variant='body2'>{website}</Typography>}
                                <Typography style={{color:'#795548'}} variant='body2' color='secondary' className={classes.alignItems}>
                                    <CalendarToday/>{'  '}Joined{' '}{dayjs(createdAt).format('MMMM D, YYYY')}
                                </Typography>
    
                                <div className={classes.profInfoChange}>
                                    <UpdateProfile />
                                </div>
    
                            </Paper>
                            ) : (
                            <Paper className={classes.profPaper} elevation={1}>
                                <IconButton
                                className={classes.IconBtn}
                                color='inherit'
                                >
                                    <Avatar src={Image} alt="Profile Image" className={classes.avatar}/>
                                </IconButton>
    
                                <Divider className={classes.divider} variant='middle'/>
    
                                <Typography align='center' variant='h6' color='primary'>Please Login</Typography>
                            </Paper>
                            )
                    )
                    
                }
            </Grid>

            <List onClick={() => setState(false)}>

                <ListItem button component={Link} to='/' className={classes.MBtn}>
                    <ListItemIcon><HomeRounded color='primary'/></ListItemIcon>
                    <ListItemText className={classes.MText}>Home</ListItemText>
                </ListItem>
                {
                    authenticated === false ? (
                    <ListItem button component={Link} to='/login' className={classes.MBtn}>
                        <ListItemIcon><AccountCircleRounded color='secondary'/></ListItemIcon>
                        <ListItemText className={classes.MText}>Login</ListItemText>
                    </ListItem>
                    ) : ''
                }
                {
                    authenticated === false ? (
                    <ListItem button component={Link} to='/signup' className={classes.MBtn}>
                        <ListItemIcon><PersonRounded color='secondary' /></ListItemIcon>
                        <ListItemText className={classes.MText}>Sign-up</ListItemText>
                    </ListItem>
                    ) : ''
                }
                {
                    authenticated === true ? (
                    <ListItem button onClick={() => props.logout()} className={classes.MBtn}>
                        <ListItemIcon>
                            <ExitToAppRounded color='secondary' />
                        </ListItemIcon>
                        <ListItemText className={classes.MText}>Logout</ListItemText>
                    </ListItem>
                    ) : ''
                }
                <ListItem button className={classes.MBtn}>
                    <ListItemIcon>
                        <Info color='secondary'/>
                    </ListItemIcon>
                    <ListItemText className={classes.MText}>About Us</ListItemText>
                </ListItem>
                
            </List>

        </div>
  );

  return (
    <div>
        <>

          <IconButton className={classes.menuIcon} onClick={toggleDrawer('left', true)}>
            <MenuIcon style={{color:'white'}}/>
          </IconButton>

          <Drawer anchor={'left'} open={state.left} onClose={toggleDrawer('left', false)}>
            {list()}
          </Drawer>

        </>

    </div>
  );
}

MyDrawer.propTypes = {
    User : PropTypes.object.isRequired,
    logout : PropTypes.func.isRequired,
    updateProfile : PropTypes.func.isRequired
}

const maptStateToProps = state => ({
    User:state.user
})
const mapActionsToProps = {
    logout,
    updateProfile
}
export default connect(maptStateToProps , mapActionsToProps)(withStyles(styles)(MyDrawer))