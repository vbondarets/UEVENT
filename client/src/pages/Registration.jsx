import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
// import { useFetching } from '../hooks/useFetching';
import classes from './css/Register.module.css';
import MyInput from '../components/UI/input/MyInput';
import MyButton from '../components/UI/button/MyButton';
import { Link } from 'react-router-dom';
import validation from '../validation/validation';
import joiUserRegisterSchema from '../validation/userRegisterSchema';
import UserSevice from '../API/UserService';
import { useFetching } from '../hooks/useFetching';

const Register = () => {
    const [login, setLogin] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [message, setMesage] = useState('');
    const router = useHistory();

    const [fetchCreateUser, isCreateUserLoading, CreateUserError] = useFetching(async (User) => {
        try {
            const response = await UserSevice.register(User);
            console.log(response);
            if (response.data.message === "User created") {
                setLogin('');
                setEmail('');
                setFullName('');
                setPassword('');
                setConfirmPassword('')
                console.log(response.data);
                setError(response.data.message);
                setTimeout(() => {
                    setMesage('');
                    router.push("/login");
                }, 500);
            }
        }
        catch (err) {
            setMesage(err.response.data.message);
            console.log(err.response.data);
            console.log(CreateUserError);
        }
    });
    const setError = (message) => {
        setMesage(message);
        setTimeout((e) => {setMesage('')}, 4000)
    }
    const registration = (e) => {
        console.log("registration...")
        e.preventDefault();
        if(login, email, password, confirmPassword, fullName && password!=='' && confirmPassword!==''){
            if(password === confirmPassword){
                const User = {
                    login: login,
                    email: email,
                    password: password,
                    fullName: fullName
                }
                const validationResult = validation(joiUserRegisterSchema, User);
                if(validationResult !=="OK"){
                    console.log(validationResult);
                    setError(`${validationResult.field} is uncorrect`);
                }
                else{
                    console.log(User);
                    fetchCreateUser(User)
                }
            }
            else {
                setPassword('');
                setConfirmPassword('')
                setError("Passwords don't match");
                return;
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
                    <h1 className={classes.h1}>Registration</h1>
                    <MyInput
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        type="text"
                        placeholder="Email"
                    />
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
                    <MyInput
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        type="password"
                        placeholder="Confirm password"
                    />
                    <MyInput
                        value={fullName}
                        onChange={e => setFullName(e.target.value)}
                        type="text"
                        placeholder="Full Name"
                    />
                    <div className={classes.form_buttons}>
                        <MyButton onClick={(e) => registration(e)}>{"Register"}</MyButton>
                        <Link className={`${classes.login_link}`} to="/login">Already have accout?</Link>
                    </div>
                    <h3 className={classes.error_message}>{message}</h3>
                    
                </div>
            </div>
        </div>
    )
}

export default Register