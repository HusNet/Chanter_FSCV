FROM node:9.8.0

# Create app directory
RUN mkdir -p /opt/node/app/chanter
WORKDIR /opt/node/app/chanter

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
RUN npm install -g nodemon
RUN npm install

# Bundle app source
COPY . ./

EXPOSE 3000

CMD [ "npm", "start" ]
