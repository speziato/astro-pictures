FROM node:lts-alpine as build

RUN apk upgrade --no-cache 

USER 1000
WORKDIR /app

ADD --chown=1000:1000 ./packages/batch/package*.json ./package-lock.json /app/
RUN npm ci

ADD --chown=1000:1000 ./packages/batch /app
RUN npm run build

FROM node:lts-alpine

LABEL maintaner=speziato license=mit

COPY --from=build --chown=1000:1000 --exclude=**/*node_modules --exclude=**/*src /app /app
WORKDIR /app

RUN apk upgrade --no-cache && apk add --no-cache fontconfig font-dejavu

USER 1000
RUN npm ci --omit=dev

CMD [ "npm", "run", "start" ]
