FROM node:8.16.0 AS build

WORKDIR /app

COPY . .

ARG ssh_prv_key
ARG ssh_pub_key
ARG ssh_known_hosts

# Add the keys and set permissions
RUN mkdir -p /root/.ssh && \
    echo "$ssh_prv_key" > /root/.ssh/id_rsa && \
    echo "$ssh_pub_key" > /root/.ssh/id_rsa.pub && \
    echo "$ssh_known_hosts" > /root/.ssh/known_hosts && \
    chmod 600 /root/.ssh/id_rsa && \
    chmod 600 /root/.ssh/id_rsa.pub && \
    npm install && \
    rm -r /root/.ssh && \
    npm run build && \
    ls | grep -P -v "(build|server)" | xargs -d"\n" rm -rf

# Set server configuration
COPY server.config.js server.config.js

FROM node:8.16.0
# Define working directory and copy source
WORKDIR /application
COPY  --from=build /app .
RUN chown -R node:node /application
# Install dependencies and build whatever you have to build

USER node

RUN npm install express compression

EXPOSE 3000

# Start the app
CMD ["node", "server/index.js"]
