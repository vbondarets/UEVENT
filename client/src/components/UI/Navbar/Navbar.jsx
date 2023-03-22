import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import classes from "./Navbar.module.css";

const Navbar = () => {
    // const isAuth = false;
    const isAuth = useSelector(state => state.Auth.status);
    // const user = {
    //     login: "test",
    //     role: "USER"
    // }
    const user = useSelector(state => state.Auth.user);
    // const [check, setCheck] = useState(isAuth);
    // useEffect(() => {
    //     setCheck(isAuth);
    // }, [isAuth]);
    {
        if (isAuth && user.role !== "ADMIN") {
            return (
                <div className={classes.navbar}>
                    <div className={classes.navbar__links}>
                        <Link className={`${classes.navbar__title} + ${classes.navbar__link}`} to="/">UEVENT</Link>
                        <Link className={classes.navbar__link} to="/events">events</Link>
                        <Link className={classes.navbar__link} to="/organization">organizations</Link>
                        <Link className={`${classes.navbar__link__username} + ${classes.navbar__link}`} to="/myaccount">{user.login}</Link>
                    </div>
                </div>
            )
        }
        if (isAuth && user.role === "ADMIN") {
            return (
                <div className={classes.navbar}>
                    <div className={classes.navbar__links}>
                        <Link className={`${classes.navbar__title} + ${classes.navbar__link}`} to="/">UEVENT</Link>
                        <Link className={classes.navbar__link} to="/events">events</Link>
                        <Link className={classes.navbar__link} to="/organization">organizations</Link>
                        <Link className={`${classes.navbar__link__username} + ${classes.navbar__link}`} to="/myaccount">{user.login}</Link>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div className={classes.navbar}>
                    <div className={classes.navbar__links}>
                        <Link className={`${classes.navbar__title} + ${classes.navbar__link}`} to="/">UEVENT</Link>
                        <Link className={`${classes.navbar__link} + ${classes.login_link}`} to="/login">login</Link>
                        <Link className={classes.navbar__link} to="/register">register</Link>
                    </div>
                </div>
            )
        }
    }

}

export default Navbar