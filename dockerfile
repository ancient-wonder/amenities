FROM node:carbon

WORKDIR /usr/src/amenities

COPY . .

RUN npm install

EXPOSE 3001:3001

CMD ["npm", "start"]
