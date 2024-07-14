# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Install nmap
RUN apt-get update && apt-get install -y nmap

# Bundle app source
COPY . .

# Expose the port the app runs on
EXPOSE 5000

# Define the command to run the app
CMD ["node", "server.js"]
