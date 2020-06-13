import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import ResetPassword from '../user/resetPass';

// material-ui
import withStyles from '@material-ui/styles/withStyles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import AppIcon from '../images/Soul.png';
import { Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import Alert from '@material-ui/lab/Alert';

//  redux connection
import {connect} from 'react-redux';
import {loginUser , resetUserReset} from '../redux/actions/userActions';

const styles = (theme) => ({
    ...theme.spreadThis,
    resetPass:{
        marginTop:'16px',
    },
    alertMsg:{
        position:'absolute'
    }
})

class login extends Component {
    constructor(){
        super();
        this.state={
            email:'',
            password:'',
            errors:{},
        }
        
    }
    handleChange = (e) =>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    handleSubmit = (e) =>{
        e.preventDefault();
        this.setState({errors:{}})
        const userData = {
            email:this.state.email,
            password:this.state.password
        }
        this.props.loginUser(userData , this.props.history);
    }
    
    UNSAFE_componentWillReceiveProps(nextProps){
        
        if(this.state.errors !== {}){
            this.setState({errors:{}})
        }
        if(nextProps.User.errors){
            this.setState({errors:nextProps.User.errors});
        }
    }

    handleUserResetFalse = () => {
        setTimeout(() => {
            console.log("Working")
            this.props.resetUserReset();
        } , 4000);
    }
    render() {
        const {classes , User : {loading , reset}} = this.props;
        const {errors} = this.state;
        return (
            <Grid container className={classes.form}>

                { reset && this.handleUserResetFalse()}
                {reset && <Alert className={classes.alertMsg} severity="success">A password reset email has been sent to your registered email ID. Kindly visit that link to reset your password.</Alert>}

                <Grid item xs={8} sm={4} md={4} lg={3} xl={3} className={classes.itemform}>
                
                    <Tooltip TransitionComponent={Zoom} title="Admin welcomes you (:">
                        <img src={AppIcon} alt="app-logo" className={classes.logo}/>
                    </Tooltip>

                    <Typography variant='h4' className={classes.loginTitle}>LOGIN</Typography>

                    <form noValidate onSubmit={this.handleSubmit}>

                        <TextField
                        color='primary'
                        size='small'
                        helperText={errors.email}
                        error={errors.email ? true:false}
                        type='email' id="email" name='email' label="Email" variant="outlined" 
                        className={classes.textField} 
                        onChange={this.handleChange} placeholder='Enter Your Email' fullWidth/>

                        <TextField 
                        size='small'
                        helperText={errors.password}
                        error={errors.password ? true:false}
                        type='password' id="password" name='password' label="Password" variant="outlined" 
                        className={classes.textField} 
                        onChange={this.handleChange} placeholder='Enter Your Password' fullWidth/>

                        {
                            errors.error && (
                                <Typography variant='body2' color='error'>
                                    {errors.error}
                                </Typography>
                            )
                            
                        }
                        <Button variant='outlined' color='primary' size='large' type="submit" className={classes.button} fullWidth disabled={loading}>
                            Login
                            {
                                loading?<CircularProgress size={30} color="primary" className={classes.loading}/>:<div></div>
                            }
                        </Button>

                        <Typography variant='body2'className={classes.signuplink}>Don't have an account ? Click 
                            <Tooltip TransitionComponent={Zoom} title="Sign Up Here"><Link to='/signup' className={classes.link}>&nbsp;Here</Link></Tooltip>
                        </Typography>

                        <div className={classes.resetPass}>
                            <ResetPassword/>
                        </div>

                    </form>
                    

                </Grid>
                
            </Grid>
        );
    }
}

login.propTypes = {
    classes:PropTypes.object.isRequired,
    loginUser:PropTypes.func.isRequired,
    User:PropTypes.object.isRequired,
    resetUserReset:PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    User:state.user,
})

const mapActionsToProps = {
    loginUser,
    resetUserReset
}

export default connect(mapStateToProps , mapActionsToProps)(withStyles(styles)(login));