import registrationPage from '../pages/Registration';
import loginPage from '../pages/Login';
import mainPage from '../pages/Main';


export const publicRoutes = [
    {path: "/login", component: loginPage, exact: true},
    {path: "/register", component: registrationPage, exact: true},
    {path: "/", component: mainPage, exact: true},
    {path: "/events", component: registrationPage, exact: true},
    {path: "/events/:id", component: registrationPage, exact: true},
    {path: "/organizations", component: registrationPage, exact: true},
    {path: "/organizations/:id", component: registrationPage, exact: true},
    {path: "/error", component: registrationPage, exact: true}
    
];

export const privateRoutes = [
    {path: "/", component: mainPage, exact: true},
    {path: "/events", component: registrationPage, exact: true},
    {path: "/events/:id", component: registrationPage, exact: true},
    {path: "/organizations", component: registrationPage, exact: true},
    {path: "/organizations/:id", component: registrationPage, exact: true},
    {path: "/myaccount", component: registrationPage, exact: true},
    {path: "/error", component: registrationPage, exact: true}
];

export const adminRoutes = [
    {path: "/admin", component: registrationPage, exact: true},
];

