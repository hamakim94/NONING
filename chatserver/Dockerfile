FROM node:16

RUN \
  set -x \
  && apt-get update \
  && apt-get install -y net-tools build-essential python3 python3-pip valgrind zlib1g-dev libncurses5-dev libgdbm-dev libnss3-dev libssl-dev libreadline-dev libffi-dev g++ make

WORKDIR /var/app
COPY package.json .
RUN npm install
RUN apk add g++ make python3 linux-headers
COPY . .
COPY /src/UseAxios.js .
COPY /src/config.js .

EXPOSE 3000
EXPOSE 8500-8700
CMD [ "npm", "start" ]