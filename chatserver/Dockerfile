 FROM node:12

 WORKDIR /var/app

 COPY package.json .
 RUN PYTHON=python3.9 npm install mediasoup@3 --save
 RUN npm install
 COPY . .

 EXPOSE 3000
 CMD [ "npm", "start" ]