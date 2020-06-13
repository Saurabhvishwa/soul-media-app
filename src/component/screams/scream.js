import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import DeleteScream from './deleteScream';
import MyButton from '../layout/MyButton';
import CommentScream from './commentScream';
import ShowScream from './showScream';
import PropTypes from 'prop-types';

// reduc component
import {connect} from 'react-redux';
import {likeScream , unlikeScream} from '../redux/actions/dataActions';

// material-ui 
import withStyles from '@material-ui/core/styles/withStyles';
import {FavoriteBorder , Favorite} from '@material-ui/icons';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

const styles = theme => ({
    card:{ 
        backgroundColor:'rgba(255,255,255,0.9)',
        display:'flex',
        marginBottom:theme.spacing(2),
        transition:'0.15s ease-in-out',
        [theme.breakpoints.down('sm')]:{
            boxShadow:'0 0 3px #black',
            flexDirection:'column',
            justifyContent:'flext-start',
            '&:hover':{
                boxShadow:'0 0 0.6rem #455a64'
            }
        },
        [theme.breakpoints.up('sm')]:{
            boxShadow:'0 0 5px #black',
            '&:hover':{
                transform:'scale(1.02)',
                cursor:'pointer',
                boxShadow:`0 0 0.8rem #455a64`
            }
        }
    },
    image:{
        width:180,
        maxHeight:'auto',
        borderRadius:10,
        objectFit:'cover',
        [theme.breakpoints.down('sm')]: {
            margin:'auto 0',
            width:'100%',
            height:250
          },
    
    },
    content:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'space-between',
        padding:theme.spacing(2),
        // padding:'auto 0',
        width:'73%',
        marginLeft:theme.spacing(2),
        [theme.breakpoints.down('sm')]: {

            margin:0,
            width:'92%'
        },
        
    },
    actionBar:{
        // width:'98%',
        position:'relative',
        padding:'8px 8px 0 0',
        display:'flex',
    },
    handleActionBar:{
        position:'relative',

    },
    handle:{
        marginBottom:theme.spacing(1),
        transition:'0.2s ease-in-out',
        "&:hover":{
            color:'#0097a7'
        }
    },
    deleteBtn:{
        position:'absolute',
        top:'-23%',
        left:'93%',
        [theme.breakpoints.down('sm')]:{
            top:'-30%',
            left:'92%'
        }
    },
    comment:{
        display:'flex',
        alignItems:'center'
    },
    commentDiv:{
        display:'flex',
        alignItems:'center',
    },
    expand:{
        position:'absolute',
        bottom:'-2%',
        right:'-1%',
        [theme.breakpoints.down('sm')]:{
            bottom:'0%',
            right:'-5%'
        }
    },
    bodyText:{
    overflowWrap:'anywhere'
    }
})

class scream extends Component {

    likedScream = () => {
        if(this.props.User.likes && this.props.User.likes.find(like => like.screamid === this.props.scream.screamid)){
            return true;
        }
        else return false;
    }

    likescream = () =>{
        this.props.likeScream(this.props.scream.screamid);
    }

    unlikescream = () =>{
            this.props.unlikeScream(this.props.scream.screamid)
    }

    checkScream = () => {
        if(this.props.data.screams && this.props.scream.handle === this.props.User.handle){
            return true;
        }else{
            return false;
        }
    }

    render() {
        dayjs.extend(relativeTime);
        const {classes,scream:{body,createadAt,imageUrl,handle , likesCount , comments} , User : {authenticated , handle:UserHandle}} = this.props;
        return (
            <Card className={classes.card}>

                <CardMedia 
                image={imageUrl}
                title='Profile Image'
                className={classes.image}
                />

                <CardContent className={classes.content}>
                    <div className={classes.handleActionBar}>
                        <Typography variant='h5' color='secondary' component={Link} to={`/users/${handle}`} className={classes.handle}>{handle === UserHandle ? "You" : handle}</Typography>
                        {
                            authenticated && this.checkScream() ? (
                                        <div className={classes.deleteBtn}>
                                            <DeleteScream ID={this.props.scream.screamid} className={classes.iconBtn}/>
                                        </div>
                                        ) : ('')
                        }
                    </div>
                    
                    <Typography variant='caption' color='textSecondary'>{dayjs(createadAt).fromNow().toUpperCase()}</Typography>
                    <Typography variant='body1' className={classes.bodyText} color='inherit' style={{fontWeight:'600'}}>
                        {body}
                    </Typography>

                    <div className={classes.actionBar}>
                        <div>
                            {
                                authenticated ? (
                                    this.likedScream() ? (
                                        <MyButton tip = 'Unlike' color = "red" onClick={this.unlikescream}><Favorite style={{color:'red'}}/></MyButton>
                                        ) : (
                                        <MyButton tip = "Like" color = "red" onClick={this.likescream}><FavoriteBorder style={{color:'red'}}/></MyButton>
                                        )
                                ) : (
                                        <MyButton tip = "Login" color = "red" component={Link} to='/login'><FavoriteBorder style={{color:'red'}}/></MyButton>
                                )
                            }

                            <Typography variant='caption' style={{fontWeight:'500'}}>
                                {
                                    likesCount > 0 ? (
                                        likesCount === 1 ? (`1 Like`) : (`${likesCount} Likes`)
                                    ) : ('No likes yet')
                            }
                            </Typography>
                        </div>
                        <div className={classes.comment}>

                            <CommentScream screamid={this.props.scream.screamid} className={classes.commentDiv}/>

                            <Typography variant = 'caption' style={{fontWeight:'500'}}>
                            {
                                    comments > 0 ? (
                                        comments === 1 ? (`1 Comment`) : (`${comments} Comments`)
                                    ) : ('No comments yet')
                            }
                            </Typography>
                        </div>

                        <div className={classes.expand}>
                            <ShowScream openDialog={this.props.openDialog} scream={this.props.scream} />
                        </div>

                    </div>
                </CardContent>
                
                
            </Card>
        );
    }
}

scream.propTypes = {
    classes : PropTypes.object.isRequired,
    User : PropTypes.object.isRequired,
    data : PropTypes.object.isRequired,
    likeScream : PropTypes.func.isRequired,
    unlikeScream : PropTypes.func.isRequired

}

const mapStateToProps = state => ({
    User:state.user,
    data : state.data
})

const mapActionsToProps = {
    likeScream,
    unlikeScream
}

export default connect(mapStateToProps , mapActionsToProps)(withStyles(styles)(scream));