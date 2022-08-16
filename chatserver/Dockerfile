FROM node:14

RUN \
  set -x \
  && apt-get update \
  && apt-get install -y net-tools build-essential python3 python3-pip valgrind

WORKDIR /var/app
COPY package.json .
RUN npm install
COPY . .

EXPOSE 3000
CMD [ "npm", "start" ]