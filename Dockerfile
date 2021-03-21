FROM node:14.15 as base

ARG BOT_NAME
ARG API_HOST

WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
RUN env
RUN printf "$BOT_NAME\n$API_HOST\n" > .env.local
RUN npm install
RUN env
RUN npm run build

FROM nginx:1.19.8

EXPOSE 8080
COPY --from=base /app/out/ /var/www/notifier
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]
