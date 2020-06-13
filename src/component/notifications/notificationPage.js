import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import MyButton from '../layout/MyButton';
import Notifications from '@material-ui/icons/Notifications';
import {connect} from 'react-redux';
import {makeNotificationsRead} from '../redux/actions/userActions';

// materia-ui
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Badge from '@material-ui/core/Badge';
import {FavoriteRounded , CommentRounded} from '@material-ui/icons';
import { Typography, Divider } from '@material-ui/core';
import withStyles from '@material-ui/styles/withStyles';

const styles = theme => ({
    notificationList :{
        height:800,
        overflowY:'scroll',
        [theme.breakpoints.down('sm')]:{
            height:500,
        },
    },
    alignItems:{
        marginLeft:'6px'
      },
      notItemDiv:{
          width:'auto'
      }
})

class NotificationPage extends Component {
  constructor(){
      super();
      this.state = {
          anchorEl : null
      }
  }
  handleClick = (e) => {
      this.setState({anchorEl:e.currentTarget})
  }

  handleClose = () => {
      this.setState({anchorEl:null})
  }

  handleReadNotifications = () => {
      let check = this.props.notifications.some(notification => notification.read === false);
      if(check){
        this.props.makeNotificationsRead();
      }
    
  }

  render(){
      const {anchorEl} = this.state;
      const {classes} = this.props;
      const {handle} = this.props.user;
      let notificationIcon;
      const notifications = this.props.notifications;
      if(notifications && notifications.length > 0){
        notifications.filter(notification => notification.read === false).length > 0 ? (
            notificationIcon = (
                <Badge badgeContent={notifications.filter(notification => notification.read === false && notification.sender !== handle).length} color="error">
                    <Notifications />
                </Badge>
            )
        ) : (
            notificationIcon = <Notifications/>
        )
      }else{
          notificationIcon = <Notifications/>
      }

      const notificationItems = notifications && notifications.length > 0 ? (
          notifications.filter(notification => notification.sender !== handle).map(notification => {
              var type = notification.type === 'like' ? 'liked' : 'commented on';
              var iconColor = notification.read === false ? 'error' : 'primary';
              var icon = notification.type === 'like' ? <FavoriteRounded color={iconColor}/> : <CommentRounded color={iconColor} />;
              return (
                  <div key={notification.notificationid} className={classes.notItemDiv}>
                  <MenuItem onClick={this.handleClose} component={Link} to={`/users/${notification.recipient}/screams/${notification.screamid}`}>
                      {icon}
                    <Typography className={classes.alignItems} variant='body2' color='textPrimary'>{`${notification.sender} ${type} your post`}</Typography>
                  </MenuItem>
                  <Divider variant='middle' light={true} />
                  </div>
              )
          })
      ) : (
        <MenuItem onClick={this.handleClose}>No notications yet</MenuItem>
      )



  return (
    <div>
        <MyButton tip = 'Notifications' color = 'white' onClick={this.handleClick}>
                    {notificationIcon}
        </MyButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={this.handleClose}
        className={classes.notificationList}
        onEntered={this.handleReadNotifications}
      >
    {notificationItems}
      </Menu>
    </div>
  );
  }
}

const mapStateToProps = state => ({
    notifications : state.user.notifications,
    user : state.user
})

const mapActionsToProps = {
    makeNotificationsRead
}

export default connect(mapStateToProps , mapActionsToProps)(withStyles(styles)(NotificationPage))