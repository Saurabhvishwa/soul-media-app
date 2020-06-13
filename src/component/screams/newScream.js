import React, { Component, Fragment } from 'react';
import MyButton from '../layout/MyButton';
import {Link} from 'react-router-dom';
// redux
import {connect} from 'react-redux';
import {addScream , clearErrors} from '../redux/actions/dataActions';
// material-ui
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/styles/withStyles';
import {AddCircle} from '@material-ui/icons';
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import Zoom from '@material-ui/core/Zoom';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { TextField, Tooltip } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import Hidden from '@material-ui/core/Hidden';
import FButton from '@material-ui/core/Fab';

const styles = theme => ({
  ...theme.spreadThis,
    dialogTitle:{
      padding:theme.spacing(0),
    },
    dialogContent:{
      width:theme.spacing(70),
      paddingTop:0,
      paddingBottom:0,
    [theme.breakpoints.down('sm')]:{
      width:theme.spacing(40),
      padding:theme.spacing(0)
    }
    },
    dialogBoxText:{
        fontSize:theme.typography.body2,
        margin:theme.spacing(2),
        // [theme.breakpoints.down('sm')]:{
        //   margin:theme.spacing(1)
        // }
    },
    btnContainer:{
        display:'flex',
        justifyContent:'space-evenly',
        marginTop:theme.spacing(2),
    },
    postFloatingButton:{
      position:'fixed',
      top:'88vh',
      left:'80vw',
      transform:"scale(0.8)",
      transition:'0.3s ease-in-out',
      zIndex:'1',
      '&:hover':{
          transform:"scale(1.2)"
      },
      [theme.breakpoints.up('sm')]:{
        display:'none'
      }
  },
  floating:{
      '&:hover':{
          backgroundColor:theme.palette.secondary.main
      }
  }
})

class NewScream extends Component {
    constructor(){
        super();
        this.state = {
            open : false,
            body:'',
            errors:{}
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps){
      if(nextProps.UI.errors){
        this.setState({errors:nextProps.UI.errors});
    }
    if(!nextProps.UI.errors &&  !nextProps.UI.loading){
      this.setState({
        open:false,
        body:'',
        errors:{}
      })
    }
    }
    handleOpen = () => {
        this.setState({open:true})
    }

    handleClose = () => {
        this.props.clearErrors();
        this.setState({open:false})
    }

    handleChange = (e) => {
      this.setState({
        [e.target.name]:e.target.value
      })
    }

    handleSubmit = (e) => {
      e.preventDefault();
      this.props.addScream({
        body:this.state.body
      });
    }
    render() {

        const {classes , UI:{loading} , User:{authenticated}} = this.props;
        const {errors} = this.state;
        return (
            <Fragment>
                {
                  authenticated ? (
                    <div>
                      <div className={classes.postFloatingButton}>
                        <Tooltip title='New Post' leaveDelay={200} interactive arrow>
                      <FButton color='primary' className={classes.floating}  onClick={this.handleOpen}>
                        <AddIcon/>
                    </FButton>
                    </Tooltip>
                      </div>

                    <Hidden xsDown>
                    <MyButton tip = "Post a scream" color = 'white' onClick={this.handleOpen}><AddCircle className={this.props.className}/></MyButton>
                    </Hidden>

            <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            TransitionComponent={Zoom}
            className={classes.dialogBox}
          >
              <DialogTitle className={classes.dialogTitle} color = 'inherit'>POST A SCREAM</DialogTitle>

              <DialogContent className={classes.dialogContent}>

                <DialogContentText className={classes.dialogBoxText} color='primary'>
                       Post your thoughts here
                </DialogContentText>
                <TextField 
                autoFocus
                variant = 'outlined' 
                helperText={errors.body} 
                error={errors.body ? true:false} 
                name='body'
                color = 'primary' 
                id='body' 
                value={this.state.body}
                onChange={this.handleChange}
                label='Body' 
                size='small' fullWidth
                />
                
              </DialogContent>


              <DialogActions className={classes.btnContainer}>
                  <Button variant='outlined' color='primary' className={classes.cancel} onClick={this.handleClose}>Cancel</Button>
                  <Button variant='outlined' color='primary' className={classes.button} onClick={this.handleSubmit} disabled={loading}>
                    Post
                    {
                                loading?<CircularProgress size={25} color="primary" className={classes.loading}/>:<div></div>
                            }
                    </Button>
              </DialogActions>

              {
                errors !== null ? (errors.Error) : ('')
              }

          </Dialog>
          </div>
                  ) : (
                    <MyButton tip = "Login" color = 'white' component={Link} to='/login'><AddCircle className={this.props.className}/></MyButton>
                  )
                }
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
data : state.data,
UI: state.ui,
User : state.user,
})

const mapActionsToProps = {
addScream,
clearErrors
}
export default connect(mapStateToProps , mapActionsToProps)(withStyles(styles)(NewScream));