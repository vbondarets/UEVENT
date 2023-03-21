import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAllCategory, getAllEventsAction, sortByCategory } from "../actions/EventAction";
import style from './css/EventsPage.module.css';

const EventsPage = () => {
    const EventsStrore = useSelector(state => state.Events.allEvents)
    const CategoriesStore = useSelector(state => state.Events.categories)

    let [array, setArray] = useState([])
    const handleCheck = (value) => {
        if (array.length === 0) {
            array.push(value)
        }
        else {
            const index = array.indexOf(value)
            if (index > -1) {
                array.splice(index, 1); 
            }
            else {
                array.push(value)
            }
        }
    };

    const dispatch = useDispatch()
    const history = useHistory()

    useEffect ( () => {
        dispatch(getAllCategory())
        dispatch(getAllEventsAction())
    },[dispatch])
    const AllEvents = EventsStrore
    const categories = CategoriesStore
    console.log(categories);
    if (AllEvents==='No events yet') {
        return (
            <div>
                <h1>All Events</h1>
                <p>No events yet</p>
            </div>
        )
    }
    else {  
        return (
            <div className={style.container}>
                <div className={style.sort_container}>
                    <h1>Sorting</h1>
                    <p>Sort by category</p>
                    <div onChange={e => {dispatch(sortByCategory(array))}}>
                        {categories.map(category => {
                            return (
                                <div>
                                    <input type='checkbox' value={category.category_id} id={category.category_id} onChange={e => handleCheck(e.target.value)}/>
                                    <label for={category.category_id}>{category.name}</label>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className={style.events_container}>
                {AllEvents.map( events => {
                    return (
                        <div key={events.event_id} className={style.events}>
                            <p onClick={ () => history.push(`/events/${events.event_id}`)}>{events.name}</p>
                            <p>Price:{events.price} uah</p>
                            <p>{events.tickets_count} tickets left</p>
                            <button className={style.buttonMore} onClick={ () => history.push(`/events/${events.event_id}`)}>More..</button>
                        </div>
                    )
                })}
                </div>
            </div>
        )
    }
}

export default EventsPage;