import React, { Component } from 'react';
import {connect} from 'react-redux';
import {deleteComment} from '../redux/actions/dataActions';

// material-ui
import withStyles from '@material-ui/styles/withStyles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import {Typography} from '@material-ui/core';
import Comment from './comment';

const styles = theme => ({
    mainGrid:{
        display:'flex',
        flexDirection:'column'
    },
    imageWrapper:{
        padding:'10px 32px 10px 10px'
    },
    userImage:{
        height:100,
        width:100,
        borderRadius:'50%',
        objectFit:'cover',
        [theme.breakpoints.down('sm')]:{
            height:60,
            width:60
        }
    },
    gridItem:{
        display:'flex',
        marginTop:theme.spacing(1),
        marginBottom:theme.spacing(1),
        backgroundColor:theme.palette.primary.light,
        borderRadius:10,
        [theme.breakpoints.down('sm')]:{
            borderRadius:5
        }
    },
    contentWrapper:{
        padding:'10px 10px 10px 0',
        display:'flex',
        flexDirection:'column',
        textAlign:'left',
        alignItems:'start',
        width:'77%',
        // [theme.breakpoints.down('sm')]:{
        //     maxWidth:200
        // }
        overflowWrap:'anywhere'
    },
    handle:{
        position:'relative',
        width:'100%'
    },
    deleteComment:{
        position:'absolute',
        top:'-26%',
        left:'94%',
        [theme.breakpoints.down('sm')]:{
            top:0,
            left:'90%'
        }
    },
    progress:{
        margin:'20px 0',
    },
    deleteIcon:{
        [theme.breakpoints.down('sm')]:{
            height:10,
            width:10
        }
    },
    delete:{
        [theme.breakpoints.down('sm')]:{
            height:15,
            width:15
        }
    }
})

class commentList extends Component {
 
    render() {
        const {comments , loading , classes} = this.props;
        let data = !loading ? (
            comments.length > 0 ? (
                comments.map((comment) => <Comment key={comment.commentid} comment={comment} />)
            ) : (<Typography variant='h5'>No comments yet</Typography>)
                ) : (
                    <div className={classes.progress}>
                        <LinearProgress/>
                    </div>
                )
        return (
            <Grid container className={classes.mainGrid}>
                {
                 data   
                }
            </Grid>
        );
    }
}

const mapStateToProps = state => ({
    loading:state.ui.loading,
    comments : state.data.scream.commentData,
    user:state.user
})
const mapActionsToProps = {
    deleteComment
}
export default connect(mapStateToProps , mapActionsToProps)(withStyles(styles)(commentList));