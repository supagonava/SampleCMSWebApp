# Specify the base image for the build stage
FROM node:18

# Set the working directory in the Docker image
WORKDIR /usr/src/app

# Copy package.json and yarn.lock file
COPY package.json yarn.lock ./

# Install dependencies including 'devDependencies'
RUN yarn install

# Copy the rest of your application's code
COPY . .

# Build the application - compile TypeScript to JavaScript
RUN yarn build

# Copy the start.sh script
COPY start.sh /usr/src/app/start.sh
RUN chmod +x /usr/src/app/start.sh

# Expose the port your app runs on
EXPOSE 8000

# Use start.sh as the entrypoint
ENTRYPOINT ["/usr/src/app/start.sh"]
