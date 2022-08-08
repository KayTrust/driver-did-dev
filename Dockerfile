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

EXPOSE 8000
CMD [ "node", "index.js" ]