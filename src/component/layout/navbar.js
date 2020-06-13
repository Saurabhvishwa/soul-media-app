import React , {Component } from 'react';
import {Link} from 'react-router-dom';
import logoPic from '../images/Soul.png';
import NewScream from '../screams/newScream';
import {connect} from 'react-redux';
import NotificationPage from '../notifications/notificationPage';
// import IconButton from './IconButton';

// material-ui
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import withStyles from '@material-ui/styles/withStyles';
import Drawer from './drawer';
import {HomeRounded} from '@material-ui/icons';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography";
import IconButton from '@material-ui/core/IconButton';

// import logo from '../images/AppIcon.png';
// import Typography from '@material-ui/core/Typography';
// import Tooltip from '@material-ui/core/Tooltip';
// import Zoom from '@material-ui/core/Zoom';

// redux component
// import {connect} from 'react-redux';
// import {logout} from '../redux/actions/userActions';
// import IconButton from '@material-ui/core/IconButton';
// import Menu from '@material-ui/core/Menu';
// import MenuItem from '@material-ui/core/MenuItem';
// import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = theme => ({
  appbar:{
    // backgroundColor:'rgba(0,0,0,0.5)'
  },
  toolbar:{
    display:'flex',
    justifyContent:'space-between',
    [theme.breakpoints.down('sm')]:{
      padding:theme.spacing(1)
    }
  },
  item:{
    display:'flex',
    alignItems:'center'
    // border:'1px solid white'
  },
  logoWrap:{
    color:'white'
    // border:'1px solid white'
    // padding:theme.spacing(0)
  },
  logoContainer:{
    padding:0,
    width:theme.spacing(5),
    height:theme.spacing(5),
    [theme.breakpoints.down('sm')]: {
    width:theme.spacing(3),
    height:theme.spacing(3),
    },
  },
  item1:{
    // border:'1px solid white',
    display:'flex',
    width:theme.spacing(20),
    justifyContent:'space-between',
    [theme.breakpoints.down('sm')]:{
      justifyContent:'center'
    }
  },
  item2:{
    marginRight:0
    // display:'flex',
    // justifyContent:'space-evenly'
  },
  menuIcon:{
    float:'right',
    display:'none',
    [theme.breakpoints.down('sm')]: {
      display:'block'
    },
  },
  btnContainer:{

  [theme.breakpoints.down('sm')]: {
    display:'none',
  },
  },
  btnIcon:{
    padding:theme.spacing(2)
  },
  Icon:{
    transform:'scale(1.8)'
  },
  icons:{
    transform:'scale(1.2)'
  }
});

class NavBar extends Component {

  handleUserResetFalse = () => {
    setTimeout(() => {
        this.props.resetUserReset();
    } , 6000);
    console.log("Finaaly out")
}

render(){
const {classes , user : {authenticated , loading:UserLoading} , loading}= this.props;
  return (
    <div>
      <AppBar className={classes.appbar}>
        <Toolbar variant='regular' className={classes.toolbar}>
          
          <Grid item className={classes.item}>
            <IconButton className={classes.logoWrap} color='secondary' component={Link} to='/'>
              <img  className={classes.logoContainer} alt='Logo' src={logoPic}/>
            </IconButton>
            <Typography variant='h5'>SOUL APP</Typography>
          </Grid>

          <Grid item className={classes.item1}>
            {(authenticated && !UserLoading) && (<NewScream className={classes.icons}/>)}
            {
              (authenticated && !loading) && (<NotificationPage/>)
            }
          </Grid>

          <Grid item className={classes.item2}>
            <div className={classes.menuIcon}><Drawer/></div>
            <div className={classes.btnContainer}>

                        <Tooltip title='Home Sweet Home' TransitionComponent={Zoom}>
                                  <IconButton className={classes.btnIcon} component={Link} to='/' style={{color:"white"}}>
                                  <HomeRounded className={classes.Icon}/>
                                  </IconButton>
                        </Tooltip>
                  
            </div>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
      }
}

const mapStateToProps = state => ({
  user : state.user,
  loading : state.data.loading,
  reset : state.user.reset
})

export default connect(mapStateToProps)(withStyles(useStyles)(NavBar));