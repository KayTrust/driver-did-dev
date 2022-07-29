FROM node:16 AS builder

WORKDIR /usr/src/app
COPY . .

RUN npm install
RUN npm run build

FROM node:16
WORKDIR /usr/src/dist
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/dist ./
RUN npm ci

ENV PORT=8000
ENV NODE_HOST=http://11.0.1.4
ENV ADDRESS_IM=0xa6b4540a2bfbe8663caa78027c83d0dcb1b7c837

EXPOSE 8000
CMD [ "node", "index.js" ]