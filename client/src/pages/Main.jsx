import React, { useEffect, useState } from 'react';
// import { useHistory } from 'react-router-dom';
import classes from './css/Main.module.css';
// import MyButton from '../components/UI/button/MyButton';
// import { Link } from 'react-router-dom';
import OrganizationDiv from '../components/OrganizationDiv';
import InfSlider from '../components/InfSlider';
import { useFetching } from '../hooks/useFetching';
import OrgSevice from '../API/OgrSerivce';
import CategorySevice from '../API/CategoryService';
import EventSevice from '../API/EventService';
import EventPreview from '../components/EventPreview';


const Main = () => {
    const [orgArr, setOrgArr] = useState([]);
    const [categoryArr, setCategoryArr] = useState([]);
    const [randomEvents, setRandomEvents] = useState([]);

    function randomIntFromInterval(min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    const [fetchEvent, isEventLoading, EventError] = useFetching(async () => {
        try {
            const { data } = await EventSevice.getAll();
            console.log(data);
            let randomEventIdexsArr = [];
            for(let i = 0; i < 8; i++){
                randomEventIdexsArr.push(randomIntFromInterval(1, data.length));
            }
            console.log(randomEventIdexsArr)
            let eventArr = [];
            for(let i = 0; i < randomEventIdexsArr.length; i++){
                eventArr.push(data[randomEventIdexsArr[i]])
            }
            console.log(eventArr);
            setRandomEvents(eventArr);
            // setRandomEvents(eventArr);
        }
        catch (err) {
            console.log(err.response.data);
        }
    });
    const [fetchOrg, isOrgLoading, OrgError] = useFetching(async () => {
        try {
            const { data } = await OrgSevice.getAll();
            console.log(data);
            setOrgArr(data)

        }
        catch (err) {
            console.log(err.response.data);
        }
    });
    const [fetchCategory, isCategoryLoading, CategoryError] = useFetching(async () => {
        try {
            const { data } = await CategorySevice.getAll();
            console.log(data);
            setCategoryArr(data)

        }
        catch (err) {
            console.log(err.response.data);
        }
    });
    useEffect(() => {
        fetchOrg();
        fetchCategory();
        fetchEvent();
    }, []);
    return (
        <div className={classes.main_page_container}>
            <InfSlider categories={categoryArr} />
            <div className={classes.organizations_container}>
                {orgArr.map((element, index) =>
                    <OrganizationDiv
                        key={element.organization_id}
                        name={element.name}
                        img={element.img}
                    />
                )}
            </div>
            <div className={classes.events_container}>
                {randomEvents.map((element, index) =>
                    <EventPreview 
                        event={element}
                        key={element.event_id}
                    />
                )}
            </div>
        </div>
    )
}

export default Main