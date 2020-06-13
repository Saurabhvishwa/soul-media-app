import React, { Component, Fragment } from 'react';
import MyButton from '../layout/MyButton';

// redux
import {connect} from 'react-redux';
import {deleteScream} from '../redux/actions/dataActions';

// material-ui
import withStyles from '@material-ui/styles/withStyles';
import {Delete , Cancel , CheckCircle} from '@material-ui/icons';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import Zoom from '@material-ui/core/Zoom';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

const styles = theme => ({
    dialogBox:{
        textAlign:'center',
        padding:theme.spacing(2),
    },
    dialogContent:{

    },
    dialogBoxText:{
        fontSize:theme.typography.body2,
    },
    btnContainer:{
        display:'flex',
        justifyContent:'space-evenly'
    },
    iconBtn:{
        height:theme.spacing(6),
        width:theme.spacing(6),
        [theme.breakpoints.down('sm')]:{
            height:theme.spacing(5),
            width:theme.spacing(5),
        }
    },
    icon:{
        transform:'scale(1.5)',
        [theme.breakpoints.down('sm')]:{
            transform:'scale(1)'
        }
    },
    delete:{
        [theme.breakpoints.down('sm')]:{
            height:20,
            width:20
        }
    }
})

class DeleteScream extends Component {
    constructor(){
        super();
        this.state = {
            open : false
        }
    }
    handleOpen = () => {
        this.setState({open:true})
    }

    handleClose = () => {
        this.setState({open:false})
    }

    handleDelete = () => {
        this.props.deleteScream(this.props.ID);
        // console.log(this.props.ID)
    }
    render() {

        const {classes} = this.props;
        return (
            <Fragment>
                <MyButton tip='Delete this post' className={classes.iconBtn} color="red" onClick={this.handleOpen}><Delete className={classes.delete} /></MyButton>
            <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            TransitionComponent={Zoom}
            className={classes.dialogBox}
          >
              <DialogTitle style={{color:"red"}}>Delete this scream</DialogTitle>

              <DialogContent className={classes.dialogContent}>
                <DialogContentText className={classes.dialogBoxText}>
                        Are you sure you want to delete this scream ? You won't be able to recover it back.
                </DialogContentText>
              </DialogContent>

              <DialogActions className={classes.btnContainer}>
                  <MyButton tip = 'Cancel' onClick={this.handleClose} color='red' className={classes.iconBtn}><Cancel className={classes.icon}/></MyButton>
                  <MyButton tip = 'Delete' onClick={this.handleDelete} color='#0097a7' className={classes.iconBtn}><CheckCircle className={classes.icon}/></MyButton>
              </DialogActions>

          </Dialog>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    data : state.data
})

const mapActionsToProps = {
    deleteScream
}

export default connect(mapStateToProps , mapActionsToProps)(withStyles(styles)(DeleteScream));