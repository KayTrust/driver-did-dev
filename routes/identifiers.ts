import express from "express";
import logger from "../logger";
import dotenv from 'dotenv';

import EvResolver from '@kaytrust/ev-did-resolver';
import { Resolver } from 'did-resolver';

import fs = require('fs');

dotenv.config();

class Identifiers {

    public express: express.Application;
    private options: any = { };

    constructor() {
        this.express = express();
        this.loadOptions();
        this.routes();
    }

    private loadOptions(): void {
        if (process.env.NODE_HOST)
        this.options.host = process.env.NODE_HOST;
        if (process.env.ADDRESS_IM)
        this.options.addressIM = process.env.ADDRESS_IM;
        if (process.env.HEADERS)
        this.options.headers = JSON.parse(process.env.HEADERS);
        if (process.env.BASE_BLOCKS)
        this.options.baseBlocks = +process.env.BASE_BLOCKS;
        if (process.env.LAST_BLOCKS)
        this.options.lastBlocks = +process.env.LAST_BLOCKS;
        if (process.env.BUFFER_SIZE)
        this.options.bufferSize = +process.env.BUFFER_SIZE;
        if (process.env.START_BLOCK_MARGIN)
        this.options.startBlockMargin = +process.env.START_BLOCK_MARGIN;
        if (process.env.FIND_EVENTS)
        this.options.findEvents = process.env.FIND_EVENTS === 'true';
        if (process.env.KEYS)
        this.options.keys = JSON.parse(process.env.KEYS);
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