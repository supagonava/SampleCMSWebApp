
import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import compression from "compression";
import morgan from 'morgan';

import { Routes } from './interfaces/routes.interface';
import { dbConnection } from './databases/index';
import { createConnection } from "typeorm";


class App {
    public app: express.Application;
    public env: string;
    public port: string | number;

    constructor(routes: Routes[]) {
        this.app = express();
        this.env = process.env?.NODE_ENV || "development";
        this.port = (Number(process.env?.PORT || "8000"));

        this.connectToDatabase();
        this.initializeMiddlewares();
        this.initializeRoutes(routes);
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`🚀 App listening on http://127.0.0.1:${this.port}`);
        });
    }

    public getServer() {
        return this.app;
    }

    async connectToDatabase() {
        await createConnection(dbConnection);
    }

    private initializeMiddlewares() {
        this.app.use(cors({ origin: "*" }));
        this.app.use(compression());
        this.app.use(morgan('dev'));
        this.app.use(express.json({ limit: "20mb" }));
        this.app.use(cookieParser());
        this.app.engine("html", require("ejs").renderFile);
    }

    private initializeRoutes(routes: Routes[]) {
        routes.forEach((route) => {
            this.app.use("/", route.router);
        });
    }
}

export default App;
