FROM node:16

RUN \
  set -x \
  && apt-get update \
  && apt-get install -y net-tools build-essential python3 python3-pip valgrind build-essential zlib1g-dev libncurses5-dev libgdbm-dev libnss3-dev libssl-dev libreadline-dev libffi-dev

WORKDIR /var/app
COPY package.json .
RUN npm install
COPY . .
COPY /src/UseAxios.js .
COPY /src/config.js .

EXPOSE 3000
CMD [ "npm", "start" ]