import React, { useState } from 'react';
//import { useHistory } from 'react-router-dom';
import classes from './css/Login.module.css';
import MyInput from '../components/UI/input/MyInput';
import MyButton from '../components/UI/button/MyButton';
import UserSevice from '../API/UserService';
import { useFetching } from '../hooks/useFetching';
//import { useDispatch} from 'react-redux';


const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMesage] = useState('');
    //const router = useHistory();
    //const dispatch = useDispatch();

    const [fetchRequest, requesError] = useFetching(async (email) => {
        try {
            const response = await UserSevice.requestPasswordReset(email);
            console.log(response.data);
            if (response.data.message === "Succesfull") {
				setMesage("Check your email for password reset link.");
            }
        }
        catch (err) {
            setMesage(err.response.data.message);
            console.log(err.response.data);
            console.log(requesError);
        }
    });
    const setError = (message) => {
        setMesage(message);
        setTimeout((e) => { setMesage('') }, 4000)
    }
    const resetPass = (e) => {
        e.preventDefault();
        if (email && email !== '') {
            fetchRequest(email);
        }
        else {
            setError("Fill all fields pls");
            return;
        }
    }
    return (
        <div className={classes.registerWrapper}>
            <div className={classes.blur}>
                <div className={classes.registration_form}>
                    <h1 className={classes.h1}>Reset your password</h1>
                    <MyInput
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        type="text"
                        placeholder="Email"
                    />
                    <div className={classes.form_buttons}>
                        <MyButton onClick={(e) => resetPass(e)}>{"Send"}</MyButton>
                    </div>
                    <h3 className={classes.error_message}>{message}</h3>

                </div>
            </div>
        </div>
    )
}

export default ResetPassword