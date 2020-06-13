import React, { Component } from 'react';
import MyButton from '../layout/MyButton';
import {connect} from 'react-redux';
import Notification from './notification';
// material-ui
import {Notifications} from '@material-ui/icons';
import withStyles from '@material-ui/styles/withStyles';
import Dialog from '@material-ui/core/Dialog';
import List from '@material-ui/core/List';
import { LinearProgress, Typography, Divider } from '@material-ui/core';
import Zoom from '@material-ui/core/Zoom';

const styles = theme => ({
    notificationDialog:{
    "& div":{
            padding:0
    },
    },
    icons:{
        transform:'scale(1.2)'
      },
      notificationList:{
          backgroundColor:'#cfd8dc',
        [theme.breakpoints.up('sm')]:{
            paddingLeft:theme.spacing(8)
        },
          [theme.breakpoints.down('sm')]:{
              paddingLeft:0
          },
          width:500,
          maxHeight:500,
          overflowY:'scroll',
          [theme.breakpoints.down('sm')]:{
              maxHeight:250,
              width:'auto'
          },
          "&::-webkit-scrollbar":{
              borderRadius:10,
              width:8,
              [theme.breakpoints.down('sm')]:{
                  width:2
              }
          },
          "&::-webkit-scrollbar-thumb":{
            borderRadius:10,
            backgroundColor:theme.palette.primary.main
          }
      }
})

class notificationHandler extends Component {
    constructor(){
        super();
        this.state = {
            open:false
        }
    }

    handleOpen = () => {
        this.setState({open:true})
    }
    handleClose = () => {
        this.setState({open:false})
    }
    render() {
        
        let {classes , user : {notifications , handle} , loading} = this.props;
        const {open} = this.state;

        notifications = notifications.filter(notification => notification.sender !== handle)
        
        let notificationList = !loading ? (
            notifications.length > 0 ? (notifications.map(notification =><Notification key={notification.notificationid} notificationData = {notification} />
                )) : (<div>Haven't got any notification</div>)
        ) : (
            <LinearProgress/>
        )
        return (
            <div>
                <MyButton tip = 'Notifications' color = 'white' onClick={this.handleOpen}>
                    <Notifications className={classes.icons}/>
                </MyButton>
                <Dialog
                TransitionComponent={Zoom}
                open={open}
                onClose={this.handleClose}
                className={classes.notificationDialog}
                maxWidth='lg'
                >
                    <List className={classes.notificationList}>
                        <Typography variant='h4' style={{padding:'8px 0',fontWeight:'700'}}>Notifications</Typography>
                        <Divider variant='middle' light={true}/>
                    {
                        notificationList
                    }
                    </List>
                </Dialog>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user : state.user,
    loading :state.user.loading
})

const mapActionsToProps = {

}

export default connect(mapStateToProps , mapActionsToProps)(withStyles(styles)(notificationHandler));