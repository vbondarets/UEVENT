import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import EventSevice from '../API/EventService';
import OrgSevice from '../API/OgrSerivce';
import EventPreview from '../components/EventPreview';
import { useFetching } from '../hooks/useFetching';
import classes from './css/OrgPage.module.css'
// import { redirect } from "react-router-dom";

const OrgPage = () => {

    const [organization, setOrganization] = useState({});
    const [randomEvents, setRandomEvents] = useState([]);
    const { id } = useParams();
    const router = useHistory();

    const [fetchOrg, isOrgLoading, OrgError] = useFetching(async () => {
        try {
            const { data } = await OrgSevice.getById(id);
            setOrganization(data[0])

        }
        catch (err) {
            console.log(err.response.data);
        }
    });
    function randomIntFromInterval(min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    const [fetchEvent, isEventLoading, EventError] = useFetching(async () => {
        try {
            const { data } = await EventSevice.getByOrg(organization.organization_id);
            let randomEventIdexsArr = [];
            for(let i = 0; i < 8; i++){
                randomEventIdexsArr.push(randomIntFromInterval(1, data.length));
            }
            // console.log(randomEventIdexsArr)
            let eventArr = [];
            for(let i = 0; i < randomEventIdexsArr.length; i++){
                eventArr.push(data[randomEventIdexsArr[i]])
            }
            // console.log(eventArr);
            setRandomEvents(eventArr);
            // setRandomEvents(eventArr);
        }
        catch (err) {
            console.log(err.response.data);
        }
    });
    const goTo = (link) =>{
        // console.log(link)
        // router.goBack()
        // router.push(link)
        // router.replace(link)
        // router.push("events")
        // router.go("/")
        console.log(router);
    }

    useEffect(() => {
        fetchOrg();
    }, []);
    useEffect(() => {
        fetchEvent()
    }, [organization]);

    return (
        <div>
            <p className={`${classes.org_name}`}>{organization.name}</p>
            <div className={classes.org_image_container}>
                <img className={classes.org_image} src={organization.img} alt={organization.name} />
            </div>
            <p className={`${classes.org_header} ${classes.org_text}`}>About:</p>
            <p className={`${classes.org_description} ${classes.org_text}`}>{organization.description}</p>
            <p className={`${classes.org_header} ${classes.org_text}`}>Location:</p>
            <p className={`${classes.org_location} ${classes.org_text}`}>{organization.location}</p>
            <p className={`${classes.org_header} ${classes.org_text}`}>Contacts:</p>
            <p className={`${classes.org_email} ${classes.org_text}`}>{organization.email}</p>
            <p className={`${classes.org_events}`}>Current events:</p>
            <div className={classes.events_container}>
                {randomEvents.map((element, index) =>
                    <EventPreview 
                        event={element}
                        key={element.event_id}
                        goTo = {goTo}
                    />
                )}
            </div>
        </div>

    )
}

export default OrgPage