FROM node:10.16.3-alpine

ENV NODE_ENV=production
ENV HOST=0.0.0.0

EXPOSE 3000

RUN mkdir -p /app
COPY . /app

WORKDIR /app

RUN yarn install --production
RUN yarn build

ENTRYPOINT ["yarn", "start"]