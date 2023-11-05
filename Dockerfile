FROM node:18.13.0 

WORKDIR /frontapp

COPY package.json .

RUN npm install

COPY . .

RUN npm i -g @angular/cli@16.2.2

EXPOSE 4200

CMD [ "ng", "serve", "--watch", "--host", "0.0.0.0" ]