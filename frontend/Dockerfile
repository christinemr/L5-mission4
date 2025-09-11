# 1. build the app
FROM node:22 AS builder
WORKDIR /app

#both package and package-lock
COPY package*.json ./

RUN npm install
COPY . .
RUN npm run build

# 2. serve the built app with Nginx
FROM nginx:alpine

# Copy build output to Nginx's public folder
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]