import express from "express"
import helmet from "helmet";
import morgan from "morgan";
import { EVN } from "./util/env";
import auth from "./router/v1/authRouter";
import { urlencoded } from "body-parser";
import multer from "multer";
import user from "./router/v1/userRouter";


const app = express();


const media = multer({dest: "./uploads"});



app.use(helmet())
app.use(morgan("dev"));
app.use(urlencoded({extended: true}));

const baseRoute = "/api/v1";


app.use(`${baseRoute}/auth`, auth);
app.use(`${baseRoute}/user`, user);

const PORT = EVN.PORT || 5000;

app.get("/", (req, res) => {
    res.status(200).json("success");
});

app.listen(PORT, () => {
    console.log(`Listeing on port: ${PORT}`);
})