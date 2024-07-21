FROM node:20-slim AS build

WORKDIR /app

COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json

RUN npm ci

COPY . /app

RUN npm run build

ARG VITE_AUTH0_USERNAME
ARG VITE_AUTH0_PASSWORD

ENV VITE_AUTH0_USERNAME=${VITE_AUTH0_USERNAME}
ENV VITE_AUTH0_PASSWORD=${VITE_AUTH0_PASSWORD}

FROM nginx:alpine

COPY --from=build app/.nginx/nginx.conf etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=build /app/dist .

ENTRYPOINT ["nginx", "-g", "daemon off;"]