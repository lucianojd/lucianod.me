FROM node:25-alpine

EXPOSE 3000

RUN mkdir /usr/app
WORKDIR /usr/app

COPY . .
RUN yarn install --production
RUN yarn next build

CMD ["yarn", "next", "start"]
