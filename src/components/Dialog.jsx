import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import DescriptionIcon from '@material-ui/icons/Description';
import ClearIcon from '@material-ui/icons/Clear';
import TextField from "@material-ui/core/TextField";
import AddCommentIcon from '@material-ui/icons/AddComment';

import { useState } from 'react';

const style = makeStyles(theme => ({

  description: {
    overFlow: 'hidden',
    padding: '6px 8px 2px',
    position: 'relative',
    zIndex: '10',
    color: 'black',
    borderRadius: '3px',
    cursor: 'pointer',
    display: 'block',
    marginBottom: '8px',
    maxWidth: '300px',
    minHeight: '20px',
    position: 'relative',
    textDecoration: 'none',
    zIndex: 0,
  }

})
);

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },

});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

export default function CustomizedDialogs(props) {
  let [name, setName] = useState(props.name)
  let [editName, setEditName] = useState(true)
  const [isOpen, setIsOpen] = React.useState(true);
  const [isOpenComment, setIsOpenComment] = React.useState(true);
  let [descValue, setDescValue] = useState(props.descValue);
  let [commValue, setCommValue] = useState('')

  const classes = style()
  const handleClose = () => {
    props.isopen()
  };
  const openInput = () => {
    setEditName(!editName)
  };
  const handleInputChange = (event, initial) => {
    if (initial) {
      setCommValue(commValue = event.target.value)
    } else {
      setDescValue(descValue = event.target.value)
    }
  };
  const onNameChange = (event) => {
    setName(name = event.target.value)
  }
  const handleSave = () => {
    setEditName(!editName)
    const { onSave } = props;
    onSave(name);
  };

  const handleDescSave = () => {
    const { onDescSave } = props
    onDescSave(descValue)
    setIsOpen(!isOpen)

  }

  const openDescription = (initial) => {
    if (initial) {
      setIsOpenComment(!isOpenComment)
    }
    else {
      handleDescSave()

      setIsOpen(!isOpen);
    }
  };
  const handleAddComment = () => {
    const { onCommSave } = props
    onCommSave(commValue)
    setCommValue(commValue = '')
    setIsOpenComment(!isOpenComment)
  };

  const renderItem = (item) => {
    return (
      <div >
        {item}
        <Button style={{ color: '#5e6c84 ', textTransform: 'capitalize' }}>delet</Button>
      </div>
    );
  };

  return (
    <div>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={true} >
        {editName ? (
          <DialogTitle id="customized-dialog-title" onClose={handleClose} onClick={openInput}>
            {name}
          </DialogTitle>
        ) :
          <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            <input value={name} onChange={onNameChange} onClose={openInput} />
            <Button onClick={handleSave}>Save</Button>
          </DialogTitle>
        }
        <DialogContent dividers style={{ width: 500, height: 400, marginBottom: 10 }}>
          <Typography gutterBottom>
            <div className={classes.description} >
              <DescriptionIcon />
           Description
             <Button onClick={() => openDescription()} style={{ textTransform: 'capitalize', margin: 5, color: '#5e6c84 ' }}>Edit</Button>

            </div>
            {isOpen ? (
              <Typography gutterBottom>
                <div style={{ cursor: 'pointer' }} onClick={() => openDescription()} >
                  {descValue}
                </div>
              </Typography>
            ) : (
                <div style={{ display: "flex", flexDirection: 'column', }}>
                  <TextField id="outlined-basic"
                    placeholder='Enter a title for this card...'
                    variant="outlined"
                    value={descValue}
                    onChange={(event) => handleInputChange(event)}
                  />
                  <div>
                    <Button onClick={handleDescSave} variant="contained"
                      color="primary"
                      style={{ textTransform: 'capitalize' }}>
                      Save
                    </Button>
                    <ClearIcon style={{ cursor: 'pointer' }} onClick={() => openDescription()} />
                  </div>
                </div>
              )
            }

          </Typography>
          <Typography gutterBottom>
            <AddCommentIcon />
          Activity

          {isOpenComment ? (
              <Typography gutterBottom>
                <div style={{ cursor: 'pointer' }} onClick={() => openDescription('Comment')} >
                  Write a Comment
                </div>
                <Typography style={{ scrollMarginBottom: 10 }} gutterBottom>

                  {props.commList.map(item => renderItem(item))}
                </Typography>
              </Typography>
            ) : (
                <div style={{ display: "flex", flexDirection: 'column', }}>
                  <TextField id="outlined-basic"
                    placeholder='Enter a title for this card...'
                    variant="outlined"
                    value={commValue}
                    onChange={(event) => handleInputChange(event, 'comment')}
                  />
                  <div>
                    <Button onClick={handleAddComment} variant="contained"
                      color="primary"
                      style={{ textTransform: 'capitalize' }}>
                      Save
              </Button>
                    <ClearIcon style={{ cursor: 'pointer' }} onClick={() => openDescription('comment')} />
                  </div>
                </div>
              )
            }
          </Typography>
        </DialogContent>
      </Dialog>
    </div>
  );
}