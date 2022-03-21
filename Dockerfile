FROM node:17-alpine

WORKDIR /app
ADD . /app

RUN npm install
RUN npm run build

ENTRYPOINT [ "npm", "run", "start" ]