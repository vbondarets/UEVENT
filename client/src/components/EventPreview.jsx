import React, { useEffect, useState } from 'react'
import CategorySevice from '../API/CategoryService';
import OrgSevice from '../API/OrgSerivce';
import { useFetching } from '../hooks/useFetching';
import classes from './css/EventPreview.module.css';
import moment from 'moment';
import { Redirect } from 'react-router-dom';

const EventPreview = (props) => {
    const [org, setOrg] = useState({});
    const [category, setCategory] = useState({});

    const [fetchOrg, isOrgLoading, OrgError] = useFetching(async () => {
        try {
            const { data } = await OrgSevice.getById(props.event.organization_id);
            console.log(data);
            setOrg(data[0])

        }
        catch (err) {
            console.log(err.response.data);
        }
    });
    const [fetchCategory, isCategoryLoading, CategoryError] = useFetching(async () => {
        try {
            const { data } = await CategorySevice.getById(props.event.category_id);
            console.log(data);
            setCategory(data[0])

        }
        catch (err) {
            console.log(err.response.data);
        }
    });

    useEffect(() => {
        fetchOrg();
        fetchCategory();
    }, []);

    return (
        <div onClick={() => props.goTo(`http://localhost:3000/events/${props.event.event_id}`)} className={classes.event_prew_wrapper}>
            <p className={`${classes.event_prew_text} ${classes.event_prew_name}`}>{props.event.name}</p>
            <p className={`${classes.event_prew_text} ${classes.event_prew_date}`}>{moment(props.event.startDateTime).format('MMMM Do YYYY')}</p>
            <p className={`${classes.event_prew_text} ${classes.event_prew_time}`}>{moment(props.event.startDateTime).format('h:mm a')}</p>
            <p className={`${classes.event_prew_text} ${classes.event_prew_org}`}>{"By "}{org.name}</p>
            <p className={`${classes.event_prew_text} ${classes.event_prew_category}`}>{category.name}</p>

        </div>
    )
}

export default EventPreview