import express, {Request, Response} from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from 'cors';

const app = express();
const port = 3000;

// Middlewares
app.use(cors())
app.use(helmet());
app.use(morgan("short"));
app.use(express.json());
app.use(express.static("public"));

// Just for test
app.get("/", (_req: Request, res: Response) => {
    res.status(200).json({
        status: "Success"
    })
})

// Express Server
app.listen(port, () => {
    console.log(`Server running at port: ${port}`);
});

export default app;