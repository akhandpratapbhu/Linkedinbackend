# NestJS Backend Dockerfile
# Specify Node Version and Image
# Name Image development (can be anything)
FROM node:20.13.1 AS development

# Specify Working directory inside container
WORKDIR /app

# Copy package-lock.json & package.json from host to inside container working directory
COPY package.json .

RUN npm install
# Copy all files from the host to the container
COPY . .

# Build the NestJS application
RUN npm run build

EXPOSE 3000

# run app
CMD ["node", "dist/main"]
