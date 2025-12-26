FROM node:25-alpine

EXPOSE 3000

RUN mkdir /usr/app
WORKDIR /usr/app

ENV NEXT_PUBLIC_TURNSTILE_SITE_KEY=0x4AAAAAACFiGNWG2Rq3LqGG

COPY . .
RUN yarn install --production
RUN yarn next build

CMD ["yarn", "next", "start"]
