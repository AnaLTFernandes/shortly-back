import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routes/auth.router.js";
import urlRouter from "./routes/urls.router.js";
import userRouter from "./routes/users.router.js";

dotenv.config();

const server = express();

server.use(express.json());
server.use(cors());

server.use(authRouter);
server.use(urlRouter);
server.use(userRouter);

server.get("/status", (req, res) => {
	res.sendStatus(200);
});

server.listen(process.env.PORT, () =>
	console.log(`Server is listening on port ${process.env.PORT}`)
);
