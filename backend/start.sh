#!/bin/bash

# Run database seeding
yarn db:seed-user
yarn db:seed-post

# Start your application
yarn start