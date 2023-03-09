import React from 'react';
// import { useSelector } from 'react-redux';
import { Routes, Route } from "react-router-dom";
import { publicRoutes, privateRoutes, adminRoutes } from '../router';


const AppRouter = () => {
    const isAuth = true; //useSelector(state => state.status);
    const role = "USER";//useSelector(state => state.user.role);

    return (
        isAuth 
            ?
            <Routes>
                {privateRoutes.map(route =>
                    <Route
                        key={route.path}
                        elemrnt={route.component}
                        path={route.path}
                        errorElement={route.error}
                    />
                )}
                if({role} === {"ADMIN"}) {
                    adminRoutes.map(route =>
                        <Route
                            key={route.path}
                            elemrnt={route.component}
                            path={route.path}
                            errorElement={route.error}
                        />
                    )
                }
            </Routes>
            :
            <Routes>
                {publicRoutes.map(route =>
                    <Route
                        key={route.path}
                        elemrnt={route.component}
                        path={route.path}
                        errorElement={route.error}
                    />
                )}
            </Routes>
    )

}

export default AppRouter