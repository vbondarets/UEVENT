const Page =  {};
const errorPage =  {};

export const publicRoutes = [
    {path: "/login", element: Page, errorElement: errorPage},
    {path: "/register", element: Page, errorElement: errorPage},
    {path: "/", element: Page, errorElement: errorPage},
    {path: "/events", element: Page, errorElement: errorPage},
    {path: "/events/:id", element: Page, errorElement: errorPage},
    {path: "/organizations", element: Page, errorElement: errorPage},
    {path: "/organizations/:id", element: Page, errorElement: errorPage},
    {path: "/error", element: Page, errorElement: errorPage},
    
];

export const privateRoutes = [
    {path: "/user", element: Page, errorElement: errorPage},
    {path: "/posts", element: Page, errorElement: errorPage},
    {path: "/posts/:id", element: Page, errorElement: errorPage},
    {path: "/user/:id", element: Page, errorElement: errorPage},
    {path: "/category/:id", element: Page, errorElement: errorPage},
    {path: "/error", element: Page, Page: true, errorElement: errorPage},
];

export const adminRoutes = [
    {path: "/admin", element: Page, errorElement: errorPage},
];

