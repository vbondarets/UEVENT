import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom';
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
import TicketSevice from '../API/TicketService';
import EventSevice from '../API/EventService';
import eventClasses from './css/EventsPage.module.css';

const UserPage = () => {

	const [user, setUser] = useState({});
	let [ticketsAndEvents, setTicketsAndEvents] = useState({});
	const [isEditingName, setEditingName] = useState(false);
    const isAuth = useSelector(state => state.Auth.status);
    const selfUser = useSelector(state => state.Auth.user);

    const [fetchUser, isUserLoading, userError] = useFetching(async () => {
        try {
			let id = window.location.pathname.substr(window.location.pathname.lastIndexOf('/') + 1);
            const { data } = await UserSevice.getUserById(id);
            setUser(data)

        }
        catch (err) {
            console.log(err.response.data);
        }
    });

	const [fetchTickets, isTicketsLoading, ticketsError] = useFetching(async () => {
        try {
			let id = window.location.pathname.substr(window.location.pathname.lastIndexOf('/') + 1);
            const { data } = await TicketSevice.getOfUser(id);
			let events = {};
			for(let ticket of data) 
			{
				events[ticket.event_id] = (await EventSevice.getById(ticket.event_id)).data[0];
			}
			setTicketsAndEvents({tickets: data, events: events});
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
		delete localStorage.user;
		delete localStorage.token;
	}

    useEffect(() => {
        fetchUser();
        fetchTickets();
    }, []);

	let nameinputref = useRef();
	let nameref = useRef();
	let nameeditbuttonref = useRef();

    return (
		<>
		<div className={classes.ticket_list_header}>User info</div>
		<div className={classes.user_info_container}>


		{
			(isAuth && user.role === "ADMIN" && selfUser.userId == user.user_id) ? <MyButton>Admin panel</MyButton> : <></>
		}
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

		{selfUser.userId == user.user_id ? <MyButton onClick={logout}>Logout</MyButton> : <></>}
		</div>

		<div>
		<div className={classes.ticket_list_header}>Bought tickets</div>
		<div className={classes.user_tickets_list}>
			{
				ticketsAndEvents.tickets ? ticketsAndEvents.tickets.map((ticket, index)=>{
					const event = ticketsAndEvents.events[ticket.event_id];
					return <div key={index} className={eventClasses.events}>
						<img src={event.imgLink} style={{ width: "100%", height: '300px' }}></img>
                        <p style={{ marginLeft: '1%', fontSize: '20px', borderBottom: '1px solid rgb(19, 156, 19)', width: '90%', color: 'rgb(19, 156, 19)', fontWeight: 'bold' }}>{event.name}</p>
                        <p className={eventClasses.event_info}><b style={{ borderBottom: '1px solid rgb(19, 156, 19)', width: '90%', color: 'rgb(19, 156, 19)' }}>Description:</b> {event.description.substring(0, 20)}...</p>
                        <button className={eventClasses.buttonMore}
						onClick={
							()=>{
								TicketSevice.download(ticket.ticket_id, event.name + ".pdf");
							}
						}
						>View ticket</button>
					</div>
				}) : <></>
			}
		</div>
		</div>
		</>
    )
}

export default UserPage;