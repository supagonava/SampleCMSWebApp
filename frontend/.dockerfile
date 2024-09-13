# pull the official base image
FROM node:18-alpine

# set working direction
EXPOSE 3000
WORKDIR /app

# add app
COPY . .

# install dependencies using yarn
RUN yarn install --production
RUN npm install --global serve

# build the app
RUN yarn build

# start app
CMD ["serve", "-l", "3000", "-s", "dist"]
