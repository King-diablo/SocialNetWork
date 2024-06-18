import express from "express"
import helmet from "helmet";
import morgan from "morgan";
import { EVN } from "./util/env";

const app = express();

app.use(helmet())
app.use(morgan("dev"));

const PORT = EVN.PORT || 5000;

app.get("/", (req, res) => {
    res.status(200).json("success");
});

app.listen(PORT, () => {
    console.log(`Listeing on port: ${PORT}`);
})