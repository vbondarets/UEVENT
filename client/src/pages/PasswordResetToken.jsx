import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import classes from './css/Login.module.css';
import MyInput from '../components/UI/input/MyInput';
import MyButton from '../components/UI/button/MyButton';
import UserSevice from '../API/UserService';
import { useFetching } from '../hooks/useFetching';
//import { useDispatch} from 'react-redux';


const ResetPassword = () => {
    const [pass, setNewPass] = useState('');
    const [repeatPass, setRepeatPass] = useState('');
    const [message, setMesage] = useState('');
    const router = useHistory();
    //const dispatch = useDispatch();

    const [fetchRequest, requesError] = useFetching(async (pass, repeatPass) => {
		if(pass !== repeatPass)
		{
			setMesage("Passwrods mismatch");
			return;
		}
        try {
			let token = window.location.pathname.substr(window.location.pathname.lastIndexOf('/') + 1);
            const response = await UserSevice.resetPassword(token, pass);
            console.log(response.data);

			setMesage(response.data.message);
			if(response.data.message === "Password changed") 
			{
				setTimeout(() => {
                    router.push("/");
				}, 1500);
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
        if (pass && pass !== '' && repeatPass && repeatPass !== '') {
            fetchRequest(pass, repeatPass);
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
                        value={pass}
                        onChange={e => setNewPass(e.target.value)}
                        type="password"
                        placeholder="New password"
                    />
					<MyInput
					value={repeatPass}
					onChange={e => setRepeatPass(e.target.value)}
					type="password"
					placeholder="Repeat password"
					/>
                    <div className={classes.form_buttons}>
                        <MyButton onClick={(e) => resetPass(e)}>{"Confirm"}</MyButton>
                    </div>
                    <h3 className={classes.error_message}>{message}</h3>

                </div>
            </div>
        </div>
    )
}

export default ResetPassword