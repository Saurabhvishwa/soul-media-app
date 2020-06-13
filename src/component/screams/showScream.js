import React, { Component } from 'react';
import MyButton from '../layout/MyButton';
import CommentList from './commentList';
import {connect} from 'react-redux';
import {getScream , getAllScreams ,unlikeScream , likeScream} from '../redux/actions/dataActions';
import dayjs from 'dayjs';
import {Link} from 'react-router-dom';

// Material-ui
import {UnfoldMore , Close, FavoriteRounded , FavoriteBorderRounded , MessageRounded} from '@material-ui/icons';
import { Dialog , Grid, Typography , Divider} from '@material-ui/core';
import withStyles from '@material-ui/styles/withStyles';


const styles = theme => ({
    mainGrid:{
        display:'flex',
        flexDirection:'column',
        width:700,
        position:'relative',
        [theme.breakpoints.down('sm')]:{
            width:'90vw'
        }
        // border:'1px solid blue'
    },
    firstItemGrid:{
        // borderRadius:20,
        // backgroundColor:theme.palette.secondary.light,
        display:'flex',
        textAlign:'left',
        // justifyContent:"space-between",
        [theme.breakpoints.down('sm')]:{
            flexDirection:'column',
            maxHeight:320,
        }
    },
    imageWrapper:{
        display:'flex',
        padding:'0 32px 16px 0',
        [theme.breakpoints.down('sm')]:{
            padding:'0 16px 16px 16px',
            justifyContent:'center'
        }
    },
    userImage:{
        height:200,
        width:200,
        objectFit:'cover',
        borderRadius:20,
        [theme.breakpoints.down('sm')]:{
            borderRadius:'50%'
        }
    },
    contentWrapper:{
        padding:'10px 0 16px 0',
        height:185,
        overflowY:'scroll',
        [theme.breakpoints.down('sm')]:{
        overflowY:'scroll',
        overflowWrap:'anywhere',
         textAlign:'center'   
        },
        '&::-webkit-scrollbar':{
            display:'none'
        }
    },
    secondItemGrid:{
        // padding:theme.spacing(4),
        minHeight:0,
        maxHeight:300,
        overflowY:'scroll',
        [theme.breakpoints.up('sm')]:{
            '&::-webkit-scrollbar':{
                width:'0.4rem',
                backgroundColor:'transparent',
                borderRadius:'0.2rem'
            },
        },
        [theme.breakpoints.down('sm')]:{
            marginTop:'10px',
            maxHeight:'240px',
            '&::-webkit-scrollbar':{
                width:'1px',
                backgroundColor:'transparent'
            }
        },
        '&::-webkit-scrollbar-track':{
            borderRadius:'0.2rem',
            // '-webkit-box-shadow':'inset 0 0 5px rgba(0,0,0,0.5)'
        },
        '&::-webkit-scrollbar-thumb':{
            backgroundColor:theme.palette.secondary.main,
            outline:'1px solid green',
            [theme.breakpoints.up('sm')]:{
                borderRadius:'0.2rem',
            }
        }
    },
    closeButton:{
        position:'absolute',
        left:'95%',
        top:'-2%',
        [theme.breakpoints.down('sm')]:{
         top:'-2%',
         left:'90%'   
        }
    },
    ActionBar:{
        marginTop:'8px',
        display:'flex',
        [theme.breakpoints.down('sm')]:{
            justifyContent:'space-evenly',
        }
    },
    actionBtn:{
        display:'flex',
        alignItems:'center',
        justifyContent:'space-between'
    },

})

class showScream extends Component {
    constructor(){
        super();
        this.state={
            open:false,
            oldPath:'',
            newPath:'',
        }
    }
    
    componentDidMount(){
        if(this.props.openDialog){
            this.handleOpen();
        }
    }

