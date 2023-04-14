import registrationPage from '../pages/Registration';
import passwordResetPage from '../pages/PasswordReset'
import passwordResetStep2Page from '../pages/PasswordResetToken'
import loginPage from '../pages/Login';
import mainPage from '../pages/Main';
import EventsPage from '../pages/EventsPage';
import EventPage from '../pages/EventPage';
import CreateEventPage from '../pages/CreateEventPage';
import OrgPage from '../pages/OrgPage';
import Organizations from '../pages/Organizations';
import ListOfUsersPage from '../pages/ListOfUsersPage';
import TicketCheck from '../pages/TicketCheck';

export const publicRoutes = [
    {path: "/login", component: loginPage, exact: true},
    {path: "/register", component: registrationPage, exact: true},
    {path: "/password-reset", component: passwordResetPage, exact: true},
    {path: "/password-reset/:token", component: passwordResetStep2Page, exact: true},
    {path: "/", component: mainPage, exact: true},
    {path: "/events", component: EventsPage, exact: true},
    {path: "/events/:id", component: EventPage, exact: true},
    {path: "/organizations", component: Organizations, exact: true},
    {path: "/organizations/:id", component: OrgPage, exact: true},
    {path: "/error", component: registrationPage, exact: true}
];

export const privateRoutes = [
    {path: "/", component: mainPage, exact: true},
    {path: "/events", component: EventsPage, exact: true},
    {path: "/events/:id", component: EventPage, exact: true},
    {path: "/organizations", component: Organizations, exact: true},
    {path: "/organizations/:id", component: OrgPage, exact: true},
    {path: "/myaccount", component: registrationPage, exact: true},
    {path: "/error", component: registrationPage, exact: true},
    {path: '/create_event', component: CreateEventPage, exact: true},
    {path: '/list/:event_id', component: ListOfUsersPage, exact:true},
    {path: '/ticket/check/:token', component: ListOfUsersPage, exact:true},
    {path: '/payment', component: ListOfUsersPage, exact:true}
];

export const adminRoutes = [
    {path: "/admin", component: registrationPage, exact: true},
];

