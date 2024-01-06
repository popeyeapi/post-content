# Use an official Node.js runtime as the base image
FROM node:latest

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application files to the working directory
COPY . .

# Transpile TypeScript to JavaScript
RUN npm run build

# Expose the port your app runs on (if needed)
EXPOSE 3000

# Define the command to run your app
CMD ["node", "./dist/src/index.js"]