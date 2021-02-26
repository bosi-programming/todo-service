import express from "express";
import bodyParser from "body-parser";

import todoRouter from "./routes/todo";

import { connectToDataBase } from "./util/mongoConnection";

const app: express.Application = express();
const port = process.env.PORT || 3000;
connectToDataBase();

app.use(bodyParser.json());

app.use(todoRouter);

export const server = app.listen(port);

export default app;
