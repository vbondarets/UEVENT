import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import EventSevice from '../API/EventService';
import OrgSevice from '../API/OrgSerivce';
import EventPreview from '../components/EventPreview';
import { useFetching } from '../hooks/useFetching';
import classes from './css/UserPage.module.css'
import { useDispatch, useSelector } from 'react-redux';
import MyButton from '../components/UI/button/MyButton';
import MyModal from '../components/UI/MyModal/MyModal';

const OrgPage = () => {

	const [user, setUser] = useState({});

    const [fetchUser, isUserLoading, userError] = useFetching(async () => {
        try {
            //const { data } = await UserSevice.getById(id);
            setUser(data[0])

        }
        catch (err) {
            console.log(err.response.data);
        }
    });

    useEffect(() => {
        fetchUser();
    }, []);

    return (
		<div className={classes.user_info_container}>
			<div>
			
			</div>
		</div>
    )
}

export default OrgPage