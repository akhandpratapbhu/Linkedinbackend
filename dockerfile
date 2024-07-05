# Specify Node Version and Image
# Name Image development (can be anything)
FROM node:20.13.1 AS development

# Specify Working directory inside container
WORKDIR /akhand/backend

# Copy package-lock.json & package.json from host to inside container working directory
COPY package*.json ./

# Copy tsconfig.json file
COPY tsconfig*.json ./

# Install deps inside container
RUN npm install

# Copy the rest of the application code
COPY . .

RUN npm run build

COPY main.js ./dist

EXPOSE 3000

# run app
CMD [ "nest", "start"]