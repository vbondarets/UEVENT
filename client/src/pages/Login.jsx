import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import classes from './css/Login.module.css';
import MyInput from '../components/UI/input/MyInput';
import MyButton from '../components/UI/button/MyButton';
import { Link } from 'react-router-dom';
import validation from '../validation/validation';
import joiUserLoginSchema from '../validation/userLoginSchema';
import UserSevice from '../API/UserService';
import { useFetching } from '../hooks/useFetching';
import { useDispatch} from 'react-redux';


const Register = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMesage] = useState('');
    const router = useHistory();
    const dispatch = useDispatch();

    const [fetchLogin, isLoginLoading, LoginError] = useFetching(async (User) => {
        try {
            const response = await UserSevice.login(User);
            console.log(response.data);
            if (response.data.message === "Succesfull") {
                const token = response.data.token; 
                localStorage.setItem('token', token);
                const user = response.data.userData;
                localStorage.setItem('user', user);
                dispatch({type: "LOGIN", payload: user});
                setLogin('');
                setPassword('');
                console.log(response.data);
                setError(response.data.message);
                setTimeout(() => {
                    setMesage('');
                    router.push("/");
                }, 500);
            }
        }
        catch (err) {
            setMesage(err.response.data.message);
            console.log(err.response.data);
            console.log(LoginError);
        }
    });
    const setError = (message) => {
        setMesage(message);
        setTimeout((e) => { setMesage('') }, 4000)
    }
    const logining = (e) => {
        console.log("login...")
        e.preventDefault();
        if (login, password && password !== '') {
            const User = {
                login: login,
                password: password,
            }
            const validationResult = validation(joiUserLoginSchema, User);
            if (validationResult !== "OK") {
                console.log(validationResult);
                setError(`${validationResult.field} is uncorrect`);
            }
            else {
                console.log(User);
                fetchLogin(User)
            }
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
                    <h1 className={classes.h1}>Login</h1>
                    <MyInput
                        value={login}
                        onChange={e => setLogin(e.target.value)}
                        type="text"
                        placeholder="Login"
                    />
                    <MyInput
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                        placeholder="Password"
                    />
                    <div className={classes.form_buttons}>
                        <MyButton onClick={(e) => logining(e)}>{"Login"}</MyButton>
                        <Link className={`${classes.login_link}`} to="/register">New here?</Link>
                    </div>
                    <h3 className={classes.error_message}>{message}</h3>

                </div>
            </div>
        </div>
    )
}

export default Register