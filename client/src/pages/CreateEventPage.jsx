import React, { useEffect, useState } from "react";
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Stack from '@mui/material/Stack';
import { useDispatch, useSelector } from "react-redux";
import { createEvent, getAllCategory } from "../actions/EventAction";
import { getTypes } from "../actions/TypeAction";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { getAllOrg } from "../actions/OrganizationAction";
import moment from 'moment'
import { useHistory } from "react-router-dom";
import style from "./css/createEvent.module.css"

const CreateEventPage = () => {
    const CategoriesStore = useSelector(state => state.Events.categories)
    const TypesStore = useSelector(state => state.Type.allTypes)
    const userStore = useSelector( state => state.Auth.user)
    const OrganizationStore = useSelector (state => state.Organization.allOrganization)

    let [name, setName] = useState('')
    let [description, setDescription] = useState('')
    let [address, setAddress] = useState('')
    let [num_tickets, setNum] = useState('')
    let [price, setPrice] = useState('') 
    let [startDate, setStartDate] = useState('')
    let [start, setStart] = useState("00:00")
    let [endDate, setEndDate] = useState('')
    let [finish, setFinish] = useState("00:00")
    let [type_val, setType] = useState('')
    let [category_val, setCategory] = useState('')
    let [org_val, setOrg] = useState('')

    const dispatch = useDispatch()
    const history = useHistory()
    useEffect ( () => {
        dispatch(getAllCategory())
        dispatch(getTypes())
        dispatch(getAllOrg())
    }, [dispatch])

    const sendReq = (e) => {
        let e_startDate = moment(startDate.valueOf())
        let e_endDate = moment(endDate.valueOf())
        let e_startTime = moment(start.valueOf())
        let e_endTime = moment(finish.valueOf())

        e.preventDefault();
        const exact_startDate = e_startDate.clone()
        const exact_finishDate = e_endDate.clone()
        const exact_startTime = e_startTime.clone()
        const exact_finishTime = e_endTime.clone()
        const full_start = exact_startDate.format('YYYY-MM-DD') + 'T' + exact_startTime.format('HH:mm') + ':00Z'
        const full_end = exact_finishDate.format('YYYY-MM-DD') + 'T' + exact_finishTime.format('HH:mm') + ':00Z'
        console.log(full_end);
        dispatch(createEvent(name, full_start, full_end, num_tickets, address, '', category_val, price, description, type_val, org_val))
        history.push('/events')
    }

    let types = TypesStore
    let categories = CategoriesStore
    let orgs = OrganizationStore
    if (types.length != 0 && categories.length != 0 && orgs.length != 0) {
        let organization_user = []
        for (let index = 0; index < orgs.length; index++) {
            if (orgs[index].author_id === userStore.userId) {
                organization_user.push(orgs[index])
            }
        }
        return (
            <>
                <div className={style.container}>
                    <h1>Create Event</h1>
                    <input className={style.inputFields} type="text" placeholder="Enter name of your event" value={name} onChange={e => setName(e.target.value)}></input>
                    <textarea className={style.inputFields} maxLength="255" rows="10" cols="50" placeholder="Enter description of your event" value={description} onChange={e => setDescription(e.target.value)}></textarea>
                    <input className={style.inputFields} type="text" placeholder="Enter address of your event" value={address} onChange={e => setAddress(e.target.value)}></input>
                    <input className={style.inputFields} type="number" placeholder="Enter number of tickets" value={num_tickets} onChange={e => setNum(e.target.value)}></input>
                    <input className={style.inputFields} type = "number" placeholder="Enter price of tickets" value={price} onChange={e => setPrice(e.target.value)}></input>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Stack spacing={3}>
                                <div className={style.divDateStart}>
                                    <DatePicker 
                                        label = 'Date start'
                                        value={startDate}
                                        onChange={setStartDate}
                                    />
                                    <TimePicker
                                        label = 'Event start'
                                        ampm={false}
                                        minutesStep={5}
                                        value={start}
                                        onChange={setStart}
                                    />
                                </div>
                                <div className={style.divDateEnd}>
                                    <DatePicker 
                                        label = 'Date end'
                                        value={endDate}
                                        onChange={setEndDate}
                                    />
                                    <TimePicker
                                        label = 'Event end'
                                        ampm={false}
                                        minutesStep={5}
                                        value={finish}
                                        onChange={setFinish}
                                    />
                                </div>
                        </Stack>
                    </LocalizationProvider>
                    <div className={style.containerChoose}>
                        <FormControl fullWidth margin="normal">
                            <InputLabel id="label_type">Type</InputLabel>
                            <Select
                                labelId="label_type"
                                id="labelselect_type"
                                value={type_val}
                                label="Type"
                                onChange={e => setType(e.target.value)}
                            >
                                {types.map(type => {
                                    return (
                                        <MenuItem value={type.type_id}>{type.name}</MenuItem>
                                    )
                                })}
                            </Select>
                        </FormControl>

                        <FormControl fullWidth margin="normal">
                            <InputLabel id="label">Category</InputLabel>
                            <Select
                                labelId="label"
                                id="labelselect"
                                value={category_val}
                                label="Category"
                                onChange={ e => setCategory(e.target.value)}
                            >
                                {categories.map(category => {
                                    return (
                                        <MenuItem value={category.category_id}>{category.name}</MenuItem>
                                    )
                                })}
                            </Select>
                        </FormControl>

                        <FormControl fullWidth="true" margin="normal">
                            <InputLabel id="label_orgs">Organization</InputLabel>
                            <Select
                                labelId="label_orgs"
                                id="labelselect_orgs"
                                value={org_val}
                                label="Organization"
                                onChange={ e => setOrg(e.target.value)}
                            >
                                {organization_user.map(org => {
                                    return (
                                        <MenuItem value={org.organization_id}>{org.name}</MenuItem>
                                    )
                                })}
                            </Select>
                        </FormControl>
                    </div>
                    <button className={style.buttonCreate} onClick={ (e) => {sendReq(e)}}>Create event</button>        
                </div>
            </>
        )
    }
}


export default CreateEventPage