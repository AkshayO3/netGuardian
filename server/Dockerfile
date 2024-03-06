FROM node:20-alpine3.18

RUN addgroup app && adduser -S -G app app
RUN apk add --no-cache --repository=http://dl-cdn.alpinelinux.org/alpine/edge/main python3=3.11.8-r0 py3-pip
USER app

WORKDIR /app

COPY package*.json ./
USER root
RUN chown -R app:app .
USER app
RUN npm install
COPY . .
EXPOSE 3001

CMD npm start