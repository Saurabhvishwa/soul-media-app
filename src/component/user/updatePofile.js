import React, { Component, Fragment } from 'react';
import MyButton from '../layout/MyButton';
// import {Link} from 'react-router-dom';
// redux
import {connect} from 'react-redux';
import {updateProfile} from '../redux/actions/userActions';
// material-ui
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/styles/withStyles';
import {AddCircle} from '@material-ui/icons';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
// import DialogContentText from '@material-ui/core/DialogContentText';
import Zoom from '@material-ui/core/Zoom';
import DialogContent from '@material-ui/core/DialogContent';
import { TextField } from '@material-ui/core';
// import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  ...theme.spreadThis,
    dialogTitle:{
      padding:theme.spacing(0)
    },
    dialogContent:{
      padding:'20px 20px 10px 20px',
      display:'flex',
      flexDirection:'column',
      justifyContent:'space-between',
      width:theme.spacing(70),
      height:theme.spacing(20),
      // paddingTop:0,
      // paddingBottom:0,
    [theme.breakpoints.down('sm')]:{
      width:theme.spacing(40),
      padding:'20px 0 10px 0',
    }
    },
    btnContainer:{
        padding:0,
        display:'flex',
        // alignContent:'center',
        justifyContent:'space-evenly',
    },
    profileInput:{
        '& input:valid + fieldset': {
            borderColor: theme.palette.secondary.light,
        },
    '& input:valid:hover + fieldset':{
        borderColor:theme.palette.secondary.main
    }

}
})

class UpdateProfile extends Component {
    constructor(){
        super();
        this.state = {
            open : false,
            bio:'',
            location:'',
            website:'',
        }
    }
    componentDidMount(){
      this.setState({
        bio:this.props.User.bio,
        location:this.props.User.location,
        website:this.props.User.website
      })
    }

    UNSAFE_componentWillReceiveProps(nextProps){
        if(nextProps.User.authenticated){
            this.setState({
               bio:nextProps.User.bio,
               location:nextProps.User.location,
               website:nextProps.User.website 
            })
        }
        if(!nextProps.User.loading && !nextProps.UI.errors){
            this.setState({open:false})
        }
    }
    handleOpen = () => {
        this.setState({open:true})
    }

    handleClose = () => {
        // this.props.clearErrors();
        this.setState({open:false})
    }

    handleChange = (e) => {
      this.setState({
        [e.target.name]:e.target.value
      })
    }

    handleUpdate = (e) => {
      e.preventDefault();
      const profileData ={};
      if(this.state.bio !== this.props.User.bio && this.state.bio !== '') profileData.bio = this.state.bio;
      if(this.state.location !== this.props.User.location && this.state.location !== '') profileData.location = this.state.location;
      if(this.state.website !== this.props.User.website && this.state.website !== ''){
        if(this.state.website.substring(0,4) !== 'http'){
          profileData.website = `http://${this.state.website}`
        }else{
          profileData.website = this.state.data;
        }
      };
      this.props.updateProfile(profileData);
    }
    render() {

        const {classes} = this.props;
        return (
            <Fragment>

                    <MyButton tip = "Update Profile Info" color = '#2196f3' className={this.props.className} onClick={this.handleOpen}><AddCircle/></MyButton>
            <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            TransitionComponent={Zoom}
            className={classes.dialogBox}
          >
              <DialogTitle className={classes.dialogTitle} color = 'inherit'>Update Your Profile</DialogTitle>

              <DialogContent className={classes.dialogContent}>
                <TextField 
                variant = 'outlined'
                defaultValue={this.state.bio !== '' ? (this.state.bio) : ('')}
                name='bio'
                color = 'secondary' 
                id='bio' 
                onChange={this.handleChange}
                label='Bio' 
                size='small'
                className={classes.profileInput} fullWidth
                />
                <TextField 
                variant = 'outlined'
                defaultValue={this.state.location !== '' ? (this.state.location) : ('')}
                name='location'
                color = 'secondary' 
                id='location' 
                onChange={this.handleChange}
                label='Location' 
                size='small'
                className={classes.profileInput} fullWidth
                />
                <TextField 
                variant = 'outlined'
                defaultValue={this.state.website !== '' ? (this.state.website) : ('')}
                name='website'
                color = 'secondary' 
                id='website' 
                onChange={this.handleChange}
                label='Website' 
                size='small'
                className={classes.profileInput} fullWidth
                />
                
              </DialogContent>


              <div className={classes.btnContainer}>
                  <Button variant='outlined' color='primary' className={classes.cancel} onClick={this.handleClose}>Cancel</Button>
                  <Button variant='outlined' color='primary' className={classes.button} onClick={this.handleUpdate} disabled={false}>
                    Update
                    {/* {
                                loading?<CircularProgress size={25} color="primary" className={classes.loading}/>:<div></div>
                            } */}
                    </Button>
              </div>

              {/* {
                errors !== null ? (errors.Error) : ('')
              } */}

          </Dialog>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
data : state.data,
UI: state.ui,
User : state.user
})

const mapActionsToProps = {
updateProfile
}
export default connect(mapStateToProps , mapActionsToProps)(withStyles(styles)(UpdateProfile));