import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAllCategory, getAllEventsAction, sort, sortEvents } from "../actions/EventAction";
import { getTypes } from "../actions/TypeAction";
import style from './css/EventsPage.module.css';

const EventsPage = () => {
    const EventsStrore = useSelector(state => state.Events.allEvents)
    const CategoriesStore = useSelector(state => state.Events.categories)
    const TypesStore = useSelector(state => state.Type.allTypes)

    let [array_category, setArray] = useState([])
    let [array_types, setArrayT] = useState([])

    const handleCheck_category = (value) => {
        if (array_category.length === 0) {
            array_category.push(value)
        }
        else {
            const index = array_category.indexOf(value)
            if (index > -1) {
                array_category.splice(index, 1); 
            }
            else {
                array_category.push(value)
            }
        }
    };
    const handleCheck_type = (value) => {
        if (array_types.length === 0) {
            array_types.push(value)
        }
        else {
            const index = array_types.indexOf(value)
            if (index > -1) {
                array_types.splice(index, 1); 
            }
            else {
                array_types.push(value)
            }
        }
    };


    const dispatch = useDispatch()
    const history = useHistory()

    useEffect ( () => {
        dispatch(getAllCategory())
        dispatch(getTypes())
        dispatch(getAllEventsAction())
    },[dispatch])
    const AllEvents = EventsStrore
    const categories = CategoriesStore
    const types = TypesStore

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
                    <div onChange={e => {dispatch(sortEvents(array_category, array_types))}}>
                        <p>Sort by category</p>
                        {categories.map(category => {
                            return (
                                <div>
                                    <input type='checkbox' value={category.category_id} id={category.category_id} onChange={e => handleCheck_category(e.target.value)}/>
                                    <label for={category.category_id}>{category.name}</label>
                                </div>
                            )
                        })}
                        <p>Sort by theme:</p>
                        {types.map(_type => {
                            return (
                                <div>
                                    <input type='checkbox' value={_type.type_id} id={_type.type_id} onChange={e => handleCheck_type(e.target.value)}/>
                                    <label for={_type.type_id}>{_type.name}</label>
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