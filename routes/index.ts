import express from "express";
import logger from "../logger";

import Identifiers from "./identifiers";

class Routes {

    public express: express.Application;

    constructor() {
        this.express = express();
        this.routes();
    }

    private routes(): void {
        logger.info('Register identifiers routes');
        this.express.use("/", Identifiers);
    }
}

export default new Routes().express;