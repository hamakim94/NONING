FROM node:17-alpine3.12

#RUN \
#  set -x \
#  && apt-get update \
#  && apt-get install -y net-tools build-essential python3 python3-pip valgrind zlib1g-dev libncurses5-dev libgdbm-dev libnss3-dev libssl-dev libreadline-dev libffi-dev g++ make

WORKDIR ./
COPY package.json .
COPY . .
COPY /src/UseAxios.js .
COPY /src/config.js .
RUN apk add g++ make python3 linux-headers
RUN apk add --update py3-pip
RUN npm install
RUN sh -c "$(wget -O- https://github.com/deluan/zsh-in-docker/releases/download/v1.1.2/zsh-in-docker.sh)"


EXPOSE 3000
EXPOSE 8400-8880
CMD [ "npm", "start" ]