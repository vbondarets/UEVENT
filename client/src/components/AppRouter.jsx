import React from 'react';
// import { useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import { publicRoutes, privateRoutes, adminRoutes } from '../router';


const AppRouter = () => {
    const isAuth = false; //useSelector(state => state.status);
    const role = "USER";//useSelector(state => state.user.role);
    // return (
    //     <Routes>
    //         {publicRoutes.map(route =>
    //             <Route
    //                 key={route.path}
    //                 element={route.element}
    //                 path={route.path}
    //             // errorElement={route.error}
    //             />
    //         )}
    //     </Routes>
    // )
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