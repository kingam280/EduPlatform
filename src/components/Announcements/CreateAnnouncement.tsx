import React from 'react'
import axios from '../../config/axios'
import { useAppDispatch } from '../../app/hooks'
import { announcementInterface } from '../../interfaces/Annoucement';
import { fetchAnnouncements } from './AnnouncementsSlice'
import AnnouncementForm from './AnnouncementForm';
 
 
type shouldDisplay = {
    shouldDisplayCreateAnnouncement: boolean,
    setShouldDisplayCreateAnnouncement: (isTrue: boolean) => void
}
 
const CreateAnnouncement = () => {
    const dispatch = useAppDispatch()

const saveAnnouncement =  (body:  announcementInterface) => {
        axios
            .post('/announcements', body)
            .then(res => {
                dispatch(fetchAnnouncements())
            })
            .catch(err => console.log(err))
    }

    return (
            <AnnouncementForm saveAnnouncement={saveAnnouncement}/>
    )
    }
export default CreateAnnouncement