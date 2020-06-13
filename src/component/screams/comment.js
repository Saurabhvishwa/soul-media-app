import React, { Component } from 'react';
import dayjs from 'dayjs';
import {connect} from 'react-redux';
import {deleteComment} from '../redux/actions/dataActions';

// material-ui
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Delete from '@material-ui/icons/Delete';
import MyButton from '../layout/MyButton';


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
 
class comment extends Component {
    handleCheck = () =>{
        if(this.props.comment.handle === this.props.user.handle){
            return true;
        }
        return false
    }
    handleDelete = () => {
        this.props.deleteComment({commentid:this.props.comment.commentid} , this.props.comment.screamid);
    }
    render() {
        const {imageUrl , handle , createdAt , body} = this.props.comment;
        const {classes , user} = this.props;

        return(
            <Grid item className={classes.gridItem}>
                <div className={classes.imageWrapper}>
                    <img className={classes.userImage} alt='User_image' src={imageUrl}/>
                </div>
                <div className={classes.contentWrapper}>
                     
                    <Typography className={classes.handle} variant='h5' color='primary' style={{fontWeight:'600'}}>
                        {handle === user.handle ? 'You' : handle}
                        {
                        this.handleCheck() && (
                            <div className={classes.deleteComment}>
                            <MyButton className={classes.deleteIcon} tip='Delete' color='red' onClick={this.handleDelete}>
                                <Delete className={classes.delete}/>
                            </MyButton>
                            </div>
                        )}
                        </Typography>
                    <Typography variant='caption'>{dayjs(createdAt).fromNow()}</Typography>
                    <Typography variant='subtitle1' style={{fontWeight:'500'}}>{body}</Typography>
                </div>
            </Grid>
        );
    }
}

const mapStateToProps = state => ({
    user : state.user
})

const mapActionsToProps = {
    deleteComment
}
export default connect(mapStateToProps , mapActionsToProps)(withStyles(styles)(comment));