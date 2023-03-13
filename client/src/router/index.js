import registrationPage from '../pages/Registration';
import loginPage from '../pages/Login'


export const publicRoutes = [
    {path: "/login", component: loginPage, exact: true},
    {path: "/register", component: registrationPage, exact: true},
    {path: "/", component: registrationPage, exact: true},
    {path: "/events", component: registrationPage, exact: true},
    {path: "/events/:id", component: registrationPage, exact: true},
    {path: "/organizations", component: registrationPage, exact: true},
    {path: "/organizations/:id", component: registrationPage, exact: true},
    {path: "/error", component: registrationPage, exact: true},
    
];

export const privateRoutes = [
    {path: "/user", component: registrationPage, exact: true},
    {path: "/posts", component: registrationPage, exact: true},
    {path: "/posts/:id", component: registrationPage, exact: true},
    {path: "/user/:id", component: registrationPage, exact: true},
    {path: "/category/:id", component: registrationPage, exact: true},
    {path: "/error", component: registrationPage, exact: true},
];

export const adminRoutes = [
    {path: "/admin", component: registrationPage, exact: true},
];

