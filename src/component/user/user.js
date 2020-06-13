import React, { Component } from 'react';

// redux component
import {connect} from 'react-redux';
import {getAllScreams , clearErrors} from '../redux/actions/dataActions';
import {unSetUserImage} from '../redux/actions/userActions';

// component//util
import Scream from '../screams/scream';
import Profile from '../layout/Profile';

// material-ui
import Grid from '@material-ui/core/Grid';
import { withStyles} from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Typography } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

const useStyles = theme => ({
    parentGrid:{
        [theme.breakpoints.down('sm')]: {
            paddingTop:theme.spacing(1)
          },
    },
    itemGrid2: {
        // border:'1px solid green',
        // width:theme.spacing(10),
        position:'sticky',
        paddingTop:theme.spacing(4),
        [theme.breakpoints.down('sm')]: {
            display:'none'
          },
    },
    itemGrid1:{
        // border:'1px solid red',
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
        // border:'1px solid black',
        textAlign:'center'
    }
  });

class User extends Component {
    constructor(){
        super();
        this.state = {
            screamid:null
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
        const screamid = this.props.match.params.screamid;
        if (screamid) this.setState({ screamid: screamid });
        else this.setState({screamid:null})
        this.props.getAllScreams();
    }
    componentDidUpdate(oldProp){
        if(oldProp.match.params.screamid !== this.props.match.params.screamid){
            this.setState({screamid:this.props.match.params.screamid});
        }
    }

    render() {
        const {classes ,data :{screams , loading ,errors} , user : {handle:userHandle , set , errors:UIerror}} = this.props;
        const {screamid} = this.state;

        const screamCollection = loading ? (
                                            <LinearProgress color='secondary'/>
                                    ) : (
                                         errors ? (
                                             <Typography variant='h5' color='error' align='center'>{errors.error}</Typography>
                                         ) : (
                                            screams.filter(scream => scream.handle === this.props.match.params.handle).length > 0 ? (
                                                screamid ? (
                                                    screams.filter(scream => scream.handle === this.props.match.params.handle).map(scream => {
                                                            if(scream.screamid === screamid){
                                                                return <Scream key={scream.screamid} scream={scream}/>
                                                            }
                                                            else{
                                                                return ''
                                                            }
                                                    })
                                        ) : (
                                                    screams.filter(scream => scream.handle === this.props.match.params.handle).map(scream => <Scream key={scream.screamid} scream={scream}/>)
                                                )
    
                                        ) : (
                                        <Typography variant='h5' color='secondary' align='center'>{this.props.match.params.handle === userHandle ? "You haven't posted anything yet" : "This user has not posted anything yet"}</Typography>
                                        )
                                         )
                                )
                        
        
        return (
                <Grid container className={classes.parentGrid}>
                    {
                        set && <Alert style={{position:'absolute',zIndex:10}} severity="success">You profile image has successfully updated!</Alert>
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

                    <Grid item xs={12} sm={12} md={9} lg={9} xl={9} className={classes.itemGrid1}>
                        {screamCollection}
                    </Grid>

                    <Grid item md={3} lg={3} xl={3} className={classes.itemGrid2}>
                        <Profile/>
                    </Grid>
                    
                </Grid>
        );
    }
}

const mapStateToProps = state => ({
    data:state.data,
    user : state.user,
    errors : state.ui.errors
})
const mapActionsToProps = {
    getAllScreams,
    unSetUserImage,
    clearErrors
}
export default connect(mapStateToProps , mapActionsToProps )(withStyles(useStyles)(User));