import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import EventSevice from '../API/EventService';
import TicketSevice from '../API/TicketService';
import UserSevice from '../API/UserService';
import { useFetching } from '../hooks/useFetching';
import classes from './css/TicketCheck.module.css';
import moment from 'moment';
import EventPreview from '../components/EventPreview';

const TicketCheck = () => {
    const [merchatData, setMerchatData] = useState();
    const [user, setUser] = useState();
    const [event, setEvent] = useState();
    const {token} = useParams();
    const history = useHistory();
    const [fetchTicket] = useFetching(async () => {
        try {
            const { data } = await TicketSevice.check(token);
            setMerchatData(data.data);
        }
        catch (err) {
            console.log(err.response.data);
        }
    });
    const [fetchUser] = useFetching(async () => {
        try {
            const { data } = await UserSevice.getUserById(merchatData.user_id);
            setUser(data);
        }
        catch (err) {
            console.log(err.response.data);
        }
    });
    const [fetchEvent] = useFetching(async () => {
        try {
            const { data } = await EventSevice.getById(parseInt(merchatData.event_id));
            console.log(data)
            setEvent(data);
        }
        catch (err) {
            console.log(err.response.data);
        }
    });
    const goTo = (link) =>{
        window.location.href = link;
    }
    useEffect(() => {
        fetchEvent();
        fetchUser()
    }, [merchatData]);
    useEffect(() => {
        fetchTicket();
    }, []);

    return (
        <div>
            {event 
                ?
                <div>
                    <p className={classes.header_ok}>Your ticket is valid</p>
                    <p className={classes.ticket_header}>Ticket info</p>
                    <p className={classes.ticket_info}>{user.fullname}</p>
                    <p className={classes.ticket_info}>To {event[0].name}</p>
                    <p className={classes.ticket_info}>{moment(event[0].startDateTime).format('MMMM Do YYYY')}</p>
                    <p className={classes.ticket_info}>At {moment(event[0].startDateTime).format('h:mm a')}</p>
                    <p className={classes.ticket_event}>Your event: </p>
                    <EventPreview
                            adress={`http://localhost:3000/events/${event[0].event_id}`}
                            event={event[0]}
                            goTo = {goTo}
                    />
                </div>
                :
                <div>
                    <p className={classes.header_no}>Your ticket is not valid</p>
                    {/* {console.log(history)} */}
                </div>
            }
        </div>
    )
}

export default TicketCheck