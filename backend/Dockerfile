# Base image
FROM node:22

# Set working directory
WORKDIR /app

# copy package file and install dependencies
COPY package.json ./
RUN  npm install

# copy backend code
COPY . .

# backend port
EXPOSE 3000

# start the server - wrap in an array
CMD ["npm", "run", "dev"]

