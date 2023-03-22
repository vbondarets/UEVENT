import React, { useEffect, useState } from 'react';
// import { useHistory } from 'react-router-dom';
import classes from './css/Main.module.css';
// import MyButton from '../components/UI/button/MyButton';
// import { Link } from 'react-router-dom';
import OrganizationDiv from '../components/OrganizationDiv';
import InfSlider from '../components/InfSlider';
import { useFetching } from '../hooks/useFetching';
import OrgSevice from '../API/OgrSerivce';


const Main = () => {
    const [orgArr, setOrgArr] = useState([]);
    const [categoryArr, setCategoryArr] = useState([
        {
            name:'Sport',
            id: 1
        }, 
        {
            name:'Music',
            id: 2
        }, 
        {
            name:'Education',
            id: 3
        }, 
        {
            name:'Party',
            id: 4
        }, 
        {
            name:'Meetings',
            id: 5
        }
    ])
    const [fetchOrg, isOrgLoading, OrgError] = useFetching(async () => {
        try {
            const {data} = await OrgSevice.getAll();
            console.log(data);
            setOrgArr(data)
            
        }
        catch (err) {
            console.log(err.response.data);
        }
    });
    // const [fetchCategory, isCategoryLoading, CategoryError] = useFetching(async () => {
    //     try {
    //         const response = await OrgSevice.getAll();
    //         console.log(response);
            
    //     }
    //     catch (err) {
    //         console.log(err.response.data);
    //     }
    // });
    useEffect(() => {
        fetchOrg();
    }, []);
    return (
        <div className={classes.main_page_container}>
            <InfSlider categories={categoryArr}/>
            <div className={classes.organizations_container}>
                {orgArr.map((element, index) =>
                    <OrganizationDiv
                        key={element.name + index}
                        name={element.name}
                        img={element.img}
                    />
                )}
            </div>
            <div className={classes.events_container}>
                <h2>Events</h2>
            </div>
        </div>
    )
}

export default Main