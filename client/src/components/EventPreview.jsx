import React, { useEffect, useState } from 'react'
import CategorySevice from '../API/CategoryService';
import OrgSevice from '../API/OgrSerivce';
import { useFetching } from '../hooks/useFetching';
import classes from './css/EventPreview.module.css'

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
        <div>
            <p>{props.event.name}</p>
            <p>{"By "}{org.name}</p>
            <p>{category.name}</p>

        </div>
    )
}

export default EventPreview