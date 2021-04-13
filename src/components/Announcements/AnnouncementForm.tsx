import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { announcementInterface } from '../../interfaces/Annoucement'



const AnnouncementForm = ({ saveAnnouncement}: {saveAnnouncement: Function}) => {
    const [title,setTitle] = useState("");
    const [content,setContent] = useState("");
    const [type,setType] = useState("");
    
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const submitValue = async () => {
    const newAnnouncement:announcementInterface = {
      title: title,
      content: content,
      type: type
    }
    await saveAnnouncement(newAnnouncement)
    handleClose()
  }

    return (
        <div>
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
         Add Announcement
        </Button>
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">{"Add Announcement"}</DialogTitle>
          <DialogContent>
            <TextField id="standard-basic" label="Title" onChange={e => setTitle(e.target.value)}/>
          </DialogContent>
          <DialogContent>
            <TextField id="standard-basic" label="Content" onChange={e => setContent(e.target.value)} />
          </DialogContent>
          <DialogContent>
          <FormControl component="fieldset">
        <FormLabel component="legend">Type</FormLabel>
        <RadioGroup aria-label="type" name="type1" value={type} onChange={e => setType (e.target.value)}>
          <FormControlLabel value="important" control={<Radio />} label="Important" />
          <FormControlLabel value="exams" control={<Radio />} label="Exams" />
          <FormControlLabel value="task" control={<Radio />} label="Task" />
        </RadioGroup>
      </FormControl>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose} color="primary">
              Cancle
            </Button>
            <Button onClick={submitValue} color="primary" autoFocus>
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </div>
     )
}
export default AnnouncementForm


  



