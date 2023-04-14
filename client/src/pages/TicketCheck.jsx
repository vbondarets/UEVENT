import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import EventSevice from '../API/EventService';
import TicketSevice from '../API/TicketService';
import UserSevice from '../API/UserService';
import { useFetching } from '../hooks/useFetching';
import classes from './css/TicketCheck.module.css';

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
            // console.log(merchatData)
            const { data } = await EventSevice.getById(parseInt(merchatData.event_id));
            setEvent(data);
        }
        catch (err) {
            console.log(err.response.data);
        }
    });
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