    handleOpen = () => {
        let oldPath = window.location.pathname;

        const { handle, screamid } = this.props.scream;
        const newPath = `/users/${handle}/screams/${screamid}`;
    
        if (oldPath === newPath) oldPath = `/users/${handle}`;
    
        window.history.pushState("Resending", null, newPath);
    
        
        this.props.getScream(this.props.scream.screamid);
        if(!this.props.errors){
            this.setState({ open: true, oldPath, newPath });
        }
    }
    handleClose = () => {
        this.setState({open:false})
        window.history.pushState(null ,null ,this.state.oldPath);
    }

    likedScream = () => {
        if(this.props.user.likes && this.props.user.likes.some(like => like.screamid === this.props.scream.screamid)){
            return true;
        }
        else return false;
    }

    render() {
        const {open} = this.state;
        const {classes,ui :{errors} , scream : { body , createdAt , imageUrl , handle , likesCount , comments}  , user:{authenticated}} = this.props;
        return (
            <div>
                {
                    authenticated ? (
                        <MyButton tip='Show More' color='#2196f3' onClick={this.handleOpen}>
                        <UnfoldMore color='secondary'/>
                        </MyButton>
                    ): (
                        <MyButton tip='Login' color='#2196f3' component={Link} to='/login'>
                        <UnfoldMore color='secondary'/>
                    </MyButton>
                    )
                }

                <Dialog
                open={open}
                onClose={this.handleClose}
                maxWidth='md'
                >
                    <Grid container className={classes.mainGrid}>
                        <Grid item className={classes.firstItemGrid}>
                            <div className={classes.imageWrapper}>
                                <img className={classes.userImage} src={imageUrl} alt='User_image' />
                            </div>
                            <div className={classes.contentWrapper}>
                            <Typography variant='h5' style={{fontWeight:'600'}} color='secondary'>{handle}</Typography>
                            <Typography variant='body1' color='textSecondary'>{dayjs(createdAt).fromNow()}</Typography>
                            <Typography variant='body2' style={{fontWeight:'600',color:'black'}}>{body}</Typography>
                            <div className={classes.ActionBar}>
                                
                            <div className={classes.actionBtn}>
                                {
                                        this.likedScream() ? (
                                            <FavoriteRounded style={{color:'red',marginRight:'4px'}}/>
                                            ) : (
                                            <FavoriteBorderRounded style={{color:'red',marginRight:'4px'}}/>
                                            )
                                }
                                <Typography variant='caption' style={{fontWeight:'500' , marginRight:'32px'}}>
                                    {
                                        likesCount > 0 ? (
                                            likesCount === 1 ? (`1 Like`) : (`${likesCount} Likes`)
                                        ) : ('No likes yet')
                                }
                                </Typography>
                            </div>
                            <div className={classes.actionBtn}>

                                <MessageRounded color='secondary' style={{marginRight:'4px'}}/>
                                    <Typography variant = 'caption' style={{fontWeight:'500'}}>
                                    {
                                            comments > 0 ? (
                                                comments === 1 ? (`1 Comment`) : (`${comments} Comments`)
                                            ) : ('No comments yet')
                                    }
                                    </Typography>
                             </div>

                            </div>
                            </div>
                        </Grid>
                        <Divider variant='fullWidth' light={true} />
                        <Grid item className={classes.secondItemGrid}>
                            {!errors && <CommentList/>}
                            {errors && <Typography variant='caption' color='error'>Something went wrong.</Typography>}
                         </Grid>
                         <div className={classes.closeButton}>
                         <MyButton tip="Close" color='red' onClick={this.handleClose}>
                             <Close/>
                         </MyButton>
                         </div>
                    </Grid>

                </Dialog>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    data : state.data.scream,
    user : state.user,
    ui : state.ui
})
const mapActionsToProps = {
    getScream,
    getAllScreams,
    likeScream,
    unlikeScream
}
export default connect(mapStateToProps , mapActionsToProps)(withStyles(styles)(showScream));