FROM node:18-alpine

EXPOSE 3000

RUN mkdir /usr/app
WORKDIR /usr/app

COPY . .
RUN yarn
RUN yarn next build

CMD "yarn" "next" "build"
