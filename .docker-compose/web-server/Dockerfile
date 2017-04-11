FROM node:6.10.1

# Create app directory
RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY ./app/package.json /usr/src/app/package.json

# Install app dependencies
RUN npm install

EXPOSE 3200

CMD [ "npm", "start" ]
