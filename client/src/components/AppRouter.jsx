import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import { publicRoutes, privateRoutes, adminRoutes } from '../router';


const AppRouter = () => {
    const isAuth = useSelector(store => store.Auth.status);
    const role = useSelector(store => store.Auth.user.role);
    return (
        isAuth 
            ?
            <Switch>
                {privateRoutes.map(route =>
                    <Route
                        key={route.path}
                        component={route.component}
                        path={route.path}
                        exact={route.exact}
                        // errorElement={route.error}
                    />
                )}
                if({role} === {"ADMIN"}) {
                    adminRoutes.map(route =>
                        <Route
                            key={route.path}
                            component={route.component}
                            path={route.path}
                            exact={route.exact}
                            // errorElement={route.error}
                        />
                    )
                }
                <Redirect to='/' />
            </Switch>
            :
            <Switch>
                {publicRoutes.map(route =>
                    <Route
                        key={route.path}
                        component={route.component}
                        path={route.path}
                        exact={route.exact}
                        // errorElement={route.error}
                    />
                )}
                <Redirect to='/login' />
            </Switch>
    )

}

export default AppRouter