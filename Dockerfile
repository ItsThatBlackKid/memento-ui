FROM node:12.16.1-alpine

RUN mkdir -p /srv/memento/ui && chown -R node:node /srv/memento/

WORKDIR /srv/memento/ui
COPY package*.json ./
USER root

RUN npm i

COPY ./nginx-proxy/memento.sheku-kanneh.com_location /etc/nginx/vhost.d

COPY . .


RUN npm run build

