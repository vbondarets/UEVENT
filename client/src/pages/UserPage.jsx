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
import UserSevice from '../API/UserService';
import MyInput from '../components/UI/input/MyInput';
import { useRef } from 'react';

const UserPage = () => {

	const [user, setUser] = useState({});
	const [isEditingName, setEditingName] = useState(false);
    const isAuth = useSelector(state => state.Auth.status);
    const selfUser = useSelector(state => state.Auth.user);

    const [fetchUser, isUserLoading, userError] = useFetching(async () => {
        try {
			console.log("a");
			let id = window.location.pathname.substr(window.location.pathname.lastIndexOf('/') + 1);
            const { data } = await UserSevice.getUserById(id);
            setUser(data)

        }
        catch (err) {
            console.log(err.response.data);
        }
    });

	const router = useHistory();

	const logout = () => 
	{
		//logout from an account
		router.push('/');
	}

    useEffect(() => {
        fetchUser();
    }, []);

	let nameinputref = useRef();
	let nameref = useRef();
	let nameeditbuttonref = useRef();

    return (
		<>
		<div className={classes.user_info_container}>
			<div className={classes.user_info_field}>
				{user.login}
			</div>
			<div className={classes.user_info_field}>
				
				
				<input className={classes.edit_field_input} ref={nameinputref} style={{display: 'none'}}></input>
				<div ref={nameref}>{user.fullname}</div>

				{selfUser.userId == user.user_id ?
				<div className={classes.edit_field_button} onClick={()=>{
					if(isEditingName) 
					{
						user.fullname = nameinputref.current.value;
						nameref.current.innetText = user.fullname;
						nameref.current.style.display = 'block';
						nameinputref.current.style.display = 'none';
						
						/*
						Send user full name change request here
						*/

						//
					}
					else 
					{
						nameinputref.current.value = user.fullname;
						nameref.current.style.display = 'none';
						nameinputref.current.style.display = 'block';
					}

					setEditingName(!isEditingName);

				}}>🖊️</div> : <></>}
			</div>
			<div className={classes.user_info_field}>
				{user.email}
			</div>
		</div>

		{
			(isAuth && user.role === "ADMIN" && selfUser.userId == user.user_id) ? <MyButton>Admin panel</MyButton> : <></>
		}
		{selfUser.userId == user.user_id ? <MyButton onClick={logout}>Logout</MyButton> : <></>}
		<div>

		</div>
		</>
    )
}

export default UserPage;