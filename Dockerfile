# Webdev and DevOps by ecoSyn:F2

# Docker deploy website to AWS 
# Use node:alpine as base image
FROM node:alpine

# Setup work directory
WORKDIR '/app'

#Copy package.json to WORKDIR and install
COPY ./package*.json ./
RUN npm install

#Copy all file on local to WORKDIR on docker
COPY . . 

#Start node 
CMD ["npm","run", "start"]

