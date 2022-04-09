FROM node:16-alpine

RUN corepack enable

WORKDIR /app
ADD . /app

RUN yarn
RUN yarn build

ENTRYPOINT [ "yarn", "start" ]