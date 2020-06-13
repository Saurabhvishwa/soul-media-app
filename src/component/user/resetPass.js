import React, { Component } from 'react';
import MyButton from '../layout/MyButton';
import image from '../images/reset.png';
import {connect} from 'react-redux';
import {resetPassword} from '../redux/actions/userActions';
import {clearErrors} from '../redux/actions/dataActions';
import PropTypes from 'prop-types';

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

const styles = theme => ({
    resetImage:{
        height:30,
        width:30,
        [theme.breakpoints.down('sm')]:{
            height:20,
            width:20
        }
    },
    progress:{
        position:'absolute'
    }
})

class resetPass extends Component {
    constructor(){
        super();
        this.state = {
            open:false,
            email:'',
            errors:{}
        }
    }

    handleChange = (e) => {
        e.preventDefault();
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    componentWillReceiveProps(newProps){
        if(newProps.ui.errors!==null){
            this.setState({errors:newProps.ui.errors , open:true});
        }
        if(!newProps.ui.loading && newProps.ui.errors===null){
            this.setState({open:false,errors:{} ,email:''})
        }
    }

    handleOpen = () => {
        this.setState({open:true,errors:{}});
    }

    handleClose = () => {
        this.props.clearErrors();
        this.setState({open:false,email:'',errors:{}})
    }
    handleReset = () => {
        this.props.clearErrors();
        this.setState({errors:{}})
            if(this.state.email !==''){
                this.props.resetPassword({
                    email:this.state.email
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

                    <DialogTitle>{"FORGOT PASSWORD ?"}</DialogTitle>

                    <DialogContent>

                        <DialogContentText id="alert-dialog-description">
                            Do you really want to reset your password ?
                        </DialogContentText>

                        <TextField
                            autoFocus
                            helperText={errors.error ? errors.error : ''}
                            error={errors.error ? true:false}
                            value={this.state.email}
                            id="email"
                            name='email'
                            label="Email Address"
                            type="email"
                            onChange={this.handleChange}
                            fullWidth
                        />
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={this.handleClose} color="secondary">
                            Cancel
                        </Button>

                        <Button style={{position:'relative'}} onClick={this.handleReset} color="secondary" disabled={loading} autoFocus>
                            Reset
                            {loading && <CircularProgress size={25} color='secondary' className={classes.progress} />}
                        </Button>
                    </DialogActions>

                </Dialog>
            </div>
        );
    }
}

resetPass.propTypes = {
    classes : PropTypes.object.isRequired,
    resetPassword : PropTypes.func.isRequired,
    clearErrors : PropTypes.func.isRequired,
    ui : PropTypes.object.isRequired
}

const mapActionsToProps = {
    resetPassword,
    clearErrors,
}
const mapStateToProps = state => ({
    ui: state.ui,
    
    
})

export default connect(mapStateToProps , mapActionsToProps)(withStyles(styles)(resetPass));