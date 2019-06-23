FROM node

RUN mkdir -p /usr/src/app

RUN mkdir -p ~/.ssh
RUN chmod 777 ~/.ssh


ARG ssh_prv_key
ARG ssh_pub_key
ARG ssh_known_hosts
ARG clothes_api
ARG CONSULT_WIDGET_ID

ENV CLOTHES_API="$clothes_api"
ENV CONSULT_WIDGET_ID="$CONSULT_WIDGET_ID"

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
WORKDIR /app
COPY . .
# Install dependencies and build whatever you have to build

RUN npm cache clean --force
RUN rm -rf ~/.npm
# In the project folder:
RUN rm -rf node_modules
RUN rm -f package-lock.json


RUN npm install
RUN npm run build

RUN ls -d */ | grep -P -v "(build|server)" | xargs -d"\n" rm -r

RUN ls | grep -P -v "(build|server)" | xargs -d"\n" rm

RUN npm i express

EXPOSE 3000

RUN rm -r ~/.ssh

# Start the app
CMD ["node", "server/index.js"]
