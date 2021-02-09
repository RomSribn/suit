FROM node:8.16.0 AS build

# Define build directory
WORKDIR /app

# Copy sources
COPY . .

# Define arguments
ARG ssh_prv_key
ARG ssh_pub_key
ARG ssh_known_hosts

# Add the keys and set permissions
RUN mkdir -p /root/.ssh && \
    echo "$ssh_prv_key" > /root/.ssh/id_rsa && \
    echo "$ssh_pub_key" > /root/.ssh/id_rsa.pub && \
    echo "$ssh_known_hosts" > /root/.ssh/known_hosts && \
    chmod 600 /root/.ssh/id_rsa && \
    chmod 600 /root/.ssh/id_rsa.pub

# Install dependencies and remove unnecessary files
RUN npm install && \
    rm -r /root/.ssh server.config

# Build app
RUN npm run build && \
    ls | grep -P -v "(build|server)" | xargs -d"\n" rm -rf

FROM node:8.16.0

# Define working directory and copy built app
WORKDIR /application

COPY  --from=build /app .

# Set workidr permissions
RUN chown -R node:node /application

# Define user to run app
USER node

# Install additional dependencies
RUN npm install express compression

# Define exposed port
EXPOSE 3000

# Start the app
CMD ["node", "server/index.js"]
