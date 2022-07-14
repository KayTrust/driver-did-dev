import * as bodyParser from "body-parser";
import express from "express";
import dotenv from 'dotenv';
import logger from "./logger";
import swaggerUi = require('swagger-ui-express');
import fs = require('fs');

import Routes from "./routes";

dotenv.config();
const port = process.env.PORT;

class App {

    public express: express.Application;

    private swaggerFile: any = (process.cwd()+"/swagger.json");
    private swaggerData: any = fs.readFileSync(this.swaggerFile, 'utf8');
    private swaggerDocument = JSON.parse(this.swaggerData);

    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
    }

    private middleware(): void {
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }

    private routes(): void {

        this.express.get("/", (req, res, next) => {
            res.send("Welcome to KT-Provider-Resolver-did-ev");
        });

        this.express.use("/api", Routes);

        this.express.use('/swagger', swaggerUi.serve, swaggerUi.setup(this.swaggerDocument));

        this.express.listen(port, () => {
          logger.info(`Server is running at https://localhost:${port}`);
        });
    }
}

export default new App().express;