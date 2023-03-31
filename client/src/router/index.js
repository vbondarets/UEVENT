import registrationPage from '../pages/Registration';
import passwordResetPage from '../pages/PasswordReset'
import passwordResetStep2Page from '../pages/PasswordResetToken'
import loginPage from '../pages/Login';
import mainPage from '../pages/Main';
import EventsPage from '../pages/EventsPage';
import EventPage from '../pages/EventPage';
import CreateEventPage from '../pages/CreateEventPage';

export const publicRoutes = [
    {path: "/login", component: loginPage, exact: true},
    {path: "/register", component: registrationPage, exact: true},
    {path: "/password-reset", component: passwordResetPage, exact: true},
    {path: "/password-reset/:token", component: passwordResetStep2Page, exact: true},
    {path: "/", component: mainPage, exact: true},
    {path: "/events", component: registrationPage, exact: true},
    {path: "/events/:id", component: registrationPage, exact: true},
    {path: "/organizations", component: registrationPage, exact: true},
    {path: "/organizations/:id", component: registrationPage, exact: true},
    {path: "/error", component: registrationPage, exact: true}
];

export const privateRoutes = [
    {path: "/", component: mainPage, exact: true},
    {path: "/events", component: EventsPage, exact: true},
    {path: "/events/:id", component: EventPage, exact: true},
    {path: "/organizations", component: registrationPage, exact: true},
    {path: "/organizations/:id", component: registrationPage, exact: true},
    {path: "/myaccount", component: registrationPage, exact: true},
    {path: "/error", component: registrationPage, exact: true},
    {path: '/create_event', component: CreateEventPage, exact: true}
];

export const adminRoutes = [
    {path: "/admin", component: registrationPage, exact: true},
];

