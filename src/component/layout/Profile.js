import React from 'react';
import { Link} from "react-router-dom";
import UpdateProfile from '../user/updatePofile';
import MyButton from '../layout/MyButton';
import dayjs from 'dayjs';
import Image from '../images/Soul.png';
import ChangePassword from '../user/changePassword';
import PropTypes from 'prop-types';

// redux component
import {connect} from 'react-redux';
import {logout , uploadUserImage} from '../redux/actions/userActions';

// material-ui
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { IconButton, Tooltip } from '@material-ui/core';import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import CircularProgress from '@material-ui/core/CircularProgress';
import {CalendarToday,AccountCircleRounded , PersonRounded , ExitToAppRounded , AlternateEmail , PersonPinCircle , Edit} from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor:'rgba(255,255,255,0.3)',
    backgroundSize:'cover',
    backgroundPosition:'center',
    borderRadius:10,
    padding:theme.spacing(1),
    display:'flex',
    flexDirection:'column',
    textAlign:'center'
  },
  profGrid:{
    margin:'10px 0'
  },
  profContent:{
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center'
  },
  imageWrap:{
    padding:theme.spacing(1),
    marginTop:theme.spacing(1),
    position:'relative'
  },
  editImage:{
    color:theme.palette.secondary.main,
    position:'absolute',
    bottom:'-7px',
    right:'-7px',
  },
  avatar:{
    height:'120px',
    width:'120px'
  },
  divider:{
    margin:'10px auto 8px auto'
  },
  userInfo:{
    margin:0,
    borderRadius:10,
    padding:'0 16px',
  },
  navBtns:{
    padding:'0 1rem',
    display:'flex',
    justifyContent:'space-between'
  },
  btn:{
    color:theme.palette.primary.main,
    padding:theme.spacing(1.5)
  },
  alignItem:{
    display:'flex',
    alignItems:'center',
},
alignItems:{
  display:'flex',
  alignItems:'center',
  justifyContent:'center',
  margin:'5px 0'
},
changePassword:{
  height:25,
  width:25
}
}))

function Profile(props) {

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

  const classes = useStyles();
  const {authenticated ,imageUrl , handle ,loading , location , bio , website , createdAt , errors} = props.User;
  return (
    <div>
        <Paper className={classes.root} elevation={3}>
          {     
            loading ? (
                  <div className={classes.profContent}>
                    <div>
                    <CircularProgress color="secondary" />
                    </div>
                    <Divider className={classes.divider} variant='middle'/>
                    <Typography variant='h5'>{'    '}</Typography>
                    <Typography variant='subtitle1'>{'    '}</Typography>
                    <Typography variant='subtitle1'>{'    '}</Typography>
                  </div>
            ) : (
            errors ? (
              <Typography variant='subtitle1' color='error'>{errors.error}</Typography>
            ) : (
              authenticated === true ? (
                <div className={classes.profContent}>

                  <div className={classes.imageWrap} color='#0097a7'>

                    <MyButton tip ='Login Bruh' className={classes.imageWrap} color='#0097a7'>
                    <Avatar alt="Profile Image" src={imageUrl} className={classes.avatar}/>
                    </MyButton>
                    {/* <Avatar alt="Profile Image" src={imageUrl} className={classes.avatar}/> */}
                    <input type='file' id='imageFile' hidden='hidden' onChange={handleImageEdit}/>
                    <MyButton className={classes.editImage} tip='Change Profile Image' onClick={handleImageChange}>
                    <Edit/>
                    </MyButton>

                  </div>

                  <Divider className={classes.divider} variant='middle'/>

                  {handle && <Typography variant='h4' color='primary' component={Link} to={`/users/${handle}`} className={classes.alignItems}><AlternateEmail color='primary'/>{handle}</Typography>}
                
                  <div className={classes.userInfo}>
                  
                    { bio && <Typography variant='subtitle1' style={{fontWeight:'800'}}>{bio}</Typography>}
                    {location && <Typography variant='subtitle1' className={classes.alignItems} color='secondary'><PersonPinCircle/>{location}</Typography>}
                    {website && <Typography variant='body2'>{website}</Typography>}
                    <Typography style={{color:'#795548'}} variant='subtitle1' color='secondary' className={classes.alignItems}><CalendarToday/>{'  '}Joined{' '}{dayjs(createdAt).format('MMMM D, YYYY')}</Typography>
                  
                  </div>
                </div>
            
            ) : (
                <div className={classes.profContent}>
                  <MyButton tip ='Login Bruh' className={classes.imageWrap} color='#0097a7'>
                  <Avatar alt="Profile Image" src={Image} className={classes.avatar}/>
                  </MyButton>
                  <Divider className={classes.divider} variant='middle'/>
                  <Typography variant='h5'>Please Login</Typography>
                  <Typography variant='subtitle1'>{'     '}</Typography>
                </div>
            )
            )
            )
          
          }
          

          {
              authenticated === true ? (
                errors ? (
                  <Typography variant='body1' color='error'>Try again</Typography>
                  
                ) : (
                  <div className={classes.navBtns}>
                    <UpdateProfile className={classes.btn}/>
                      
                    <div>
                      <ChangePassword/>
                    </div>
      
                    <MyButton tip='Logout' className={classes.btn} color='red' onClick={() => props.logout()}>
                      <ExitToAppRounded/>
                    </MyButton>
                      
                  </div>
                )
                  
                  ) : (
                  <div className={classes.navBtns}>
                    <Tooltip title='Login'>
                      <IconButton className={classes.btn} component={Link} to='/login' size='small' color='secondary'>
                        <AccountCircleRounded/>
                      </IconButton>
                    </Tooltip>
      
                    <Tooltip title='Sign-up'>
                      <IconButton className={classes.btn} component={Link} to='/signup' size='small' color='secondary'>
                        <PersonRounded/>
                      </IconButton>
                    </Tooltip>
                  </div>
                  )
          }
        </Paper>
      
    </div>
  );
}

Profile.propTypes = {
  User : PropTypes.object.isRequired,
  logout : PropTypes.func.isRequired,
  uploadUserImage : PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    User:state.user,
})

const mapActionsToProps = {
  logout,
  uploadUserImage,
}
export default connect(mapStateToProps,mapActionsToProps)(Profile);