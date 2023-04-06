import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUsers } from "../actions/CommentAction";
import { getAllTicketsOnEvent } from "../actions/TicketAction";
import style from './css/List.module.css'


const ListOfUsersPage = () => {
    const {event_id} = useParams()
    let UserStore = useSelector(store => store.Comment)
    console.log(UserStore);
    let TicketStore = useSelector( store => store.Ticket)

    const dispatch = useDispatch()
    useEffect( () => {
        dispatch(getAllTicketsOnEvent(event_id))
        dispatch(getUsers())
    }, [dispatch])

    let tickets = TicketStore.tickets_On_Event
    let users = UserStore.Users
    if (tickets.length > 0) {
        let list = []
        for (let index = 0; index < users.length; index++) {
            for (let z = 0; z < tickets.length; z++) {
                if(users[index].user_id === tickets[z].user_id) {
                    list.push(users[index])
                }
            }
            
        }
        return (
            <>
                <div className={style.container}>
                    <h1>List of users:</h1>
                    <div className={style.List}>
                        {list.map(l => {
                            return(
                                <div className={style.user}>
                                    <p><b>Login: {l.login}</b></p>
                                    <p><b>Full Name: {l.fullname}</b></p>
                                    <p><b>Email: {l.email}</b></p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </>
        )
    }
    else {
        return (
            <>
                <h1>List of users:</h1>
                <h2 style={{color:'white', textAlign:"center"}}>No users yet</h2>
            </>
        )
    }
}

export default ListOfUsersPage