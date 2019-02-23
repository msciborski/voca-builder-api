FROM node:8
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm -g config set user root
RUN npm install -g typescript
RUN npm install -g ts-node
RUN npm install
COPY . .
# RUN apt-get install -y python && \
#     curl -sSL https://sdk.cloud.google.com | bash
# ENV PATH $PATH:/root/google-cloud-sdk/bin
# ENV PATH $PATH:/usr/src/app/config.gcloud3.json
# RUN gcloud auth activate-service-account --key-file=./config.gcloud3.json
EXPOSE 5000
CMD ["npm", "run", "start-prod"]

