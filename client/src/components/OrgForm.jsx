import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import MyButton from './UI/button/MyButton';
import MyInput from './UI/input/MyInput';
import classes from './css/OrgForm.module.css'
import { useFetching } from '../hooks/useFetching';
import OrgSevice from '../API/OrgSerivce';

const OrgForm = ({setModal, fetchOrg}) => {
    const [Name, setName] = useState('');
    const [Email, setEmail] = useState('');
    const [Location, setLocation] = useState('');
    const [Description, setDescription] = useState('');
    const [Img, setImg] = useState('');
    const User = useSelector(state => state.Auth.user);
    const [message, setMesage] = useState('');

    const [fetchCreateOgr, isCreateOrgLoading, CreateOrgError] = useFetching(async (body) => {
        try {
            const response = await OrgSevice.create(body);
            console.log(response);
            if (response.data === "Organization created") {
                setName('');
                setEmail('');
                setLocation('');
                setDescription('');
                setImg('')
                console.log(response.data);
                setTimeout(() => {
                    fetchOrg()
                    setModal(false)
                }, 500);
            }
        }
        catch (err) {
            setMesage(err.response);
        }
    });

    const CreateOrg = (e) => {
        e.preventDefault();
        if (Name, Email, Description, Location, Img) {
            const body = {
                user_id: User.userId,
                name: Name,
                email: Email,
                location: Location,
                description: Description,
                img: Img
            }
            console.log(body);
            fetchCreateOgr(body);
        }
        else {
            setError("Fill all data");
        }
    }
    const setError = (message) => {
        setMesage(message);
        setTimeout((e) => {setMesage('')}, 3000)
    }

    return (
        <form>
            <MyInput
                value={Name}
                onChange={e => setName(e.target.value)}
                type="text"
                placeholder="Name"
            />
            <MyInput
                value={Email}
                onChange={e => setEmail(e.target.value)}
                type="text"
                placeholder="Email"
            />
            <MyInput
                value={Location}
                onChange={e => setLocation(e.target.value)}
                type="text"
                placeholder="Location"
            />
            <MyInput
                value={Description}
                onChange={e => setDescription(e.target.value)}
                type="text"
                placeholder="Description"
            />
            <MyInput
                value={Img}
                onChange={e => setImg(e.target.value)}
                type="text"
                placeholder="Img"
            />
            <h3 className={classes.error_message}>{message}</h3>
            <MyButton onClick={CreateOrg}>Create</MyButton>
        </form>
    )

}

export default OrgForm