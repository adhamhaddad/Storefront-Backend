import express, { Application } from 'express';
import helmet from 'helmet';
import product_handler_routes from './handler/Products';
import user_handler_routes from './handler/Users';
import order_handler_routes from './handler/Orders';
// Express App
const app: Application = express();
export const port = process.env.PORT || 3001;

// App Middlewares
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// App Requests
app.get('/', (_req: express.Request, res: express.Response) => {
    res.status(200).json({
        status: true,
        data: 'available endpoints to use: /users , /products , /orders, /order/1/products',
        message: 'Server request recieved successfully!',
    });
});
user_handler_routes(app);
product_handler_routes(app);
order_handler_routes(app);
// App Server
app.listen(port, () =>
    console.log(`Server Listening on http://localhost:${port}`)
);

export default app;
