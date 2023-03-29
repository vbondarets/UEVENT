import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { DeleteSubscribe, EventById, getAllCategory, getAllEventsAction, getAllSubsOnEvent, SubscribeOnEvent } from "../actions/EventAction";
import moment from 'moment'
import { getAllOrg } from "../actions/OrganizationAction";
import { getTypes } from "../actions/TypeAction";
import style from './css/EventPage.module.css'
import { GoogleMap, InfoWindow, LoadScript, Marker } from "@react-google-maps/api";
import Geocode from "react-geocode";
import axios from "axios";
import { MapComponent } from "./MapComponent";
import { CommentComponent } from "./CommentComponent";
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

Geocode.setApiKey("");
const geocodingQuery = async (address) => {
    const res = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=ApiKey`);
    const json = res.data;
    if (json.results.length === 0) {
        return null;
    }
    let lat = json.results['0'].geometry.location.lat;
    let lng = json.results['0'].geometry.location.lng;
    return { lat, lng };
  }

const EventPage = (props) => {
    const {id} = useParams()
    let isSub = false

    const EventStore = useSelector(store => store.Events.Event)
    const CategoriesStore = useSelector(state => state.Events.categories)
    const OrganizationStore = useSelector (state => state.Organization.allOrganization)
    const ThemesStore = useSelector (state => state.Type.allTypes)
    const EventsStrore = useSelector(state => state.Events.allEvents)
    const SubsStore = useSelector(state => state.Events.subsriptions)
    const UserStore = useSelector( store => store.Auth)

    const dispatch = useDispatch()
    const history = useHistory()
    useEffect ( ()=> {
        dispatch(getAllEventsAction())
        dispatch(getTypes())
        dispatch(getAllOrg())
        dispatch(getAllCategory())
        dispatch(EventById(id))
        dispatch(getAllSubsOnEvent(id))
    }, [dispatch, id])
    
    
    let category = 'No category yet'
    let organization_name = "With out organization"
    let description_organization = "No description"
    let theme = 'No theme yet'
    let organization_id = null
    let organization_events = []
    let similar_events = []
    
    let Event = EventStore
    let categories = CategoriesStore
    let organization = OrganizationStore
    let themes = ThemesStore
    let allEvents = EventsStrore
    let subs = SubsStore
    if (Event.length !== 0) {
        console.log(subs);
        let adress = Event[0].region
        
        for (let index = 0; index < subs.length; index++) {
            if (subs[index].user_id === UserStore.user.userId) {
                isSub = true
            }
        }
        for (let index = 0; index < categories.length; index++) {
            if (categories[index].category_id === Event[0].category_id) {
                category = categories[index].name
            }
        }
        for (let index = 0; index < organization.length; index++) {
            if (organization[index].organization_id === Event[0].organization_id) {
                organization_name = organization[index].name
                description_organization = organization[index].description
                organization_id = organization[index].organization_id
            }
        }
        for (let index = 0; index < themes.length; index++) {
            if (themes[index].type_id === Event[0].type_id) {
                theme = themes[index].name
            }
        }
        for (let index = 0; index < allEvents.length; index++) {
            if (allEvents[index].event_id === organization_id && allEvents[index].event_id != id) {
                organization_events.push(allEvents[index])
            }
        }
        for (let index = 0; index < allEvents.length; index++) {
            if ((allEvents[index].category_id === Event[0].category_id || allEvents[index].type_id === Event[0].type_id) && allEvents[index].name != Event[0].name) {
                similar_events.push(allEvents[index])
            }
        }

        return (
            <div className={style.container}>
                <div className={style.info_container}>
                    <div className={style.other_info_container}>
                        <h2>Description</h2>
                        <p>{Event[0].description}</p>
                        <h2>About Organization:</h2>
                        <p>{description_organization}</p>
                        <h2>Map:</h2>
                        <MapComponent address = {adress}></MapComponent>
                    </div>
                    <div className={style.info_event}>
                        <div style={{display:'flex', alignItems:'center'}}>
                            <h1>About Event</h1>
                            {isSub === false ?
                            <NotificationsIcon
                                onClick = { () => {dispatch(SubscribeOnEvent(id, UserStore.user.userId)); isSub = true}}
                                className={style.NotificationsIcon} />
                            :
                            <NotificationsActiveIcon 
                                onClick = { () => {dispatch(DeleteSubscribe(id, UserStore.user.userId)); isSub = false}}
                                className={style.NotificationsActiveIcon}/>}
                        </div>
                        <p className={style.info_event_p}><b>Name:</b> {Event[0].name}</p>
                        <p className={style.info_event_p}><b>Region:</b> {Event[0].region}</p>
                        <p className={style.info_event_p}><b>Category:</b> {category}</p>
                        <p className={style.info_event_p}><b>Theme:</b> {theme}</p>
                        <p className={style.info_event_p}><b>Organization:</b> {organization_name}</p>
                        <p className={style.info_event_p}><b>Start at:</b> {moment(Event[0].startDateTime).format('MMMM Do YYYY')}</p>
                        <p className={style.info_event_p}><b>End at:</b> {moment(Event[0].endDateTime).format('MMMM Do YYYY')}</p>
                        <p className={style.info_event_p}><b>Price:</b> {Event[0].price} uah</p>
                        <p className={style.left_tickets}>{Event[0].tickets_count} tickets left...</p>
                        <button>Buy</button>
                    </div>
                </div>
                <div className={style.sim_and_org_events}>
                    <h2>Other events from {organization_name}</h2>
                    <div className={style.constainer_org_events}>
                        {organization_events.map(event => {
                            return (
                            <div key={event.event_id} className={style.org_events}>
                                    <p>{event.name}</p>
                                    <p><b>Price:</b> {event.price} uah</p>
                                    <p style={{fontSize:'14px', textAlign:'center'}}>{event.tickets_count} tickets left</p>
                                    <button> More... </button>
                                </div> 
                            )
                            
                        })}
                    </div>
                    <h2>Similar events:</h2>
                    <div className={style.container_sim_events}>
                        {similar_events.map(event => {
                            return (
                            <div key={event.event_id} className={style.sim_events}>
                                    <p>{event.name}</p>
                                    <p><b>Price:</b> {event.price} uah</p>
                                    <p style={{fontSize:'14px', textAlign:'center'}}>{event.tickets_count} tickets left</p>
                                    <button>More... </button>
                                </div> 
                            )
                            
                        })}
                    </div>
                    <div>
                        <h2>Comments</h2>
                        <CommentComponent event_id = {id}></CommentComponent>
                    </div>
                </div>
            </div>
        )
    }
    
}

export default EventPage