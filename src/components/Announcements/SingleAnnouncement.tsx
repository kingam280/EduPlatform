import { Card } from '@material-ui/core';
import { FunctionComponent } from 'react';
import { announcementInterface } from '../../interfaces/Annoucement';
import DeleteAnnouncement from './DeleteAnnouncement'

  
const SingleAnnouncement: React.FC<{ announcement: announcementInterface }> = ({ announcement }) => {
  
    return (
        
        <Card>
            <h3>{announcement.title}</h3>
            <p>{announcement.content}</p>
            <p>{announcement.type}</p>
            <DeleteAnnouncement id={announcement._id}/>
        </Card>
        
    )
}

export default SingleAnnouncement