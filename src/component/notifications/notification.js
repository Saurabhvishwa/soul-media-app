import React, { Component } from 'react';
import {connect} from 'react-redux';

// material-ui
import { ListItem , ListItemText, ListItemIcon} from '@material-ui/core';
import NotificationImportantRounded from '@material-ui/icons/NotificationImportantRounded';
import withStyles from '@material-ui/styles/withStyles';
import dayjs from 'dayjs';
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
    notificationDiv:{
        display:'flex',
        flexDirection:'column'
    },
    notificationItem:{
        // border:'1px solid gray',
        // width:'100%',
        paddingTop:0,
        paddingBottom:0,
        marginBottom:2,
        // backgroundColor:theme.palette.action.active
    },
    notificationContent:{
        display:'flex',
        flexDirection:'column'
    },
    dateStyle:{
        color:theme.palette.secondary.main
    }
})

class notification extends Component {
    render() {
        const {classes} = this.props;
        let {sender , createdAt , type} = this.props.notificationData;
        createdAt = dayjs(createdAt).fromNow();
        return (
            <div className={classes.notificationDiv}>
                <ListItem className={classes.notificationItem}>
                    <ListItemIcon><NotificationImportantRounded/></ListItemIcon>
                <div className={classes.notificationContent}>
                <ListItemText>
                    {
                    type === 'like' ? (
                        `${sender} liked your post`
                    ) : (
                        `${sender} commented on your post`
                    )
                    }
                    </ListItemText>
                    <ListItemText className={classes.dateStyle}>{createdAt}</ListItemText>
                </div>
                </ListItem>
                <Divider variant='middle' light={true} />
            </div>
        );
    }
}
const mapStateToProps = state => ({
    user : state.user
})
export default connect(mapStateToProps)(withStyles(styles)(notification));