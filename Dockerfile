FROM node:14.15 as base

WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
RUN npm install
RUN env
RUN npm run build

FROM nginx:1.19.8

COPY --from=base /app/out/ /var/notifier
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]
