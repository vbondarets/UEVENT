import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import TicketSevice from '../API/TicketService';
import { useFetching } from '../hooks/useFetching';

const TicketCheck = () => {
    const [event, setEvent] = useState({});
    const {token} = useParams();
    const [fetchEvent] = useFetching(async () => {
        try {
            const { data } = await TicketSevice.check(token);
            console.log(data);
            const res  = await TicketSevice.check(token);
            console.log(res);
            setEvent(data);
        }
        catch (err) {
            console.log(err.response.data);
        }
    });
    useEffect(() => {
        fetchEvent();
    }, []);

    return (
        <div>
            Ticket:
        </div>
    )
}

export default TicketCheck