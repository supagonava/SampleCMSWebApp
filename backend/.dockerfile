# Step 1: Specify the base image for the build stage
FROM node:18 as builder

# Set the working directory in the Docker image
WORKDIR /usr/src/app

# Copy package.json and yarn.lock file
COPY package.json yarn.lock ./

# Install dependencies including 'devDependencies'
# Yarn automatically installs 'devDependencies' unless NODE_ENV is set to 'production'
RUN yarn install

# Copy the rest of your application's code
COPY . .

# Build the application - compile TypeScript to JavaScript
RUN yarn build

# Step 2: Set up the production environment
FROM node:18

# Set the working directory in the Docker image
WORKDIR /usr/src/app

# Copy package.json and yarn.lock file for production dependencies
COPY package.json yarn.lock ./

# Install only production dependencies
RUN yarn install --production

# Copy built code from the builder stage
COPY --from=builder /usr/src/app/dist ./dist

# Expose the port your app runs on
EXPOSE 8000

# Define the command to run your app
CMD ["node", "dist/index.js"]
