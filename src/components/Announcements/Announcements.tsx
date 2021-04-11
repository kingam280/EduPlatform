import './Announcements.css'
import SingleAnnouncement from './SingleAnnouncement'
import Button from '@material-ui/core/Button'
import { announcementInterface } from '../../interfaces/Annoucement'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import React, { useEffect } from 'react'
import { fetchAnnouncements } from './AnnouncementsSlice'
import AddAnnouncement from './AnnouncementForm'



const Announcements = () => {
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(fetchAnnouncements())
    }, [dispatch])  

    const announcements: announcementInterface[] = useAppSelector(state => state.announcements.announcements)
    const loading = useAppSelector(state => state.announcements.loading)

    return (
        <div className ="container">

            <div className = "header">  
            <h1>Announcements</h1>
            <AddAnnouncement></AddAnnouncement>
            </div>  
            <h3></h3>
        <div>{announcements.map((value)=>{return <SingleAnnouncement key= {value._id} announcement={value}/>})}</div>
        </div>
    )
}   

export default Announcements;

 
