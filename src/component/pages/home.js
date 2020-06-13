import React, { Component } from 'react';
import MyButton from '../layout/MyButton';
import PropTypes from 'prop-types';

// redux component
import {connect} from 'react-redux';
import {getAllScreams , clearErrors} from '../redux/actions/dataActions';
import {resetUserReset , unSetUserImage} from '../redux/actions/userActions';

// component//util
import Scream from '../screams/scream';
import Profile from '../layout/Profile';

// material-ui
import Grid from '@material-ui/core/Grid';
import { withStyles} from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import ExpandMoreRounded from '@material-ui/icons/ExpandMoreRounded';
import Alert from '@material-ui/lab/Alert';

const useStyles = theme => ({
    parentGrid:{
        [theme.breakpoints.down('sm')]: {
            paddingTop:theme.spacing(1)
          },
    },
    itemGrid2: {
        position:'sticky',
        paddingTop:theme.spacing(4),
        [theme.breakpoints.down('sm')]: {
            display:'none'
          },
    },
    itemGrid1:{
        padding:theme.spacing(4),
        marginTop:theme.spacing(0),
        [theme.breakpoints.down('sm')]: {
            padding:theme.spacing(0),
            marginTop:theme.spacing(2)
          },
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
        }
    },
    floating:{
        '&:hover':{
            backgroundColor:theme.palette.secondary.main
        }
    },
    loadMore:{
        marginTop:theme.spacing(2),
        textAlign:'center'
    },
    alertMsg:{
        position:'absolute',
        zIndex:10,
        boxShadow:'0 0 5px white'
    }
  });

class home extends Component {
    constructor(){
        super();
        this.state = {
            limit : 15 
        }
    }
    handleImageSet = () => {
        setTimeout(() => {
            this.props.unSetUserImage();
        } , 4000);
    }
    handleClearUIErrors = () => {
        setTimeout(() => this.props.clearErrors(), 4000)
    }

    componentDidMount(){
        this.props.getAllScreams();
    }
    handleLoadMore = () => {
        this.setState({limit : this.state.limit + 5})
    }
    handleUserResetFalse = () => {
        setTimeout(() => {
            this.props.resetUserReset();
        } , 4000);
    }

    render() {
        const {classes ,data :{screams , loading , errors} , user:{reset , set} , ui:{errors:UIerror}} = this.props;
        const {limit} = this.state;

        const screamCollection = !loading ? (
            errors ? (
                <Typography variant='h5' align='center' color='error'>{errors.error}</Typography>
            ) : (
                screams.length > 0 ? (screams.slice(0,limit).map((scream ) => <Scream key={scream.screamid} scream={scream}></Scream>)) : (<Typography variant='h5' color='inherit'>No Posts yet</Typography>)
            ) 
        ) : (
            <LinearProgress color='secondary'/>
        )

        return (
                <Grid container className={classes.parentGrid}>

                    { reset && this.handleUserResetFalse()}

                    <Grid item xs={12} sm={12} md={9} lg={9} xl={9} className={classes.itemGrid1}>
                    {
                    reset && <div className={classes.alertMsg} >
                                <Alert severity="success">You password has successfully changed.</Alert>
                            </div>
                    }
                     {
                        set && <Alert style={{position:"absolute",zIndex:10}} severity="success">You profile image has successfully updated!</Alert>
                    }
                    {
                        set && this.handleImageSet()
                    }
                    {
                        UIerror!==null && <Alert severity="error">Something went wrong. Try again later.</Alert>
                    }
                    {
                        UIerror!==null && this.handleClearUIErrors()
                    }

                        {screamCollection}

                            {
                                !loading && !errors && (
                                    limit < screams.length-1 ? (
                                        <div className={classes.loadMore}>
                                        <MyButton tip="Load More" color='#2196f3' onClick={this.handleLoadMore}>
                                            <ExpandMoreRounded/>
                                        </MyButton>
                                        </div>
                                    ) : (
                                        <div className={classes.loadMore}>
                                            <Typography variant='h5' color='inherit'>Reached bottom</Typography>
                                        </div>
                                    )
                                )
                            }
                    </Grid>

                    <Grid item md={3} lg={3} xl={3} className={classes.itemGrid2}>
                        <Profile/>
                    </Grid>
                    
                </Grid>
        );
    }
}

home.propTypes = {
    classes : PropTypes.object.isRequired,
    data : PropTypes.object.isRequired,
    getAllScreams : PropTypes.func.isRequired,
    resetUserReset : PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    data:state.data,
    user:state.user,
    ui:state.ui
})
const mapActionsToProps = {
    getAllScreams,
    resetUserReset,
    unSetUserImage,
    clearErrors
}
export default connect(mapStateToProps , mapActionsToProps )(withStyles(useStyles)(home ));