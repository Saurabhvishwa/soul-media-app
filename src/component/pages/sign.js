import React, { Component } from 'react';
import {Link} from 'react-router-dom';

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

// redux component
import {connect} from 'react-redux';
import {signupUser} from '../redux/actions/userActions';


const styles = theme => ({...theme.spreadThis})

class sign extends Component {
    constructor(){
        super();
        this.state={
            email:'',
            password:'',
            confirmPassword:'',
            handle:'',
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
            password:this.state.password,
            confirmPassword:this.state.confirmPassword,
            handle:this.state.handle
        }
        this.props.signupUser(userData,this.props.history);
    }

    UNSAFE_componentWillReceiveProps(nextProps){
        if(this.state.errors!=={}){
            this.setState({errors:{}})
        }
        if(nextProps.User.errors){
            this.setState({errors:nextProps.User.errors});
        }
    }
    render() {
        const {classes , User : { loading }} = this.props;
        const {errors} = this.state;
        return (
            <Grid container className={classes.form}>

                <Grid item xs={8} sm={4} md={4} lg={3} xl={3} className={classes.itemform}>

                    <Tooltip TransitionComponent={Zoom} title="Admin welcomes you (:">
                        <img src={AppIcon} alt="app-logo" className={classes.logo}/>
                    </Tooltip>

                    <Typography variant='h4' className={classes.loginTitle}>SIGN-UP</Typography>

                    <form noValidate onSubmit={this.handleSubmit}>

                        <TextField
                        size='small'
                        helperText={errors.handle}
                        error={errors.handle ? true:false}
                        type='text' id="handle" name='handle' label="Username" variant="outlined" 
                        className={classes.textField} 
                        onChange={this.handleChange} placeholder='Enter Your Username' fullWidth/>

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

                        <TextField 
                        size='small'
                        helperText={errors.confirmPassword}
                        error={errors.confirmPassword ? true:false}
                        type='password' id="confirmpassword" name='confirmPassword' label="Confirm Password" variant="outlined" 
                        className={classes.textField} 
                        onChange={this.handleChange} placeholder='Enter the password again' fullWidth/>

                        

                        {
                            errors.error && (
                                <Typography variant='body2' color='error'>
                                    {errors.error}
                                </Typography>
                            )
                        }
                        
                        <Button variant='outlined' color='primary' size='large' type="submit" className={classes.button} fullWidth disabled={loading}>
                            Signup
                            {
                                loading?<CircularProgress size={30} className={classes.loading}/>:<div></div>
                            }
                            </Button>
                            <Typography variant='body2'className={classes.signuplink}>Already have an account ? Click <Tooltip TransitionComponent={Zoom} title="Login Here"><Link to='/login' className={classes.link}>Here</Link></Tooltip></Typography>

                            
                    </form>
                    

                </Grid>
                
            </Grid>
        );
    }
}

sign.propTypes = {
    classes:PropTypes.object.isRequired,
    User:PropTypes.object.isRequired,
    signupUser:PropTypes.func.isRequired
}


const mapStateToProps = state => ({
    User:state.user,
})

const mapActionsToProps = {
    signupUser
}

export default connect(mapStateToProps , mapActionsToProps)(withStyles(styles)(sign));