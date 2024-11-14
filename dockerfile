# Use a Node.js base image
FROM node:20.13.1 AS development

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json .

# Install dependencies
RUN npm install

# Copy all files to the container
COPY . .

# Build the NestJS application
RUN npm run build

# Expose the application port
EXPOSE 3000

# Define the command to run the application
CMD ["node", "dist/main"]
