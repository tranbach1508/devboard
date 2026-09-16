FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY apps/frontend/package*.json ./apps/frontend/

RUN npm ci
COPY apps/frontend ./apps/frontend

WORKDIR /app/apps/frontend

RUN npm run build


FROM nginx:alpine

COPY --from=builder /app/apps/frontend/dist /usr/share/nginx/html

COPY apps/frontend/nginx.conf /etc/nginx/conf.d/default.conf