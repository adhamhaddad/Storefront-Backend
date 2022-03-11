import express, {Request, Response} from "express";
import helmet from "helmet";
import morgan from "morgan";


const app = express();
const port = 3000;

// Middlewares
app.use(express.json());
app.use(morgan("short"));
app.use(helmet());

// Just for test
app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        status: "Success",
        message: "Server Respond Successfuly!"
    })
})

// Express Server
app.listen(port, () => {
    console.log(`Server running at port: ${port}`);
});

export default app;