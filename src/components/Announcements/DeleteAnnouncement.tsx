import axios from '../../config/axios'
import { useAppDispatch } from '../../app/hooks'
import { fetchAnnouncements } from './AnnouncementsSlice'
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import { useState } from 'react';


const DeleteAnnouncement = ({ id } : { id?: string }) => {
    const announcementId = id;
    const dispatch = useAppDispatch()


const deleteAnnouncement =  () => {
    console.log(announcementId)
        axios
            .delete('/announcements/'+ announcementId)
            .then(res => {
                dispatch(fetchAnnouncements())
            })
            .catch(err => console.log(err))
    }

    return (
        <Button onClick={deleteAnnouncement}
        variant="contained"
        color="secondary"
        startIcon={<DeleteIcon />}
      >
        Delete
      </Button>

    )
    }
export default DeleteAnnouncement