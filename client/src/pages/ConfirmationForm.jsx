import moment from "moment";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { buyTickets } from "../actions/TicketAction";
import style from "./css/Conf.module.css"
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';


export const ConfirmationForm = ({event_id, amount, event_description, user_id, login}) => {
    const merchant_data = {
        user_id: user_id,
        name: login,
        event_id: event_id
    }
    let [promocode, setPromocode] = useState("")
    let [checked, setChecked] = useState(true)
    const dispatch = useDispatch()
    console.log(checked);
    return (
        <div className={style.container}>
            <h1>Confirmation</h1>
            <p>Login: {login}</p>
            <p>Price: {amount}</p>
            <p>Promocode: <input type="text" value={promocode} onChange={(e) => setPromocode(e.target.value)}></input></p>
            <FormControlLabel control={<Checkbox 
                defaultChecked value={checked} 
                onChange={()=> {
                        if(checked === false)  {
                            setChecked(true)
                        }
                        if (checked === true) {
                            setChecked(false)
                        }
                        }}/>} 
                label="Show you in list" />
            <button onClick={() => dispatch(buyTickets(moment(), event_description, "UAH", merchant_data, promocode, amount*100))}>Buy</button>
        </div>
    )
}