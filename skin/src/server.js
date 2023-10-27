import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import authRouter from "./routes/auth.routes.js";
import skinRoutes from "./routes/skin.routes.js";

const server = express();
server.use(morgan("dev")); // dev es la configuración de morgan para mensajes contos
server.use(express.json()); // expres podra convertir reques de cliente en json, sino es udefined
server.use(cookieParser()); // middleware que convierte cookie a JSON

server.use("/auth", authRouter);
server.use("/skins", skinRoutes);

export default server;
