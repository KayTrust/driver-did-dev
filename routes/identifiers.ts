import express from "express";
import logger from "../logger";
import dotenv from 'dotenv';

import EvResolver from '@kaytrust/ev-did-resolver';
import { Resolver } from 'did-resolver';

import fs = require('fs');

dotenv.config();

class Identifiers {

    public express: express.Application;
    private options: any = { 
        host: process.env.NODE_HOST,
        abiIM: JSON.parse(fs.readFileSync(process.cwd()+"/abiIM.json", 'utf8')),
        abiProxy: JSON.parse(fs.readFileSync(process.cwd()+"/abiProxy.json", 'utf8')),
        addressIM: process.env.ADDRESS_IM,
        headers: []
    };

    constructor() {
        this.express = express();
        this.routes();
    }

    private routes(): void {

        this.express.get("/identifiers/:identifier", async (req, res, next) => {
            const { params } = req;
            if (!params?.identifier) {
                res.status(400).send("Params not contains did");
                return;
            }
            const evResolver = EvResolver.getResolver(this.options);
            const resolver = new Resolver(evResolver);
            try {
                const didDocument: any = await resolver.resolve(params.identifier);
                logger.info(`Resolve did: ${params.identifier} - ${JSON.stringify(didDocument)}`);
                res.status(200).json(didDocument);
            } catch (error: any) {
                const responseMessage = `Can't resolve did: ${params.identifier}`;
                logger.error(`${responseMessage} - ${error.message}`);
                res.status(500).json(responseMessage);
            }
        });
    }
}

export default new Identifiers().express;