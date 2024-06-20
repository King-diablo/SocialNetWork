import express from "express"
import helmet from "helmet";
import morgan from "morgan";
import { EVN } from "./util/env";
import auth from "./router/v1/authRouter";
import { urlencoded } from "body-parser";
import multer from "multer";


const app = express();

const media = multer({ });

app.use(helmet())
app.use(morgan("dev"));
app.use(urlencoded({extended: true}));

app.use("/api/v1/auth", auth);

const PORT = EVN.PORT || 5000;

app.get("/", (req, res) => {
    res.status(200).json("success");
});

app.listen(PORT, () => {
    console.log(`Listeing on port: ${PORT}`);
})