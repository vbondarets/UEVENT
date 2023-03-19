import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAllEventsAction } from "../actions/EventAction";

const EventsPage = () => {
    const EventsStrore = useSelector(state => state.Events.allEvents)
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect ( () => {
        dispatch(getAllEventsAction())
    },[dispatch])
    const AllEvents = EventsStrore

    return (
        <div>
            <h1>All Events</h1>
            {AllEvents.map( events => {
                return (
                    <div key={events.event_id}>
                        <p onClick={ () => history.push(`/events/${events.event_id}`)}>{events.name}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default EventsPage;