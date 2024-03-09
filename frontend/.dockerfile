# pull the official base image
FROM node:18

# set working direction
EXPOSE 4000
WORKDIR /app

# add app
COPY . .

# install dependencies using yarn
RUN yarn install

# build the app
RUN yarn build

# start app
CMD ["serve", "-l", "4000", "-s", "dist"]
