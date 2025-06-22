import express from "express";
import cors from "cors";
import {connDB} from "./config/db.js";
import dotenv from "dotenv"
import { userRouter } from "./routes/userRouter.js";
import taskRouter from "./routes/taskRouter.js";

const app = express();
dotenv.config()
const PORT = process.env.PORT || 3000;

// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

// DB CONNECT
connDB();

// ROUTES
app.use("/api/user",userRouter)
app.use("/api/tasks",taskRouter)

app.get("/",(req,res)=>{
    res.send("API Working")
})

app.listen(PORT, () => {
    console.log("Server is Listening at port :", PORT);
});
