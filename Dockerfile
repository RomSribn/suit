FROM node:8.16.0

RUN mkdir -p /usr/src/application

RUN mkdir -p ~/.ssh
RUN chmod 777 ~/.ssh


ARG ssh_prv_key
ARG ssh_pub_key
ARG ssh_known_hosts

RUN apt-get update && \
    apt-get install -y

# Authorize SSH Host
RUN mkdir -p /root/.ssh && \
    chmod 0700 /root/.ssh

# Add the keys and set permissions
RUN echo "$ssh_prv_key" > /root/.ssh/id_rsa && \
    echo "$ssh_pub_key" > /root/.ssh/id_rsa.pub && \
    echo "$ssh_known_hosts" > /root/.ssh/known_hosts && \
    chmod 600 /root/.ssh/id_rsa && \
    chmod 600 /root/.ssh/id_rsa.pub

# Define working directory and copy source
WORKDIR /application
COPY . .
# Install dependencies and build whatever you have to build

RUN npm cache clean --force
RUN rm -rf ~/.npm
# In the project folder:
RUN rm -rf node_modules


RUN npm install

COPY server.config.js server.config.js
RUN npm run build

RUN ls -d */ | grep -P -v "(build|server)" | xargs -d"\n" rm -r

RUN ls | grep -P -v "(build|server)" | xargs -d"\n" rm

RUN npm i express

EXPOSE 3000

RUN rm -r ~/.ssh

# Start the app
CMD ["node", "server/index.js"]
