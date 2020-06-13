import React, { Component } from 'react';
import MyButton from '../layout/MyButton';
import image from '../images/Change_pass.png';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';
import {changePassword } from '../redux/actions/userActions';
import {clearErrors} from '../redux/actions/dataActions';

// material-ui
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';


const styles = theme => ({
    resetImage:{
        height:23,
        width:23,
        
    },
    progress:{
        position:'absolute',
    }
})

class ChangePassword extends Component {
    constructor(){
        super();
        this.state = {
            open:false,
            newPassword:'',
            currentPassword:'',
            errors:{},
        }
    }

    handleChange = (e) => {
        e.preventDefault();
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    componentWillReceiveProps(newProps){
        if(newProps.ui.errors){
            this.setState({errors:newProps.ui.errors});
        }
        if(!newProps.ui.loading && !newProps.ui.errors){
            this.setState({open:false , errors:{} , newPassword:'',currentPassword:''})
        }
    }

    handleOpen = () => {
        this.setState({open:true})
    }

    handleClose = () => {
        this.props.clearErrors();
        this.setState({open:false,newPassword:'',currentPassword:'',errors:{}})
    }
    handleReset = () => {
        this.props.clearErrors();
        if(this.state.newPassword !== '' && this.state.currentPassword !== ''){
            this.props.changePassword({
                newPassword:this.state.newPassword,
                currentPassword:this.state.currentPassword
            });
        }
    }

    render() {
        const {open , errors} = this.state;
        const {classes , ui:{loading}} = this.props;
        return (
            <div>
                <MyButton tip='Forgot Passoword?' color='#2196f3' onClick={this.handleOpen}>
                    <img className={classes.resetImage} src={image} alt='Reset_password' />
                </MyButton>

                <Dialog
                open={open}
                onClose={this.handleClose}>

                    <DialogTitle>{"CHANGE PASSWORD"}</DialogTitle>

                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Do you really want to change your password ?
                        </DialogContentText>
                        
                        <TextField
                            autoFocus
                            value={this.state.currentPassword}
                            id="currentPassword"
                            name='currentPassword'
                            label="Current Password"
                            type="password"
                            onChange={this.handleChange}
                            fullWidth
                        />
                        <TextField
                            autoFocus
                            value={this.state.newPassword}
                            id="newPassword"
                            name='newPassword'
                            label="New Password"
                            type="password"
                            onChange={this.handleChange}
                            fullWidth
                        />
                        {/* {this.state.newPassword !== this.state.currentPassword && <Typography variant='caption' color='error'>P</Typography>} */}
                        {
                            errors.error && (<Typography variant='caption' color='error'>{errors.error}</Typography>)

                        }
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={this.handleClose} color="secondary">
                            Cancel
                        </Button>
                        <Button style={{position:"relative"}} disabled={loading} onClick={this.handleReset} color="secondary" autoFocus>
                            Change
                            {loading && <CircularProgress size={25} color='secondary' className={classes.progress}  />}
                        </Button>
                    </DialogActions>

                </Dialog>
            </div>
        );
    }
}

changePassword.propTypes = {
    classes : PropTypes.object.isRequired,
    changePassword : PropTypes.object.isRequired,
    clearErrors : PropTypes.object.isRequired,
    ui : PropTypes.object.isRequired
}

const mapActionsToProps = {
    changePassword,
    clearErrors,
}
const mapStateToProps = state => ({
    ui: state.ui,
})

export default connect(mapStateToProps , mapActionsToProps)(withStyles(styles)(ChangePassword));