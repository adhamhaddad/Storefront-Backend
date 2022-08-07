import express, { Application } from 'express';
import helmet from 'helmet';
import product_handler_routes from './handler/Products';
import User_handler_routes from './handler/Users';
import Order_handler_routes from './handler/Orders';

// Express App
const app: Application = express();
export const port = process.env.PORT || 3001;

// App Middlewares
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// App Requests
product_handler_routes(app);
User_handler_routes(app);
Order_handler_routes(app);
// App Server
app.listen(port, () => console.log(`Server Listening on http://localhost:${port}`));

export default app;