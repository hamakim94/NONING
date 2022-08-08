 FROM node:12

 WORKDIR /var/app

 COPY package.json .
 RUN npm install
 COPY . .

 EXPOSE 8080
 CMD [ "npm", "start" ]