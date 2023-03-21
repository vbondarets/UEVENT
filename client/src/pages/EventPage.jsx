import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { EventById, getAllCategory } from "../actions/EventAction";
import moment from 'moment'
const EventPage = (props) => {
    const {id} = useParams()
    const EventStore = useSelector(store => store.Events.Event)
    const CategoriesStore = useSelector(state => state.Events.categories)

    const dispatch = useDispatch()
    useEffect ( ()=> {
        dispatch(getAllCategory())
        dispatch(EventById(id))
    }, [dispatch])

    let category = 'No category yet'
    let Event = EventStore
    let categories = CategoriesStore
    if (Event.length !== 0) {
        for (let index = 0; index < categories.length; index++) {
            if (categories[index].category_id === Event[0].category_id) {
                category = categories[index].name
            }
        }
        return (
            <div>
                <p>Name: {Event[0].name}</p>
                <p>Region: {Event[0].region}</p>
                <p>Category: {category}</p>
                <p>Start at: {moment(Event[0].startDateTime).format('MMMM Do YYYY')}</p>
                <p>End at: {moment(Event[0].endDateTime).format('MMMM Do YYYY')}</p>
                <p>Number of tickets: {Event[0].tickets_count}</p>
                <p>Price: {Event[0].price}</p>
            </div>
        )
    }
    
}

export default EventPage