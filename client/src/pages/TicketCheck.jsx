import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import TicketSevice from '../API/TicketService';
import { useFetching } from '../hooks/useFetching';
import classes from './css/TicketCheck.module.css';

const TicketCheck = () => {
    const [event, setEvent] = useState();
    const {token} = useParams();
    const history = useHistory();
    const [fetchEvent] = useFetching(async () => {
        try {
            const { data } = await TicketSevice.check(token);
            // console.log(JSON.parse(data.merchant_data));
            // const res  = await TicketSevice.check(token);
            console.log(data);
            setEvent(data);
            console.log(JSON.parse(data.merchant_data));
        }
        catch (err) {
            console.log(err.response.data);
        }
    });
    // useEffect(() => {
    //     // fetchEvent();
    // }, [event]);
    useEffect(() => {
        fetchEvent();
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