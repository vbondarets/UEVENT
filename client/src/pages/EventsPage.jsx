import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { SortByTime, getAllCategory, getAllEventsAction, sort, sortEvents } from "../actions/EventAction";
import { getTypes } from "../actions/TypeAction";
import style from './css/EventsPage.module.css';
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import moment from "moment";


const EventsPage = () => {
    const EventsStrore = useSelector(state => state.Events.allEvents)
    const CategoriesStore = useSelector(state => state.Events.categories)
    const TypesStore = useSelector(state => state.Type.allTypes)
    const [categoryId, setCategoryId] = useState();

    function useQuery() {
        const { search } = useLocation();
        return useMemo(() => new URLSearchParams(search), [search]);
    }
    const query = useQuery();
    // const category = query.get("category") 
    /////vot////////

    let [array_category, setArray] = useState([])
    let [array_types, setArrayT] = useState([])
    let [sortE, setSortE ] = useState('')
    let [cost, setCost] = useState('')
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

    useEffect(() => {
        if (categoryId) {
            array_category.push(categoryId)
        }
        dispatch(getAllCategory())
        dispatch(getTypes())
        dispatch(sortEvents(array_category,array_types))
        // handleCheck_category(query.get("category"))
        setCategoryId(query.get("category"));
        /////vot/////
    }, [dispatch,categoryId])
    let AllEvents = EventsStrore
    const categories = CategoriesStore
    const types = TypesStore
    console.log(AllEvents);
    if (AllEvents === 'No events yet') {
        return (
            <div>
            <h1>All Events</h1>
            <p>No events yet</p>
        </div>
        )
    }
    else {
        AllEvents.sort((a,b)=> moment(b.startDateTime) -moment(a.startDateTime))
        const callback= () => {
            let jopa = AllEvents
            if (sortE=== 'new') {
                jopa.sort((a,b)=> moment(b.startDateTime) - moment(a.startDateTime))
            }
            if (sortE === 'old') {
                jopa.sort((a,b)=> moment(a.startDateTime) - moment(b.startDateTime))
            }
            if (sortE === 'high') {
                jopa.sort((a,b)=> b.price - a.price )
            }
            if (sortE === 'cheap') {
                jopa.sort((a,b)=> a.price - b.price)
            }
            console.log(jopa);
            AllEvents = jopa
            jopa = []
        }
        
        const checkBool = (category) => {
            if (array_category.length === 0) {
                return false
            }
            else {
                for (let index = 0; index < array_category.length; index++) {
                    if (array_category[index] === category.category_id.toString()) {
                        return true
                    }
                    else {
                        return false
                    }
                }
            }
        }
        return (
            <div className={style.container}>
                <div className={style.sort_container}>
                    <h1>Sorting</h1>
                    <div onChange= {callback()}>
                        <h3>Sort by:</h3>
                        <FormControl style={{width:'50%'}}>
                            <InputLabel style={{color:'rgb(19, 156, 19)'}} id="Time">Select by</InputLabel>
                            <Select
                                style={{color:'rgb(19, 156, 19)'}}
                                labelId="Time"
                                id="Time"
                                label="Time"
                                value={sortE}
                                onChange={(e) => setSortE(e.target.value)}
                            >
                                <MenuItem value='new'>Newest</MenuItem>
                                <MenuItem value='old'>Oldest</MenuItem>
                                <MenuItem value='high'>Highest price</MenuItem>
                                <MenuItem value='cheap'>Cheapest price</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div onChange={e => { dispatch(sortEvents(array_category, array_types)) }}>
                        <h3>Sort by category:</h3>
                        {categories.map(category => {
                            console.log(category);
                            if (categoryId) {
                                if (categoryId === category.category_id.toString()) {
                                    return (
                                        <div>
                                            <input type='checkbox' checked = {checkBool(category)} value={category.category_id} id={category.category_id} onChange={e => handleCheck_category(e.target.value)} />
                                            <label for={category.category_id}>{category.name}</label>
                                        </div>
                                    )
                                }
                                else {
                                    return (
                                        <div>
                                            <input type='checkbox' value={category.category_id} id={category.category_id} onChange={e => handleCheck_category(e.target.value)} />
                                            <label for={category.category_id}>{category.name}</label>
                                        </div>
                                    )
                                }
                            }
                            else {
                                return (
                                    <div>
                                        <input type='checkbox'  value={category.category_id} id={category.category_id} onChange={e => handleCheck_category(e.target.value)} />
                                        <label for={category.category_id}>{category.name}</label>
                                    </div>
                                )
                            }
                        })}
                        <h3>Sort by theme:</h3>
                        {types.map(_type => {
                            return (
                                <div>
                                    <input type='checkbox' value={_type.type_id} id={_type.type_id} onChange={e => handleCheck_type(e.target.value)} />
                                    <label for={_type.type_id}>{_type.name}</label>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className={style.events_container}>
                    {AllEvents.map(events => {
                        return (
                            <div key={events.event_id} className={style.events} >
                                <img src={events.imgLink} style={{ width: "100%", height: '300px' }}></img>
                                <p style={{ marginLeft: '1%', fontSize: '20px', borderBottom: '1px solid rgb(19, 156, 19)', width: '90%', color: 'rgb(19, 156, 19)', fontWeight: 'bold' }} onClick={() => history.push(`/events/${events.event_id}`)}>{events.name}</p>
                                <p className={style.event_info}><b style={{ borderBottom: '1px solid rgb(19, 156, 19)', width: '90%', color: 'rgb(19, 156, 19)' }}>Description:</b> {events.description.substring(0, 20)}...</p>
                                <p className={style.event_info}><b style={{ borderBottom: '1px solid rgb(19, 156, 19)', width: '90%', color: 'rgb(19, 156, 19)' }}>Price:</b> {events.price} uah</p>
                                <p className={style.tickets}>{events.tickets_count} tickets left</p>
                                <button className={style.buttonMore} onClick={() => history.push(`/events/${events.event_id}`)}>More..</button>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default EventsPage;