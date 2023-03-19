import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { EventById } from "../actions/EventAction";
import moment from 'moment'
const EventPage = (props) => {
    const {id} = useParams()
    const EventStore = useSelector(store => store.Events.Event)
    const dispatch = useDispatch()
    useEffect ( ()=> {
        dispatch(EventById(id))
    }, [dispatch])
    
    let Event = EventStore
    if (Event.length !== 0) {
        return (
            <div>
                <p>Name: {Event[0].name}</p>
                <p>Region: {Event[0].region}</p>
                <p>Start at: {moment(Event[0].startDateTime).format('MMMM Do YYYY')}</p>
                <p>End at: {moment(Event[0].endDateTime).format('MMMM Do YYYY')}</p>
                <p>Number of tickets: {Event[0].tickets_count}</p>
            </div>
        )
    }
    
}

export default EventPage