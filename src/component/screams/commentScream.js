import React, { Component, Fragment } from 'react';
import MyButton from '../layout/MyButton';
import {Link} from 'react-router-dom';
// redux
import {connect} from 'react-redux';
import {screamComment , clearErrors} from '../redux/actions/dataActions';
// material-ui
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/styles/withStyles';
import {Send , Comment , Close} from '@material-ui/icons';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Zoom from '@material-ui/core/Zoom';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { TextField } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  ...theme.spreadThis,
    dialogTitle:{
      position:'relative',
      padding:theme.spacing(0),
    },
    dialogContent:{
      width:theme.spacing(70),
      paddingTop:theme.spacing(2),
      paddingBottom:0,
    [theme.breakpoints.down('sm')]:{
      width:theme.spacing(40),
      padding:theme.spacing(0),
      paddingTop:theme.spacing(2)
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
        justifyContent:'center',
    },
    inputField:{
      '& input:valid + fieldset': {
          borderColor: theme.palette.secondary.light,
      },
  '& input:valid:hover + fieldset':{
      borderColor:theme.palette.secondary.main
  },
},
close:{
  position:'absolute',
  top:'-25%',
  left:'93%',
  [theme.breakpoints.down('sm')]:{
    top:'-50%',
    left:'90%'
  }
}
})

class CommentScream extends Component {
    constructor(){
        super();
        this.state = {
            open : false,
            comment:'',
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
        comment:'',
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
      this.props.screamComment({body:this.state.comment} ,this.props.screamid);
    }
    render() {

        const {classes , UI:{loading} , User:{authenticated}} = this.props;
        const {errors} = this.state;
        return (
            <Fragment>
                {
                  authenticated ? (
                    <div>
                    <MyButton color='#0097a7' tip = 'Write your comment' onClick={this.handleOpen} className={this.props.className} variant='caption'><Comment color='secondary'/></MyButton>
            <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            TransitionComponent={Zoom}
            className={classes.dialogBox}
          >
              <DialogTitle className={classes.dialogTitle} color = 'inherit'>
                WRITE YOUR COMMENT
                <div className={classes.close}>
                <MyButton tip='Close' color='#0097a7' onClick={this.handleClose}>
                  <Close/>
                </MyButton>
              </div>
              </DialogTitle>

              <DialogContent className={classes.dialogContent}>

                {/* <DialogContentText className={classes.dialogBoxText} color='primary'>
                       
                </DialogContentText> */}
                <TextField 
                autoFocus
                variant = 'outlined' 
                helperText={errors.message} 
                error={errors.message ? true:false} 
                name='comment'
                id='comment' 
                className={classes.inputField}
                value={this.state.comment}
                onChange={this.handleChange}
                label='Comment' 
                size='small' fullWidth
                />
                
              </DialogContent>


              <DialogActions className={classes.btnContainer}>
                  <Button variant='outlined' color='primary' className={classes.button} onClick={this.handleSubmit} disabled={loading}>
                    Comment&nbsp;<Send/>
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
                    <MyButton color='#0097a7' tip = 'Comment' component={Link} to='/login' className={this.props.className}><Comment color='secondary'/></MyButton>
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
  screamComment,
  clearErrors
}
export default connect(mapStateToProps , mapActionsToProps)(withStyles(styles)(CommentScream));